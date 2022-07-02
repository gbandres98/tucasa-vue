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
        containers: [],
    }),
});
//# sourceMappingURL=editor.store.js.map