<template>
  <canvas ref="editorCanvas" class="canvas" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { createScene } from "@/editor/editor";

const editorCanvas = ref<HTMLCanvasElement>();

onMounted(() => {
  if (editorCanvas.value) createScene(editorCanvas.value);
});
</script>

<style scoped>
.canvas {
  width: 100%;
  height: calc(100vh - 207px);
}
</style>
