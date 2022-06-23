import {
  ActionManager,
  ExecuteCodeAction,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import {
  areasOverlap,
  centerToLowerCorner,
  getContainerArea,
  lowerCornerToCenter,
} from "@/editor/util";
import type { Area } from "@/editor/grid";
import { createContainerUI, deleteContainerUI } from "@/editor/ui";
import type { Control } from "@babylonjs/gui";
import {
  wallErrorMaterial,
  wallGhostMaterial,
  wallMaterial,
} from "@/editor/materials";
import { useEditorStore } from "@/stores/editor.store";

export const MAX_FLOOR = 2;

const containers: Array<Container> = useEditorStore()
  .containers as Array<Container>;

export class Container extends Mesh {
  sizeI: number;
  sizeJ: number;
  floor: number;

  lastCorrectPosition: Vector3;

  wallMaterial: StandardMaterial;
  wallGhostMaterial: StandardMaterial;
  wallErrorMaterial: StandardMaterial;

  deletionBehaviors: Array<ExecuteCodeAction>;
  uiControls: Array<Control>;
}

export const createContainer = (sizeI: number, sizeJ: number) => {
  const container = MeshBuilder.CreateBox(`container-${Date.now()}`, {
    width: 2.5,
    depth: 2.5,
    height: 4,
    updatable: true,
  }) as Container;
  container.material = wallMaterial;

  container.wallMaterial = wallMaterial;
  container.wallGhostMaterial = wallGhostMaterial;
  container.wallErrorMaterial = wallErrorMaterial;

  container.position.y = useEditorStore().activeFloor * 4 + 2;
  resizeContainer(container, sizeI, sizeJ);

  container.floor = useEditorStore().activeFloor;

  container.isPickable = true;
  container.enablePointerMoveEvents = true;

  container.actionManager = new ActionManager();
  container.actionManager.hoverCursor = "grab";

  containers.push(container);

  container.deletionBehaviors = [];
  container.uiControls = [];

  createContainerUI(
    container,
    () => deleteContainer(container),
    () => rotateContainer(container),
    () => increaseContainerFloor(container),
    () => decreaseContainerFloor(container)
  );

  return container;
};

export const resizeContainer = (container: Container, i: number, j: number) => {
  container.sizeI = i;
  container.sizeJ = j;
  container.scaling.x = container.sizeI;
  container.scaling.z = container.sizeJ;

  correctPosition(container);

  validatePositionAll();
};

export const correctPosition = (container: Container) => {
  const lowerCorner = centerToLowerCorner(
    container.position,
    container.sizeI,
    container.sizeJ
  );

  const newLowerCorner = new Vector3(
    roundCoord(lowerCorner.x),
    lowerCorner.y,
    roundCoord(lowerCorner.z)
  );

  if (newLowerCorner.x < 0) {
    newLowerCorner.x = 0;
  }

  if (newLowerCorner.z < 0) {
    newLowerCorner.z = 0;
  }

  const newPosition = lowerCornerToCenter(
    newLowerCorner,
    container.sizeI,
    container.sizeJ
  );

  container.position = newPosition;

  return newPosition;
};

export const roundCoord = (coord: number) =>
  Math.floor(coord / 2.5 + 0.5) * 2.5;

export const startContainerDeletionSelection = () => {
  containers.forEach((container) => {
    const pointerOverAction = new ExecuteCodeAction(
      ActionManager.OnPointerOverTrigger,
      function () {
        container.material = wallErrorMaterial;
      }
    );
    container.actionManager?.registerAction(pointerOverAction);

    const pointerOutAction = new ExecuteCodeAction(
      ActionManager.OnPointerOutTrigger,
      function () {
        container.material = wallMaterial;
      }
    );
    container.actionManager?.registerAction(pointerOutAction);

    const clickAction = new ExecuteCodeAction(
      ActionManager.OnLeftPickTrigger,
      function () {
        deleteContainer(container);
      }
    );
    container.actionManager?.registerAction(clickAction);

    container.deletionBehaviors.push(
      pointerOverAction,
      pointerOutAction,
      clickAction
    );
  });
};

export const deleteContainer = (container: Container) => {
  useEditorStore().containers = containers.filter((c) => c != container);
  container.dispose();
  deleteContainerUI(container);
  stopContainerDeletion();
};

export const stopContainerDeletion = () => {
  containers.forEach((container) => {
    container.deletionBehaviors.forEach((action) =>
      container.actionManager?.unregisterAction(action)
    );
  });
};

export const containerInArea = (
  area: Area,
  ignoreContainer?: Container,
  floor?: number
) => {
  return useEditorStore()
    .containers.filter((container) => {
      if (container.id === ignoreContainer?.id) return false;
      if (floor != undefined && ignoreContainer && container.floor != floor)
        return false;

      return true;
    })
    .some((container) =>
      areasOverlap(area, getContainerArea(container as Container))
    );
};

export const isContainerColliding = (container: Container) => {
  return containerInArea(
    getContainerArea(container),
    container,
    container.floor
  );
};

export const isSupported = (container: Container) => {
  if (container.floor == 0) return true;

  return containerInArea(
    getContainerArea(container),
    container,
    container.floor - 1
  );
};

const rotateContainer = (container: Container) => {
  resizeContainer(container, container.sizeJ, container.sizeI);
};

const increaseContainerFloor = (container: Container) => {
  if (container.floor == MAX_FLOOR) return;

  container.floor++;
  container.position.y = 2 + container.floor * 4;

  validatePositionAll();
};

const decreaseContainerFloor = (container: Container) => {
  if (container.floor == 0) return;

  container.floor--;
  container.position.y = 2 + container.floor * 4;

  validatePositionAll();
};

export const validatePosition = (container: Container) => {
  if (isContainerColliding(container) || !isSupported(container)) {
    container.material = container.wallErrorMaterial;
    return false;
  }

  container.material = container.wallMaterial;
  return true;
};

export const validatePositionAll = () => {
  let res = true;

  containers.forEach((container) => {
    if (!validatePosition(container)) res = false;
  });

  return res;
};
