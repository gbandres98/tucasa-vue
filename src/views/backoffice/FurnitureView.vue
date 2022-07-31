<template>
  <div class="backoffice-panel-wrapper">
    <h1>Modelos</h1>
    <h2>Puertas:</h2>
    <div class="bo-list">
      <ModelComponent v-for="model in doors" :key="model.id" :model="model" />
    </div>
    <h2>Ventanas:</h2>
    <div class="bo-list">
      <ModelComponent v-for="model in windows" :key="model.id" :model="model" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { Model } from "@/editor/furniture";
import { onMounted, ref } from "vue";
import { getModels } from "@/editor/furniture";
import ModelComponent from "@/components/backoffice/ModelComponent.vue";

const doors: Ref<Array<Model>> = ref([]);
const windows: Ref<Array<Model>> = ref([]);

onMounted(async () => (doors.value = await getModels(false)));
onMounted(async () => (windows.value = await getModels(true)));
</script>

<style scoped>
h2 {
  margin-top: 40px;
}
</style>
