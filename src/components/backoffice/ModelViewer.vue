<template>
  <canvas ref="editorCanvas" class="canvas" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Model } from "@/editor/furniture";
import { initModelViewer } from "@/editor/modelViewer";

const props = defineProps<{
  model: Model;
}>();

const editorCanvas = ref<HTMLCanvasElement>();

onMounted(() => {
  if (!editorCanvas.value) return;

  initModelViewer(editorCanvas.value, props.model);
});
</script>

<style scoped>
.canvas {
  margin-top: 30px;
  width: 100%;
  height: 300px;
}
</style>
