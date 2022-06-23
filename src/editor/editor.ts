import {
  ActionManager,
  ArcRotateCamera,
  Engine,
  ExecuteCodeAction,
  HemisphericLight,
  PointerDragBehavior,
  Scene,
  Tools,
  Vector3,
} from "@babylonjs/core";
import { createBackground } from "@/editor/background";
import {
  cancelAreaSelection,
  clearCellMaterials,
  createGrid,
  enableAreaSelection,
  GridCoords,
  gridToWorld,
  highlightCells,
} from "@/editor/grid";
import {
  Container,
  createContainer,
  isContainerColliding,
  isSupported,
  startContainerDeletionSelection,
  stopContainerDeletion,
  validatePosition,
  validatePositionAll,
} from "@/editor/container";
import {
  centerToLowerCorner,
  getContainerArea,
  lowerCornerToCenter,
} from "@/editor/util";
import { createUI } from "@/editor/ui";
import { initializeMaterials } from "@/editor/materials";
import "@babylonjs/inspector";
import { useEditorStore } from "@/stores/editor.store";

let engine: Engine;
let canvas: HTMLCanvasElement;

export let sizeI: number, sizeJ: number;
export let camera: ArcRotateCamera;
export let scene: Scene;

export const createScene = (
  editorCanvas: HTMLCanvasElement,
  x = 15,
  z = 15
) => {
  sizeI = x;
  sizeJ = z;

  canvas = editorCanvas;
  engine = new Engine(canvas, true, { stencil: true });
  scene = new Scene(engine);
  // scene.debugLayer.show();

  new HemisphericLight("ambientLight", new Vector3(0.2, 1, -0.2), scene);

  initializeMaterials();
  createCamera();
  createBackground(scene);
  createGrid(scene, sizeI, sizeJ);

  createUI();

  engine.runRenderLoop(() => {
    scene.render();
  });
};

const createCamera = () => {
  const distance = realSizeX() + realSizeZ();

  camera = new ArcRotateCamera(
    "camera",
    Tools.ToRadians(270),
    Tools.ToRadians(60),
    distance,
    new Vector3(realSizeX() / 2, 0, realSizeZ() / 2),
    scene
  );
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

export const startContainerCreation = async () => {
  useEditorStore().isAddContainerActive = true;

  const area = await enableAreaSelection();

  const container = createContainer(area.sizeI(), area.sizeJ());
  addContainerDragBehavior(container);
  container.position = lowerCornerToCenter(
    gridToWorld(
      new GridCoords(area.firstI(), area.firstJ()),
      useEditorStore().activeFloor * 4 + 2
    ),
    container.sizeI,
    container.sizeJ
  );

  validatePositionAll();

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

export const stopContainerRemoval = async () => {
  useEditorStore().isRemoveContainerActive = false;
  stopContainerDeletion();
};

const addContainerDragBehavior = (container: Container) => {
  const dragBehavior = new PointerDragBehavior({
    dragPlaneNormal: Vector3.Down(),
  });
  dragBehavior.updateDragPlane = false;
  dragBehavior.moveAttached = false;

  dragBehavior.onDragStartObservable.add(() => {
    scene.hoverCursor = "grabbing";
    container.lastCorrectPosition = container.position;

    if (validatePosition(container))
      container.material = container.wallGhostMaterial;
  });

  dragBehavior.onDragEndObservable.add(() => {
    scene.hoverCursor = "grab";
    clearCellMaterials();

    if (isContainerColliding(container))
      container.position = container.lastCorrectPosition;

    validatePosition(container);
  });

  dragBehavior.onDragObservable.add((event) => {
    const newCenter = event.dragPlanePoint;

    const newLowerCorner = centerToLowerCorner(
      newCenter,
      container.sizeI,
      container.sizeJ
    );

    let i = Math.round(newLowerCorner.x / 2.5);
    if (i < 0) i = 0;
    if (i + container.sizeI > sizeI) i = sizeI - container.sizeI + 1;

    let j = Math.round(newLowerCorner.z / 2.5);
    if (j < 0) j = 0;
    if (j + container.sizeJ > sizeJ) j = sizeJ - container.sizeJ + 1;

    const fixedLowerCorner = new Vector3(i * 2.5, newLowerCorner.y, j * 2.5);
    container.position = lowerCornerToCenter(
      fixedLowerCorner,
      container.sizeI,
      container.sizeJ
    );

    highlightCells(getContainerArea(container));

    if (isContainerColliding(container)) {
      container.material = container.wallErrorMaterial;
      return;
    } else {
      container.material = container.wallGhostMaterial;
      container.lastCorrectPosition = container.position;
    }

    if (isSupported(container))
      container.material = container.wallGhostMaterial;
    else container.material = container.wallErrorMaterial;

    validatePositionAll();
  });

  container.addBehavior(dragBehavior);

  container.actionManager = new ActionManager(scene);

  container.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function () {
      scene.hoverCursor = "grab";
    })
  );

  container.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, function () {
      scene.hoverCursor = "default";
    })
  );
};