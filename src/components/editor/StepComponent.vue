<template>
  <div class="steps-wrapper">
    <div :class="getClasses(1)">Elige el terreno</div>
    <div :class="getClasses(2)">Añade contenedores</div>
    <div :class="getClasses(3)">Personaliza</div>
    <div :class="getClasses(4)">Configura</div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "@/stores/editor.store";
import { storeToRefs } from "pinia";

const { step } = storeToRefs(useEditorStore());

function getClasses(i: number) {
  return {
    step: true,
    done: step.value > i,
    active: step.value == i,
    next: step.value + 1 == i,
    disabled: step.value > i + 1,
  };
}
</script>

<style scoped>
@import "@/assets/color.css";

.steps-wrapper {
  box-sizing: content-box;
  display: flex;
  justify-content: space-evenly;
  height: 50px;
}

.step {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #d2d2d2;
  font-weight: 700;
  position: relative;
}

.step.done {
  border-bottom: 4px solid var(--primary);
  color: #c2c2c2;
}

.step.active {
  border-bottom: 4px solid var(--primary);
  color: var(--primary);
}

.step.disabled {
  color: #c2c2c2;
}

.step.next {
  cursor: pointer;
}

.step.next:hover {
  color: #4f4f4f;
}

.step.next:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 4px;
  bottom: -2px;
  left: 0;
  background-color: var(--primary);
  transition: 0.5s ease-in;
  transform: scaleX(0);
  transform-origin: 0 50%;
}
.step.next:hover:after {
  transform: scaleX(0.7);
}
</style>
