import { defineStore } from "pinia";
import type { Container } from "@/editor/container";
import type { ContainerData, Terrain } from "@/model/model";
import type { WallData } from "@/editor/indoorEditor";
import type { PlacedModel } from "@/editor/furniture";

export type EditorState = {
  step: number;
  activeFloor: number;
  isAddContainerActive: boolean;
  isRemoveContainerActive: boolean;
  isAddWallActive: boolean;
  isRemoveWallActive: boolean;
  isDoorPickerActive: boolean;
  containers: Array<Container>;
  terrain: Terrain | undefined;
  containerData: Array<ContainerData>;
  walls: Array<WallData>;
  modelData: Array<PlacedModel>;
};

export const useEditorStore = defineStore({
  id: "editor",
  state: (): EditorState => ({
    step: 1,
    activeFloor: 0,
    isAddContainerActive: false,
    isRemoveContainerActive: false,
    isAddWallActive: false,
    isRemoveWallActive: false,
    isDoorPickerActive: false,
    containers: [],
    terrain: undefined,
    containerData: [],
    walls: [],
    modelData: [],
  }),
  actions: {
    selectTerrain(terrain: Terrain) {
      this.terrain = terrain;
      this.step = 2;
    },
  },
});
