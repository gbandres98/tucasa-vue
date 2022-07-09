import { defineStore } from "pinia";
export const useEditorStore = defineStore({
    id: "editor",
    state: () => ({
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