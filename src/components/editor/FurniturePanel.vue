<template>
  <div class="furniture-panel">asdasd</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getModels } from "@/editor/furniture";
import type { Model } from "@/editor/furniture";

const furnitures = ref(new Array<Model>());

onMounted(async () => {
  furnitures.value = await getModels("door");
});
</script>

<style scoped>
.furniture-panel {
  background-color: white;
  border: 1px solid black;
  border-radius: 2px;
  position: absolute;
  top: 110%;
}
</style>
