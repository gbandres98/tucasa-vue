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
        terrain: undefined,
    }),
    actions: {
        selectTerrain(terrain) {
            this.terrain = terrain;
            this.step = 2;
        },
    },
    getters: {
        price: (state) => {
            let price = 0;
            price += 15000;
            state.containers.forEach((container) => {
                const area = container.sizeI * 2.5 * container.sizeJ * 2.5;
                price += area * (800 + 100 * container.floor);
            });
            if (state.terrain)
                price += state.terrain.price;
            return price;
        },
    },
});
//# sourceMappingURL=editor.store.js.map