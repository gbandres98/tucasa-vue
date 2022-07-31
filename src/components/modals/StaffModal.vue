<template>
  <ModalComponent :open="open" @modalClose="$emit('staffModalClose')">
    <h1>Asigna un encargado al proyecto:</h1>
    <StaffSelect open @select="onSelect" />
  </ModalComponent>
</template>

<script setup lang="ts">
import ModalComponent from "@/components/modals/ModalComponent.vue";
import { toRefs } from "vue";
import StaffSelect from "@/components/backoffice/StaffSelect.vue";
import type { Staff } from "@/model/model";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "staffModalClose"): void;
  (e: "select", v: Staff): void;
}>();

const { open } = toRefs(props);

const onSelect = (v: Staff) => {
  emit("select", v);
};
</script>

<style scoped>
:deep(.modal) {
  max-width: 600px;
}

.staff-select {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}
</style>
