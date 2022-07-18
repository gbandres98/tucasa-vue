import { defineStore } from "pinia";
import type { Container } from "@/editor/container";
import type { ContainerData, Terrain, Option } from "@/model/model";
import type { WallData } from "@/editor/indoorEditor";
import type { PlacedModel } from "@/editor/furniture";
import type { IndoorContainerData } from "@/editor/indoorEditor";

export type EditorState = {
  loaded: boolean;
  step: number;
  activeFloor: number;
  isAddContainerActive: boolean;
  isRemoveContainerActive: boolean;
  isAddWallActive: boolean;
  isRemoveWallActive: boolean;
  isDoorPickerActive: boolean;
  isWindowPickerActive: boolean;
  containers: Array<Container>;
  terrain: Terrain | undefined;
  containerData: Array<ContainerData>;
  indoorContainerData: Array<IndoorContainerData>;
  walls: Array<WallData>;
  modelData: Array<PlacedModel>;
  options: Array<Option>;
};

export const useEditorStore = defineStore({
  id: "editor",
  state: (): EditorState => ({
    loaded: false,
    step: 1,
    activeFloor: 0,
    isAddContainerActive: false,
    isRemoveContainerActive: false,
    isAddWallActive: false,
    isRemoveWallActive: false,
    isDoorPickerActive: false,
    isWindowPickerActive: false,
    containers: [],
    terrain: undefined,
    containerData: [],
    indoorContainerData: [],
    walls: [],
    modelData: [],
    options: [],
  }),
  actions: {
    selectTerrain(terrain: Terrain) {
      this.terrain = terrain;
      this.step = 2;
    },
  },
});
