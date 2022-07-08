<template>
  <div class="furniture-panel">
    <div
      class="furniture"
      v-for="furniture in furnitures"
      :key="furniture.name"
      @click="pickFurniture(furniture)"
    >
      <img :src="furniture.preview" alt="furniture preview" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getModels, startFurniturePlacement } from "@/editor/furniture";
import type { Model } from "@/editor/furniture";

const furnitures = ref(new Array<Model>());

onMounted(async () => {
  furnitures.value = await getModels("door");
});

const pickFurniture = (model: Model) => {
  console.log(model);
  startFurniturePlacement(model);
};
</script>

<style scoped>
.furniture-panel {
  background-color: white;
  border: 1px solid black;
  border-radius: 2px;
  position: absolute;
  top: 110%;
  display: flex;
  flex-wrap: wrap;
  z-index: 100;
}

.furniture {
  width: 50px;
}

.furniture img {
  max-width: 100%;
}
</style>
