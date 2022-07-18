import { defineStore } from "pinia";
export const useEditorStore = defineStore({
    id: "editor",
    state: () => ({
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
        selectTerrain(terrain) {
            this.terrain = terrain;
            this.step = 2;
        },
    },
});
//# sourceMappingURL=editor.store.js.map