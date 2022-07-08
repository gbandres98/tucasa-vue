import { ActionManager, ExecuteCodeAction, Mesh, MeshBuilder, StandardMaterial, Vector3, } from "@babylonjs/core";
import { areasOverlap, centerToLowerCorner, getContainerArea, lowerCornerToCenter, } from "@/editor/util";
import { createContainerUI, deleteContainerUI } from "@/editor/ui";
import { wallErrorMaterial, wallGhostMaterial, wallMaterial, } from "@/editor/materials";
import { useEditorStore } from "@/stores/editor.store";
import { getContainerData, stopContainerCreation, stopContainerRemoval, } from "@/editor/editor";
export const MAX_FLOOR = 2;
export const createContainerMesh = (sizeI, sizeJ) => {
    const mesh = MeshBuilder.CreateBox(`container-${Date.now()}`, {
        width: 2.5,
        depth: 2.5,
        height: 4,
        updatable: true,
    });
    const container = {
        wallMaterial: wallMaterial,
        wallGhostMaterial: wallGhostMaterial,
        wallErrorMaterial: wallErrorMaterial,
        floor: useEditorStore().activeFloor,
        sizeI: sizeI,
        sizeJ: sizeJ,
        mesh: mesh,
        lastCorrectPosition: mesh.position,
        deletionBehaviors: [],
        uiControls: [],
    };
    container.mesh.material = wallMaterial;
    container.mesh.position.y = useEditorStore().activeFloor * 4 + 2;
    resizeContainer(container, sizeI, sizeJ);
    container.mesh.isPickable = true;
    container.mesh.enablePointerMoveEvents = true;
    container.mesh.actionManager = new ActionManager();
    container.mesh.actionManager.hoverCursor = "grab";
    useEditorStore().containers.push(container);
    container.deletionBehaviors = [];
    container.uiControls = [];
    createContainerUI(container, () => deleteContainer(container), () => rotateContainer(container), () => increaseContainerFloor(container), () => decreaseContainerFloor(container));
    return container;
};
export const resizeContainer = (container, i, j) => {
    container.sizeI = i;
    container.sizeJ = j;
    container.mesh.scaling.x = container.sizeI;
    container.mesh.scaling.z = container.sizeJ;
    correctPosition(container);
    validatePositionAll();
};
export const correctPosition = (container) => {
    const lowerCorner = centerToLowerCorner(container.mesh.position, container.sizeI, container.sizeJ);
    const newLowerCorner = new Vector3(roundCoord(lowerCorner.x), lowerCorner.y, roundCoord(lowerCorner.z));
    if (newLowerCorner.x < 0) {
        newLowerCorner.x = 0;
    }
    if (newLowerCorner.z < 0) {
        newLowerCorner.z = 0;
    }
    const newPosition = lowerCornerToCenter(newLowerCorner, container.sizeI, container.sizeJ);
    container.mesh.position = newPosition;
    return newPosition;
};
export const roundCoord = (coord) => Math.floor(coord / 2.5 + 0.5) * 2.5;
export const startContainerDeletionSelection = () => {
    useEditorStore().containers.forEach((container) => {
        const pointerOverAction = new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function () {
            container.mesh.material = wallErrorMaterial;
        });
        container.mesh.actionManager?.registerAction(pointerOverAction);
        const pointerOutAction = new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, function () {
            container.mesh.material = wallMaterial;
        });
        container.mesh.actionManager?.registerAction(pointerOutAction);
        const clickAction = new ExecuteCodeAction(ActionManager.OnLeftPickTrigger, function () {
            deleteContainer(container);
            useEditorStore().containerData = getContainerData();
            stopContainerRemoval();
        });
        container.mesh.actionManager?.registerAction(clickAction);
        container.deletionBehaviors.push(pointerOverAction, pointerOutAction, clickAction);
    });
};
export const deleteContainer = (container) => {
    useEditorStore().containers = useEditorStore().containers.filter((c) => c.mesh.id != container.mesh.id);
    container.mesh.dispose();
    deleteContainerUI(container);
    stopContainerDeletion();
};
export const stopContainerDeletion = () => {
    useEditorStore().containers.forEach((container) => {
        container.deletionBehaviors.forEach((action) => container.mesh.actionManager?.unregisterAction(action));
    });
};
export const containerInArea = (area, ignoreContainer, floor) => {
    return useEditorStore()
        .containers.filter((container) => {
        if (container.mesh.id === ignoreContainer?.mesh.id)
            return false;
        if (floor != undefined && ignoreContainer && container.floor != floor)
            return false;
        return true;
    })
        .some((container) => areasOverlap(area, getContainerArea(container)));
};
export const isContainerColliding = (container) => {
    return containerInArea(getContainerArea(container), container, container.floor);
};
export const isSupported = (container) => {
    if (container.floor == 0)
        return true;
    return containerInArea(getContainerArea(container), container, container.floor - 1);
};
const rotateContainer = (container) => {
    resizeContainer(container, container.sizeJ, container.sizeI);
};
const increaseContainerFloor = (container) => {
    if (container.floor == MAX_FLOOR)
        return;
    container.floor++;
    container.mesh.position.y = 2 + container.floor * 4;
    validatePositionAll();
};
const decreaseContainerFloor = (container) => {
    if (container.floor == 0)
        return;
    container.floor--;
    container.mesh.position.y = 2 + container.floor * 4;
    validatePositionAll();
};
export const validatePosition = (container) => {
    if (isContainerColliding(container) || !isSupported(container)) {
        container.mesh.material = container.wallErrorMaterial;
        return false;
    }
    container.mesh.material = container.wallMaterial;
    return true;
};
export const validatePositionAll = () => {
    let res = true;
    useEditorStore().containers.forEach((container) => {
        if (!validatePosition(container))
            res = false;
    });
    return res;
};
//# sourceMappingURL=container.js.map