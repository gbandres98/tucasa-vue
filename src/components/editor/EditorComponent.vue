<template>
  <canvas ref="editorCanvas" :class="{ canvas: true, reduce: !view }" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { createScene } from "@/editor/editor";

const props = defineProps<{
  view?: string;
}>();

const editorCanvas = ref<HTMLCanvasElement>();

onMounted(() => {
  if (!editorCanvas.value) return;

  createScene(editorCanvas.value, props.view);
});
</script>

<style scoped>
.canvas {
  width: 100%;
  height: calc(100vh - 117px);
}

.canvas.reduce {
  height: calc(100vh - 207px);
}
</style>
