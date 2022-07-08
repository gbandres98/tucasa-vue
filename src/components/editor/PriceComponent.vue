<template>
  <div class="price-wrapper">
    <div class="price-summary" @click="open = !open">
      Precio estimado: <strong>{{ `${price.toLocaleString()}€` }}</strong>
      <font-awesome-icon
        :class="{ 'open-icon': true, open: open }"
        icon="angle-down"
      />
    </div>
    <div class="price-detail" :class="{ open: open }">
      <div class="price">
        <span>Parcela:</span>
        <span>{{ `${terrain.price.toLocaleString()}€` }}</span>
      </div>
      <div class="price">
        <span>Containers:</span>
        <span>{{ containersPrice.toLocaleString() }}€</span>
      </div>
      <div class="price">
        <span>Obra:</span>
        <span>{{ wallPrices.toLocaleString() }}€</span>
      </div>
      <div class="price">
        <span>Extras:</span>
        <span>{{ furniturePrices.toLocaleString() }}€</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor.store";
import { getPrice, getContainerPrice } from "@/editor/util";
import type { ContainerData } from "@/model/model";

const open = ref(false);
const { containerData, terrain, walls, modelData } = storeToRefs(
  useEditorStore()
);

const containersPrice = computed((): number => {
  return containerData.value.reduce(
    (sum, container) => sum + getContainerPrice(container),
    0
  );
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const price = computed(() => getPrice(containerData.value, terrain.value));

const wallPrices = computed(() => 20000 + walls.value.length * 80);

const furniturePrices = computed(() =>
  modelData.value.reduce((acc, model) => acc + model.model.price, 0)
);
</script>

<style scoped>
.price-wrapper {
  position: absolute;
  top: 200px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 3px;
  font-size: 0.9rem;
  width: 250px;
}

.price-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.open-icon {
  margin-left: 10px;
  font-size: 1.3rem;
  transition: 0.3s;
}

.open-icon.open {
  transform: rotate(180deg);
}

.price-detail {
  margin-top: 10px;
  max-height: 0;
  overflow-y: hidden;
  transition: 0.3s;
  font-size: 0.8rem;
}

.price-detail.open {
  max-height: 150px;
}

.price {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 1px solid #adadad;
}
</style>
