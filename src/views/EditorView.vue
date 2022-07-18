<template>
  <div class="editor-wrapper">
    <StepComponent />
    <TerrainPicker v-if="step === 1" />
    <ToolBarComponent v-if="step === 2 || step === 3" />
    <div class="editor" v-if="step === 2 || step === 3">
      <EditorComponent />
    </div>
    <PriceComponent v-if="step === 2 || step === 3 || step === 4" />
    <ConfigComponent v-if="step === 4" />
  </div>
</template>

<script setup lang="ts">
import StepComponent from "@/components/editor/StepComponent.vue";
import ToolBarComponent from "@/components/editor/ToolBarComponent.vue";
import EditorComponent from "@/components/editor/EditorComponent.vue";
import PriceComponent from "@/components/editor/PriceComponent.vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor.store";
import TerrainPicker from "@/components/editor/TerrainPicker.vue";
import ConfigComponent from "@/components/editor/ConfigComponent.vue";

const { step } = storeToRefs(useEditorStore());
</script>

<style scoped>
.editor-wrapper {
  position: relative;
}

.editor {
  height: calc(100vh - 207px);
}
</style>
