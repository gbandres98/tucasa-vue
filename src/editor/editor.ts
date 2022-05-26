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
  Area,
  clearCellMaterials,
  createGrid,
  enableAreaSelection,
  highlightCells,
  worldToGrid,
} from "@/editor/grid";
import {
  Container,
  createContainer,
  resizeContainer,
} from "@/editor/container";
import {
  centerToLowerCorner,
  centerToUpperCorner,
  lowerCornerToCenter,
} from "@/editor/util";
import { createUI } from "@/editor/ui";

let sizeX: number, sizeZ: number;
let engine: Engine;
let scene: Scene;
let canvas: HTMLCanvasElement;

export const createScene = (
  editorCanvas: HTMLCanvasElement,
  x = 15,
  z = 15
) => {
  sizeX = x;
  sizeZ = z;

  canvas = editorCanvas;
  engine = new Engine(canvas, true, { stencil: true });
  scene = new Scene(engine);

  new HemisphericLight("ambientLight", new Vector3(0.2, 1, -0.2), scene);

  createCamera();
  createBackground(scene);
  createGrid(scene, sizeX, sizeZ);

  const container = createContainer(1, 1);
  resizeContainer(container, 4, 5);

  createUI(startContainerCreation);

  engine.runRenderLoop(() => {
    scene.render();
  });
};

const createCamera = () => {
  const distance = realSizeX() + realSizeZ();

  const newCamera = new ArcRotateCamera(
    "camera",
    Tools.ToRadians(270),
    Tools.ToRadians(60),
    distance,
    new Vector3(realSizeX() / 2, 0, realSizeZ() / 2),
    scene
  );
  newCamera.attachControl(canvas, true);
  newCamera.upperBetaLimit = Tools.ToRadians(80);
  newCamera.lowerRadiusLimit = 20;
  newCamera.upperRadiusLimit = distance + 20;
};

const realSizeX = () => {
  return sizeX * 2.5;
};

const realSizeZ = () => {
  return sizeZ * 2.5;
};

const startContainerCreation = async () => {
  const area = await enableAreaSelection();
  console.log(area);
};

const addContainerDragBehavior = (container: Container) => {
  const dragBehavior = new PointerDragBehavior({
    dragPlaneNormal: Vector3.Down(),
  });
  dragBehavior.updateDragPlane = false;
  dragBehavior.moveAttached = false;

  dragBehavior.onDragStartObservable.add(() => {
    container.material = container.wallGhostMaterial;
    scene.hoverCursor = "grabbing";
  });

  dragBehavior.onDragEndObservable.add(() => {
    container.material = container.wallMaterial;
    scene.hoverCursor = "grab";
    clearCellMaterials();
  });

  dragBehavior.onDragObservable.add((event) => {
    const newCenter = event.dragPlanePoint;

    const newLowerCorner = centerToLowerCorner(
      newCenter,
      container.sizeI,
      container.sizeJ
    );

    let i = Math.round(newLowerCorner.x / 2.5);
    if (i < 0) i = -1;
    if (i + container.sizeI > sizeX) i = sizeX - container.sizeI;

    let j = Math.round(newLowerCorner.z / 2.5);
    if (j < 0) j = -1;
    if (j + container.sizeJ > sizeZ) j = sizeZ - container.sizeJ;

    const fixedLowerCorner = new Vector3(i * 2.5, newLowerCorner.y, j * 2.5);
    container.position = lowerCornerToCenter(
      fixedLowerCorner,
      container.sizeI,
      container.sizeJ
    );

    highlightCells(
      new Area(
        worldToGrid(fixedLowerCorner),
        worldToGrid(
          centerToUpperCorner(
            container.position,
            container.sizeI,
            container.sizeJ
          )
        )
      )
    );
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
