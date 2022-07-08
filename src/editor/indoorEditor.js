import { Area, disableGridEffects, GridCoords, gridToWorld, worldToGrid, } from "@/editor/grid";
import { ArcRotateCamera, Matrix, Mesh, MeshBuilder, Plane, PointerEventTypes, PointerInfo, Scene, Vector3, } from "@babylonjs/core";
import { deleteContainer, MAX_FLOOR } from "@/editor/container";
import { getContainerArea, isPointInArea, lowerCornerToCenter, } from "@/editor/util";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { switchToIndoorUI } from "@/editor/ui";
import { floorMaterial, initializeMaterials, wallErrorMaterial, wallGhostMaterial, wallMaterial, } from "@/editor/materials";
import { startFurniturePlacement } from "@/editor/furniture";
import { useEditorStore } from "@/stores/editor.store";
import { camera, scene, sizeI, sizeJ } from "@/editor/editor";
class Wall extends Mesh {
    start;
    end;
    floor;
    vertical;
    status;
    container;
    hidden;
}
class ContainerData {
    floor;
    area;
    constructor(container) {
        this.floor = container.floor;
        this.area = getContainerArea(container);
    }
}
export let activeFloor = 0;
let lastWallGhost;
let wallCreationActive = false;
let wallDeletionActive = false;
const walls = new Map();
const walls1 = [];
const floors = [];
const roofs = [];
const containerData = [];
export const startIndoorEditor = () => {
    useEditorStore().step = 3;
    disableGridEffects();
    disposeContainers();
    generateWalls(sizeI, sizeJ);
    generateFloors();
    changeFloor(0);
    enableContainerWalls();
    showHiddenWalls(activeFloor);
};
export const startWallCreation = () => {
    if (wallCreationActive) {
        endWallCreation();
        return;
    }
    useEditorStore().isAddWallActive = true;
    wallCreationActive = true;
    endWallDeletion();
    scene.onPointerObservable.add(wallCreationCallback);
};
const endWallCreation = () => {
    scene.onPointerObservable.removeCallback(wallCreationCallback);
    useEditorStore().isAddWallActive = false;
};
export const startWallDeletion = () => {
    if (wallDeletionActive) {
        endWallDeletion();
        return;
    }
    useEditorStore().isRemoveWallActive = true;
    wallDeletionActive = true;
    endWallCreation();
    scene.onPointerObservable.add(wallDeletionCallback);
};
const endWallDeletion = () => {
    scene.onPointerObservable.removeCallback(wallDeletionCallback);
    useEditorStore().isRemoveWallActive = false;
};
const wallCreationCallback = (pointerInfo) => {
    if (pointerInfo.type == PointerEventTypes.POINTERDOWN &&
        pointerInfo.event.button == 0) {
        if (lastWallGhost && lastWallGhost.status == "ghost")
            setWallStatus(lastWallGhost, "enabled");
        useEditorStore().walls = getWallData();
        return;
    }
    if (lastWallGhost && lastWallGhost.status == "ghost")
        setWallStatus(lastWallGhost, "disabled");
    const wall = getClosestWallToPointer();
    if (!wall)
        return;
    if (wall.status == "enabled")
        return;
    lastWallGhost = wall;
    setWallStatus(wall, "ghost");
};
const wallDeletionCallback = (pointerInfo) => {
    if (pointerInfo.type == PointerEventTypes.POINTERDOWN &&
        pointerInfo.event.button == 0) {
        if (lastWallGhost && lastWallGhost.status == "error")
            setWallStatus(lastWallGhost, "disabled");
        useEditorStore().walls = getWallData();
        return;
    }
    if (lastWallGhost && lastWallGhost.status == "error")
        setWallStatus(lastWallGhost, "enabled");
    const wall = getClosestWallToPointer();
    if (!wall)
        return;
    if (wall.container || wall.status == "disabled")
        return;
    lastWallGhost = wall;
    setWallStatus(wall, "error");
};
export const getClosestWallToPointer = (allowOutdoors = false) => {
    const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), null);
    const hit = scene.pickWithRay(ray);
    if (!hit)
        return;
    const coords = hit.pickedPoint;
    if (!coords)
        return;
    if (coords.y < 4 * activeFloor || coords.y > 4 * activeFloor + 4)
        return;
    const cellOffsetX = (coords.x + 1.25) % 2.5;
    const cellOffsetZ = (coords.z + 1.25) % 2.5;
    let wallStart = worldToGrid(new Vector3(coords.x, activeFloor * 4, coords.z));
    if (!allowOutdoors && !isCellIndoors(wallStart))
        return undefined;
    let wallEnd = new GridCoords(wallStart.i + 1, wallStart.j);
    if (cellOffsetX + cellOffsetZ <= 2.5) {
        if (cellOffsetX < cellOffsetZ) {
            wallEnd = new GridCoords(wallStart.i, wallStart.j + 1);
        }
    }
    else {
        if (cellOffsetX >= cellOffsetZ) {
            wallStart = new GridCoords(wallStart.i + 1, wallStart.j);
            wallEnd = new GridCoords(wallStart.i, wallStart.j + 1);
        }
        else {
            wallStart = new GridCoords(wallStart.i, wallStart.j + 1);
            wallEnd = new GridCoords(wallStart.i + 1, wallStart.j);
        }
    }
    return walls.get(wallID(wallStart, wallEnd, activeFloor));
};
const generateWalls = (sizeI, sizeJ) => {
    initWallArray();
    for (let floor = 0; floor <= MAX_FLOOR; floor++) {
        for (let i = 0; i <= sizeI + 1; i++) {
            for (let j = 0; j <= sizeJ; j++) {
                createWall(new GridCoords(i, j), new GridCoords(i, j + 1), floor);
            }
        }
        for (let j = 0; j <= sizeJ + 1; j++) {
            for (let i = 0; i <= sizeI; i++) {
                createWall(new GridCoords(i, j), new GridCoords(i + 1, j), floor);
            }
        }
    }
};
const isCellIndoors = (cell) => {
    return containerData
        .filter((container) => container.floor == activeFloor)
        .some((container) => isPointInArea(cell, container.area));
};
const generateFloors = () => {
    initFloorArray();
    initRoofsArray();
    containerData.forEach((container) => {
        createFloor(container.area, container.floor);
        createRoof(container.area, container.floor);
    });
};
const initFloorArray = () => {
    for (let i = 0; i <= MAX_FLOOR; i++) {
        floors[i] = [];
    }
};
const initWallArray = () => {
    for (let i = 0; i <= MAX_FLOOR; i++) {
        walls1[i] = [];
    }
};
const initRoofsArray = () => {
    for (let i = 0; i <= MAX_FLOOR; i++) {
        roofs[i] = [];
    }
};
const enableContainerWalls = () => {
    containerData.forEach((container) => {
        const corners = getContainerCorners(container);
        corners.forEach((corner, i, a) => {
            let nextCorner = i + 1;
            if (i == a.length - 1)
                nextCorner = 0;
            enableWallsBetweenPoints(corner, a[nextCorner], container.floor);
        });
    });
};
const disposeContainers = () => useEditorStore().containers.forEach((container) => {
    containerData.push(new ContainerData(container));
    deleteContainer(container);
});
const getContainerCorners = (container) => {
    const area = container.area;
    const bottomLeft = area.start;
    const topRight = new GridCoords(area.end.i + 1, area.end.j + 1);
    const bottomRight = new GridCoords(bottomLeft.i, topRight.j);
    const topLeft = new GridCoords(topRight.i, bottomLeft.j);
    return [bottomLeft, bottomRight, topRight, topLeft];
};
const setWallStatus = (wall, status) => {
    wall.status = status;
    switch (status) {
        case "enabled":
            wall.setEnabled(true);
            wall.material = wallMaterial;
            return;
        case "disabled":
            wall.setEnabled(false);
            return;
        case "hidden":
            wall.setEnabled(false);
            return;
        case "ghost":
            wall.setEnabled(true);
            wall.material = wallGhostMaterial;
            return;
        case "error":
            wall.setEnabled(true);
            wall.material = wallErrorMaterial;
            return;
    }
};
const createWall = (start, end, floor) => {
    if (!wallMaterial)
        initializeMaterials();
    const vertical = start.j != end.j;
    const wall = MeshBuilder.CreateBox("wall", {
        width: vertical ? 0.5 : 3,
        depth: vertical ? 3 : 0.5,
        height: 4,
        updatable: true,
    });
    setWallStatus(wall, "disabled");
    if (vertical)
        wall.position = new Vector3(start.i * 2.5 - 1.25, 2 + floor * 4, start.j * 2.5);
    else
        wall.position = new Vector3(start.i * 2.5, 2 + floor * 4, start.j * 2.5 - 1.25);
    wall.start = start;
    wall.end = end;
    wall.vertical = vertical;
    walls.set(wallID(start, end, floor), wall);
    walls1[floor].push(wall);
};
const createFloor = (area, floorNo) => {
    if (!wallMaterial)
        initializeMaterials();
    const floor = MeshBuilder.CreateBox("floor", {
        width: area.sizeI() * 2.5,
        depth: area.sizeJ() * 2.5,
        height: 0.5,
        updatable: true,
    });
    floor.material = floorMaterial;
    floor.position = lowerCornerToCenter(gridToWorld(new GridCoords(area.firstI(), area.firstJ()), floorNo * 4), area.sizeI(), area.sizeJ());
    if (floorNo != 0) {
        floor.setEnabled(false);
    }
    floors[floorNo].push(floor);
};
const createRoof = (area, floorNo) => {
    if (!wallMaterial)
        initializeMaterials();
    const roof = MeshBuilder.CreateBox("roof", {
        width: area.sizeI() * 2.5,
        depth: area.sizeJ() * 2.5,
        height: 0.5,
        updatable: true,
    });
    roof.material = wallMaterial;
    roof.position = lowerCornerToCenter(gridToWorld(new GridCoords(area.firstI(), area.firstJ()), floorNo * 4 + 3.75), area.sizeI(), area.sizeJ());
    roof.setEnabled(false);
    roofs[floorNo].push(roof);
};
const enableWallsBetweenPoints = (start, end, floor) => {
    const vertical = start.j != end.j;
    if (vertical) {
        const lowJ = Math.min(start.j, end.j);
        const highJ = Math.max(start.j, end.j);
        for (let j = lowJ; j < highJ; j++) {
            const wall = walls.get(wallID(new GridCoords(start.i, j), new GridCoords(start.i, j + 1), floor));
            if (wall) {
                setWallStatus(wall, "hidden");
                wall.container = true;
            }
        }
    }
    else {
        const lowI = Math.min(start.i, end.i);
        const highI = Math.max(start.i, end.i);
        for (let i = lowI; i < highI; i++) {
            const wall = walls.get(wallID(new GridCoords(i, start.j), new GridCoords(i + 1, start.j), floor));
            if (wall) {
                setWallStatus(wall, "hidden");
                wall.container = true;
            }
        }
    }
};
const wallID = (start, end, floor) => `${start.hash()}|${end.hash()}|${floor}`;
const changeFloor = (floor) => {
    activeFloor = floor;
    camera.setTarget(new Vector3(camera.target.x, 5 * floor, camera.target.z));
    camera.setPosition(new Vector3(camera.position.x, 20 + 5 * floor, camera.position.z));
};
export const increaseFloor = () => {
    if (activeFloor != MAX_FLOOR)
        changeFloor(activeFloor + 1);
    floors[activeFloor].forEach((floor) => floor.setEnabled(true));
    roofs[activeFloor - 1].forEach((roof) => roof.setEnabled(true));
    showHiddenWalls(activeFloor);
};
export const decreaseFloor = () => {
    if (activeFloor != 0)
        changeFloor(activeFloor - 1);
    floors[activeFloor + 1].forEach((floor) => floor.setEnabled(false));
    roofs[activeFloor].forEach((roof) => roof.setEnabled(false));
    hideWalls(activeFloor + 1);
};
const showHiddenWalls = (floor) => {
    walls1[floor]
        .filter((wall) => wall.status == "hidden")
        .forEach((wall) => setWallStatus(wall, "enabled"));
};
const hideWalls = (floor) => {
    walls1[floor]
        .filter((wall) => wall.status == "enabled")
        .forEach((wall) => setWallStatus(wall, "hidden"));
};
export const wallHash = (wall) => `${wall.start.hash()}|${wall.end.hash()}`;
export const getWallData = () => {
    const wallData = [];
    for (const wall of walls.values()) {
        if (wall.status != "enabled")
            continue;
        if (wall.container)
            continue;
        wallData.push({
            start: wall.start,
            end: wall.end,
            floor: wall.floor,
            vertical: wall.vertical,
        });
    }
    return wallData;
};
//# sourceMappingURL=indoorEditor.js.map