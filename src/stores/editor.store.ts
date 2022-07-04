import { defineStore } from "pinia";
import type { Container } from "@/editor/container";
import type { Terrain } from "@/model/model";

export type EditorState = {
  step: number;
  activeFloor: number;
  isAddContainerActive: boolean;
  isRemoveContainerActive: boolean;
  isAddWallActive: boolean;
  isRemoveWallActive: boolean;
  containers: Array<Container>;
  terrain: Terrain | undefined;
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
    containers: [],
    terrain: undefined,
  }),
  actions: {
    selectTerrain(terrain: Terrain) {
      this.terrain = terrain;
      this.step = 2;
    },
  },
  getters: {
    price: (state): number => {
      let price = 0;

      price += 15000;

      state.containers.forEach((container) => {
        const area = container.sizeI * 2.5 * container.sizeJ * 2.5;

        price += area * (800 + 100 * container.floor);
      });

      if (state.terrain) price += state.terrain.price;

      return price;
    },
  },
});
