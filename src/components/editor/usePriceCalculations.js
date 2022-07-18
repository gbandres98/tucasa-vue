import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor.store";
import { computed } from "vue";
import { getContainerPrice, getIndoorContainerPrice, getPrice, } from "@/editor/util";
export default function usePriceCalculations() {
    const { containerData, indoorContainerData, terrain, walls, modelData, options, } = storeToRefs(useEditorStore());
    const containersPrice = computed(() => {
        if (containerData.value.length > 0)
            return containerData.value.reduce((sum, container) => sum + getContainerPrice(container), 0);
        else
            return indoorContainerData.value.reduce((sum, container) => sum + getIndoorContainerPrice(container), 0);
    });
    const wallPrice = computed(() => 20000 + walls.value.length * 80);
    const furniturePrice = computed(() => modelData.value.reduce((acc, model) => acc + model.model.price, 0));
    const optionPrice = computed(() => options.value.reduce((acc, option) => {
        const selectedValue = option.values.find((v) => v.selected);
        if (selectedValue)
            return acc + selectedValue.price;
        else
            return acc;
    }, 0));
    const terrainPrice = computed(() => terrain.value ? terrain.value.price : 0);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const total = computed(() => containersPrice.value +
        terrainPrice.value +
        wallPrice.value +
        furniturePrice.value +
        optionPrice.value);
    return {
        containersPrice,
        terrainPrice,
        wallPrice,
        furniturePrice,
        optionPrice,
        total,
    };
}
//# sourceMappingURL=usePriceCalculations.js.map