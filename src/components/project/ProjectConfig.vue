<template>
  <div class="config">
    <h2 @click="open = !open">
      <font-awesome-icon icon="angle-up" :class="{ open: open }" />
      Configuración
    </h2>
    <div class="details" :class="{ open: open }">
      <div class="option" v-for="option in options" :key="option.name">
        <div class="col-1">{{ option.name }}</div>
        <div class="col-2">{{ option.value.name }}</div>
        <div class="col-3">{{ option.value.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OptionChosen } from "@/model/model";
import { ref } from "vue";

defineProps<{
  options: Array<OptionChosen>;
}>();

const open = ref(false);
</script>

<style scoped>
.config {
  border-bottom: 2px solid var(--primary-light-1);
}

h2 {
  margin-bottom: 10px;
  cursor: pointer;
}

.details {
  max-height: 0;
  overflow-y: hidden;
  transition: 0.5s;
  padding-bottom: 10px;
}

.details.open {
  max-height: 500px;
}

.details div {
  margin-top: 5px;
}

svg {
  transform: rotate(90deg);
  transition: 0.5s;
}

svg.open {
  transform: rotate(180deg);
}

.option {
  display: flex;
  gap: 20px;
  min-height: 70px;
}

.col-1 {
  flex: 0 0 20%;
  font-weight: 800;
}

.col-2 {
  flex: 0 0 20%;
}

.col-3 {
  flex: 0 0 55%;
  overflow-y: scroll;
  max-height: 70px;
  font-size: 0.9rem;
}
</style>
