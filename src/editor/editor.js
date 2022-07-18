import { ActionManager, ArcRotateCamera, Engine, ExecuteCodeAction, HemisphericLight, PointerDragBehavior, Scene, Tools, Vector3, } from "@babylonjs/core";
import { createBackground } from "@/editor/background";
import { cancelAreaSelection, clearCellMaterials, createGrid, enableAreaSelection, GridCoords, gridToWorld, highlightCells, } from "@/editor/grid";
import { correctPosition, createContainerMesh, isContainerColliding, isSupported, startContainerDeletionSelection, stopContainerDeletion, validatePosition, validatePositionAll, } from "@/editor/container";
import { centerToLowerCorner, getContainerArea, lowerCornerToCenter, } from "@/editor/util";
import { createUI } from "@/editor/ui";
import { initializeMaterials } from "@/editor/materials";
import { useEditorStore } from "@/stores/editor.store";
import { startIndoorEditor } from "@/editor/indoorEditor";
import { getDesign, processDesign } from "@/editor/design";
let engine;
let canvas;
export let sizeI, sizeJ;
export let camera;
export let scene;
export const createScene = async (editorCanvas, view) => {
    useEditorStore().loaded = false;
    let design;
    let terrain;
    if (view)
        design = await getDesign(view);
    if (design) {
        terrain = design.terrain;
        useEditorStore().terrain = terrain;
    }
    else {
        terrain = useEditorStore().terrain;
    }
    if (!terrain || !terrain.sizeX || !terrain.sizeY)
        return;
    sizeI = terrain.sizeX / 2.5;
    sizeJ = terrain.sizeY / 2.5;
    canvas = editorCanvas;
    engine = new Engine(canvas, true, { stencil: true });
    scene = new Scene(engine);
    createBackground(scene);
    new HemisphericLight("ambientLight", new Vector3(0.2, 1, -0.2), scene);
    initializeMaterials();
    createCamera();
    createGrid(scene, sizeI, sizeJ);
    createUI();
    engine.runRenderLoop(() => {
        scene.render();
    });
    if (view && design) {
        startIndoorEditor(design);
    }
};
const createCamera = () => {
    const distance = realSizeX() + realSizeZ();
    camera = new ArcRotateCamera("camera", Tools.ToRadians(270), Tools.ToRadians(60), distance, new Vector3(realSizeX() / 2, 0, realSizeZ() / 2), scene);
    camera.attachControl(canvas, true);
    camera.upperBetaLimit = Tools.ToRadians(80);
    camera.lowerRadiusLimit = 20;
    camera.upperRadiusLimit = distance + 20;
};
const realSizeX = () => {
    return sizeI * 2.5;
};
const realSizeZ = () => {
    return sizeJ * 2.5;
};
function createContainer(area) {
    const container = createContainerMesh(area.sizeI(), area.sizeJ());
    addContainerDragBehavior(container);
    container.mesh.position = lowerCornerToCenter(gridToWorld(new GridCoords(area.firstI(), area.firstJ()), useEditorStore().activeFloor * 4 + 2), container.sizeI, container.sizeJ);
    validatePositionAll();
}
export const startContainerCreation = async () => {
    useEditorStore().isAddContainerActive = true;
    const area = await enableAreaSelection();
    createContainer(area);
    useEditorStore().containerData = getContainerData();
    useEditorStore().isAddContainerActive = false;
};
export const stopContainerCreation = () => {
    cancelAreaSelection();
    useEditorStore().isAddContainerActive = false;
};
export const startContainerRemoval = async () => {
    useEditorStore().isRemoveContainerActive = true;
    startContainerDeletionSelection();
};
export const stopContainerRemoval = () => {
    useEditorStore().isRemoveContainerActive = false;
    stopContainerDeletion();
};
const addContainerDragBehavior = (container) => {
    const dragBehavior = new PointerDragBehavior({
        dragPlaneNormal: Vector3.Down(),
    });
    dragBehavior.updateDragPlane = false;
    dragBehavior.moveAttached = false;
    dragBehavior.onDragStartObservable.add(() => {
        scene.hoverCursor = "grabbing";
        container.lastCorrectPosition = container.mesh.position;
        if (validatePosition(container))
            container.mesh.material = container.wallGhostMaterial;
    });
    dragBehavior.onDragEndObservable.add(() => {
        scene.hoverCursor = "grab";
        clearCellMaterials();
        if (isContainerColliding(container))
            container.mesh.position = container.lastCorrectPosition;
        validatePosition(container);
    });
    dragBehavior.onDragObservable.add((event) => {
        const newCenter = event.dragPlanePoint;
        const newLowerCorner = centerToLowerCorner(newCenter, container.sizeI, container.sizeJ);
        let i = Math.round(newLowerCorner.x / 2.5);
        if (i < 0)
            i = 0;
        if (i + container.sizeI > sizeI)
            i = sizeI - container.sizeI + 1;
        let j = Math.round(newLowerCorner.z / 2.5);
        if (j < 0)
            j = 0;
        if (j + container.sizeJ > sizeJ)
            j = sizeJ - container.sizeJ + 1;
        const fixedLowerCorner = new Vector3(i * 2.5, newLowerCorner.y, j * 2.5);
        container.mesh.position = lowerCornerToCenter(fixedLowerCorner, container.sizeI, container.sizeJ);
        correctPosition(container);
        highlightCells(getContainerArea(container));
        if (isContainerColliding(container)) {
            container.mesh.material = container.wallErrorMaterial;
            return;
        }
        else {
            container.mesh.material = container.wallGhostMaterial;
            container.lastCorrectPosition = container.mesh.position;
        }
        if (isSupported(container))
            container.mesh.material = container.wallGhostMaterial;
        else
            container.mesh.material = container.wallErrorMaterial;
        validatePositionAll();
    });
    container.mesh.addBehavior(dragBehavior);
    container.mesh.actionManager = new ActionManager(scene);
    container.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function () {
        scene.hoverCursor = "grab";
    }));
    container.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, function () {
        scene.hoverCursor = "default";
    }));
};
export const getContainerData = () => useEditorStore().containers.map((container) => ({
    sizeI: container.sizeI,
    sizeJ: container.sizeJ,
    floor: container.floor,
    area: getContainerArea(container),
}));
//# sourceMappingURL=editor.js.map