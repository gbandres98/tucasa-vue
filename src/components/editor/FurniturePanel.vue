<template>
  <div class="furniture-panel">
    <div
      class="furniture"
      v-for="furniture in furnitures"
      :key="furniture.name"
      @click="pickFurniture(furniture)"
    >
      <img :src="furniture.preview" alt="furniture preview" />
      <span class="name">{{ furniture.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getModels, startFurniturePlacement } from "@/editor/furniture";
import type { Model } from "@/editor/furniture";
import { endWallCreation } from "@/editor/indoorEditor";

const props = defineProps<{
  type: "door" | "window";
}>();

const emit = defineEmits<{
  (e: "picked"): void;
}>();

const furnitures = ref(new Array<Model>());

onMounted(async () => {
  furnitures.value = await getModels(props.type === "window");
});

const pickFurniture = (model: Model) => {
  emit("picked");
  endWallCreation();
  startFurniturePlacement(model);
};
</script>

<style scoped>
.furniture-panel {
  background-color: white;
  border: 3px solid var(--primary);
  border-radius: 2px;
  position: absolute;
  top: 110%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
}

.furniture {
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.furniture img {
  width: 100%;
  height: 100%;
}

.furniture:hover {
  box-shadow: inset 0px 0px 4px 0px rgba(158, 158, 158, 1);
}

.furniture:hover .name {
  font-weight: 800;
}

.name {
  font-size: 0.6rem;
}
</style>
