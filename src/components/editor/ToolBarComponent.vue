<template>
  <div class="toolbar">
    <div
      v-if="step === 2"
      :class="{ tool: true, active: isAddContainerActive }"
      @click="addContainer"
    >
      <font-awesome-icon class="tool-icon" icon="cube" />
      <span class="tool-text">Añadir contenedor</span>
    </div>
    <div
      v-if="step === 2"
      :class="{ tool: true, active: isRemoveContainerActive }"
      @click="removeContainer"
    >
      <font-awesome-icon class="tool-icon" icon="trash-can" />
      <span class="tool-text">Eliminar contenedor</span>
    </div>
    <div
      v-if="step === 3"
      :class="{ tool: true, active: isAddWallActive }"
      @click="addWall"
    >
      <div class="tool-icon">
        <img :src="wallIcon" alt="añadir paredes" />
      </div>
      <span class="tool-text">Añadir paredes</span>
    </div>
    <div
      v-if="step === 3"
      :class="{ tool: true, active: isRemoveWallActive }"
      @click="removeWall"
    >
      <font-awesome-icon class="tool-icon" icon="trash-can" />
      <span class="tool-text">Eliminar paredes</span>
    </div>
    <div v-if="step === 3" :class="{ tool: true, active: isDoorPickerActive }">
      <font-awesome-icon
        class="tool-icon"
        icon="door-closed"
        @click="openDoorPicker"
      />
      <span class="tool-text">Puertas</span>
      <FurniturePanel v-show="isDoorPickerActive" />
    </div>
    <div v-if="step === 3" :class="{ tool: true, active: false }">
      <div class="tool-icon">
        <img :src="windowIcon" alt="añadir paredes" />
      </div>
      <span class="tool-text">Ventanas</span>
    </div>
    <div v-if="step === 3" :class="{ tool: true, active: false }">
      <font-awesome-icon class="tool-icon" icon="couch" />
      <span class="tool-text">Muebles</span>
    </div>
    <div class="floor-buttons-wrapper">
      <div class="floor-buttons">
        <font-awesome-icon
          class="tool-icon floor"
          icon="angle-up"
          @click="floorUp"
        />
        <font-awesome-icon
          class="tool-icon floor"
          icon="angle-down"
          @click="floorDown"
        />
      </div>
      <span class="tool-text">Planta</span>
    </div>
    <button class="button-primary step-button" @click="nextStep">
      Siguiente paso
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor.store";
import {
  stopContainerCreation,
  startContainerCreation,
  startContainerRemoval,
  stopContainerRemoval,
} from "@/editor/editor";
import { gridDown, gridUp } from "@/editor/grid";
import {
  decreaseFloor,
  increaseFloor,
  startIndoorEditor,
} from "@/editor/indoorEditor";
import wallIcon from "@/assets/icons/wall.png";
import windowIcon from "@/assets/icons/window.svg";
import { startWallCreation, startWallDeletion } from "@/editor/indoorEditor";
import FurniturePanel from "@/components/editor/FurniturePanel.vue";

const {
  step,
  isAddContainerActive,
  isRemoveContainerActive,
  isAddWallActive,
  isRemoveWallActive,
  isDoorPickerActive,
} = storeToRefs(useEditorStore());

function addContainer() {
  if (step.value !== 2) return;
  if (isAddContainerActive.value) stopContainerCreation();
  else startContainerCreation();
}

function removeContainer() {
  if (step.value !== 2) return;
  if (isRemoveContainerActive.value) stopContainerRemoval();
  else startContainerRemoval();
}

function addWall() {
  if (step.value !== 3) return;
  startWallCreation();
}

function removeWall() {
  if (step.value !== 3) return;
  startWallDeletion();
}

function floorUp() {
  if (step.value == 2) gridUp();
  if (step.value == 3) increaseFloor();
}

function floorDown() {
  if (step.value == 2) gridDown();
  if (step.value == 3) decreaseFloor();
}

function nextStep() {
  if (step.value == 2) {
    startIndoorEditor();
    return;
  }

  if (step.value == 3) {
    step.value = 4;
    return;
  }
}

function openDoorPicker() {
  isDoorPickerActive.value = !isDoorPickerActive.value;
}
</script>

<style scoped>
@import "@/assets/color.css";

.toolbar {
  height: 90px;
  border-bottom: 2px solid #d2d2d2;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 50px;
}

.tool {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  cursor: pointer;
  position: relative;
}

.tool-icon {
  box-sizing: content-box;
  height: 30px;
  width: 30px;
  padding: 10px;
  border: 1px solid #ededed;
  transition: 0.2s;
}

.tool-text {
  margin-top: 5px;
  font-size: 0.7rem;
  transition: 0.2s;
}

.tool:hover .tool-text {
  color: var(--primary);
}

.tool:not(.active):hover .tool-icon {
  color: var(--primary);
}

.tool:not(.active):hover img {
  filter: invert(66%) sepia(85%) saturate(311%) hue-rotate(4deg)
    brightness(102%) contrast(87%);
}

.tool.active .tool-text {
  color: var(--primary);
}

.tool.active .tool-icon {
  background-color: var(--primary);
  color: white;
}

.tool.active .tool-icon img {
  filter: invert(100%) sepia(0%) saturate(68%) hue-rotate(57deg)
    brightness(117%) contrast(101%);
}

.tool-icon img {
  transition: 0.2s;
  height: 100%;
  width: 100%;
}

.step-button {
  margin-left: 50px;
}

.floor-buttons-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
}

.floor-buttons {
  display: flex;
  flex-direction: column;
}

.tool-icon.floor {
  height: 20px;
  padding: 2px 10px;
  cursor: pointer;
  transition: 0.2s;
}

.tool-icon.floor:hover {
  color: var(--primary);
  border-color: var(--primary);
}

.tool-icon.floor:active {
  transition: 0.05s;
  box-shadow: inset 0px 0px 5px #c1c1c1;
}

.tool-icon img {
  transition: 0.2s;
  height: 100%;
  width: 100%;
}
</style>
