import {
  ActionManager,
  ExecuteCodeAction,
  Mesh,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";
import {
  cellHighlightMaterial,
  cellHoverMaterial,
  cellMaterial,
} from "@/editor/materials";
import { useEditorStore } from "@/stores/editor.store";
import { MAX_FLOOR } from "@/editor/container";

export class GridCoords {
  i: number;
  j: number;

  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
  }

  hash() {
    return `${this.i}-${this.j}`;
  }
}

export class Area {
  start: GridCoords;
  end: GridCoords;

  constructor(start: GridCoords, end: GridCoords) {
    this.start = start;
    this.end = end;
  }

  sizeI() {
    return Math.abs(this.start.i - this.end.i) + 1;
  }

  sizeJ() {
    return Math.abs(this.start.j - this.end.j) + 1;
  }

  firstI() {
    return Math.min(this.start.i, this.end.i);
  }

  firstJ() {
    return Math.min(this.start.j, this.end.j);
  }

  lastI() {
    return Math.max(this.start.i, this.end.i);
  }

  lastJ() {
    return Math.max(this.start.j, this.end.j);
  }
}

class Cell extends Mesh {
  coords: GridCoords;
  areaSelectionStartAction: ExecuteCodeAction | undefined;
  areaSelectionEndAction: ExecuteCodeAction | undefined;
  areaSelectionHoverAction: ExecuteCodeAction | undefined;

  lowerX() {
    return this.coords.i * 2.5 - 1.25;
  }

  upperX() {
    return this.coords.i * 2.5 + 1.25;
  }

  lowerZ() {
    return this.coords.j * 2.5 - 1.25;
  }

  upperZ() {
    return this.coords.j * 2.5 + 1.25;
  }
}

class Grid {
  private grid: { [coords: string]: Cell };

  constructor() {
    this.grid = {};
  }

  add(cell: Cell) {
    this.grid[cell.coords.hash()] = cell;
  }

  get(coords: GridCoords): Cell | undefined {
    return this.grid[coords.hash()];
  }

  cells(): Cell[] {
    return Object.entries(this.grid).map((entry) => entry[1]);
  }
}

const grid: Grid = new Grid();
let areaSelectionPromiseResolve: (area: Area) => void;
let areaSelectionPromiseReject: (reason: any) => void;
let areaSelectionStart: GridCoords;

export const createGrid = (scene: Scene, sizeX: number, sizeZ: number) => {
  scene.getBoundingBoxRenderer().frontColor.set(0.8, 0.8, 0.8);
  scene.getBoundingBoxRenderer().showBackLines = false;

  for (let i = 0; i <= sizeX; i++) {
    for (let j = 0; j <= sizeZ; j++) {
      const cell = MeshBuilder.CreateBox("cell", {
        width: 2.5,
        height: 0.1,
        depth: 2.5,
      }) as Cell;

      cell.coords = new GridCoords(i, j);

      grid.add(cell);

      cell.position = new Vector3(i * 2.5, 0, j * 2.5);
      cell.material = cellMaterial;
      cell.showBoundingBox = true;

      cell.actionManager = new ActionManager(scene);

      cell.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function () {
          cell.material = cellHoverMaterial;
        })
      );

      cell.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, function () {
          cell.material = cellMaterial;
        })
      );
      cell.actionManager.hoverCursor = "default";
    }
  }
};

export const getCellsInArea = (area: Area): Cell[] => {
  const res = [];

  for (let i = 0; i < area.sizeI(); i++) {
    for (let j = 0; j < area.sizeJ(); j++) {
      const cell = grid.get(
        new GridCoords(area.firstI() + i, area.firstJ() + j)
      );
      if (cell) {
        res.push(cell);
      }
    }
  }

  return res;
};

export const worldToGrid = (worldCoords: Vector3): GridCoords => {
  const i = Math.floor((worldCoords.x + 1.25) / 2.5);
  const j = Math.floor((worldCoords.z + 1.25) / 2.5);

  return new GridCoords(i, j);
};

export const gridToWorld = (gridCoords: GridCoords, y: number) =>
  new Vector3(gridCoords.i * 2.5, y, gridCoords.j * 2.5);

export const getCell = (gridCoords: GridCoords): Cell | undefined => {
  return grid.get(gridCoords);
};

export const highlightCells = (area: Area) => {
  clearCellMaterials();

  const cells = getCellsInArea(area);

  cells.forEach((cell) => {
    cell.material = cellHighlightMaterial;
    cell.renderingGroupId = 1;
  });
};

export const clearCellMaterials = () => {
  grid.cells().forEach((cell) => {
    cell.material = cellMaterial;
    cell.renderingGroupId = 0;
  });
};

export const enableAreaSelection = (): Promise<Area> => {
  const promise = new Promise<Area>((resolve, reject) => {
    areaSelectionPromiseResolve = resolve;
    areaSelectionPromiseReject = reject;
  });

  grid.cells().forEach((cell) => {
    cell.areaSelectionStartAction = new ExecuteCodeAction(
      ActionManager.OnLeftPickTrigger,
      function (event) {
        highlightCells(new Area(cell.coords, cell.coords));
        areaSelectionStart = cell.coords;
        clearSelectionStartActions();
        enableAreaSelectionEnd();
      }
    );

    cell.actionManager?.registerAction(cell.areaSelectionStartAction);
  });

  return promise;
};

const enableAreaSelectionEnd = () => {
  grid.cells().forEach((cell) => {
    cell.areaSelectionEndAction = new ExecuteCodeAction(
      ActionManager.OnLeftPickTrigger,
      function (event) {
        clearCellMaterials();
        clearSelectionEndActions();
        areaSelectionPromiseResolve(new Area(areaSelectionStart, cell.coords));
      }
    );

    cell.areaSelectionHoverAction = new ExecuteCodeAction(
      ActionManager.OnPointerOverTrigger,
      function (event) {
        clearCellMaterials();
        highlightCells(new Area(areaSelectionStart, cell.coords));
      }
    );

    cell.actionManager?.registerAction(cell.areaSelectionEndAction);
    cell.actionManager?.registerAction(cell.areaSelectionHoverAction);
  });
};

const clearSelectionStartActions = () => {
  grid.cells().forEach((cell) => {
    if (cell.areaSelectionStartAction && cell.actionManager)
      cell.actionManager.unregisterAction(cell.areaSelectionStartAction);
  });
};

const clearSelectionEndActions = () => {
  grid.cells().forEach((cell) => {
    if (cell.areaSelectionEndAction && cell.actionManager)
      cell.actionManager.unregisterAction(cell.areaSelectionEndAction);

    if (cell.areaSelectionHoverAction && cell.actionManager)
      cell.actionManager.unregisterAction(cell.areaSelectionHoverAction);
  });
};

export const cancelAreaSelection = () => {
  clearSelectionStartActions();
  clearSelectionEndActions();
};

export const disableGridEffects = () => {
  grid.cells().forEach((cell) => (cell.isPickable = false));
};

export const gridUp = () => {
  if (useEditorStore().activeFloor >= MAX_FLOOR) return;

  useEditorStore().activeFloor++;
  updateGridHeight();
};

export const gridDown = () => {
  if (useEditorStore().activeFloor <= 0) return;

  useEditorStore().activeFloor--;
  updateGridHeight();
};

const updateGridHeight = () => {
  grid.cells().forEach((cell) => {
    cell.position.y = useEditorStore().activeFloor * 4;
  });
};

export const hideGrid = () => {
  grid.cells().forEach((cell) => {
    cell.setEnabled(false);
  });
};
