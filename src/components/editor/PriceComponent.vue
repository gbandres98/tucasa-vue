<template>
  <div class="price-wrapper">
    <div class="price-summary" @click="open = !open">
      Precio estimado: <strong>{{ price }}</strong>
      <font-awesome-icon
        :class="{ 'open-icon': true, open: open }"
        icon="angle-down"
      />
    </div>
    <div class="price-detail" :class="{ open: open }">
      <div class="price">
        <span>Contenedores (m2)</span>
        <span>7.000,00€</span>
      </div>
      <div class="price">
        <span>Contenedores (m2)</span>
        <span>7.000,00€</span>
      </div>
      <div class="price">
        <span>Contenedores (m2)</span>
        <span>7.000,00€</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor.store";
import type { Container } from "@/editor/container";

const open = ref(false);
const price = ref(0);
const { containers } = storeToRefs(useEditorStore());

const firstFloorContainerPrice = computed(() => {
  return containers.value.filter(
    // @ts-ignore
    (container: Container) => container.floor === 0
  );
});
</script>

<style scoped>
.price-wrapper {
  position: absolute;
  top: 200px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 3px;
  font-size: 0.9rem;
  width: 250px;
}

.price-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.open-icon {
  margin-left: 10px;
  font-size: 1.3rem;
  transition: 0.3s;
}

.open-icon.open {
  transform: rotate(180deg);
}

.price-detail {
  margin-top: 10px;
  max-height: 0;
  overflow-y: hidden;
  transition: 0.3s;
  font-size: 0.8rem;
}

.price-detail.open {
  max-height: 150px;
}

.price {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 1px solid #adadad;
}
</style>
