<template>
  <div class="editor-wrapper">
    <StepComponent />
    <ToolBarComponent />
    <EditorComponent />
    <PriceComponent />
  </div>
</template>

<script setup lang="ts">
import StepComponent from "@/components/editor/StepComponent.vue";
import ToolBarComponent from "@/components/editor/ToolBarComponent.vue";
import EditorComponent from "@/components/editor/EditorComponent.vue";
import PriceComponent from "@/components/editor/PriceComponent.vue";
</script>

<style scoped>
.editor-wrapper {
  position: relative;
}
</style>
