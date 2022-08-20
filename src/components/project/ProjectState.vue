<template>
  <div>
    <span
      >Estado del proyecto: <span class="status">{{ statusName }}</span></span
    >
    <div class="status-text">
      {{ statusUserText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HomeStatus } from "@/model/model";
import { computed } from "vue";

const props = defineProps<{
  status: HomeStatus;
}>();

const statusName = computed(() => {
  switch (props.status) {
    case "NEW":
      return "Nuevo proyecto";
    case "ASSIGNED":
      return "Encargado asignado";
    case "IN_PROGRESS":
      return "En construcción";
    case "WAITING":
      return "Falta información";
    case "FINISHED":
      return "Finalizado";
    default:
      return props.status;
  }
});

const statusUserText = computed(() => {
  switch (props.status) {
    case "NEW":
      return "El proyecto ha sido creado. Ahora puedes revisar el presupuesto y modificar tu diseño hasta que sea justo como tú quieres.";
    case "ASSIGNED":
      return "Se ha asignado un encargado al proyecto que contactará contigo para ultimar los detalles de la obra.";
    case "IN_PROGRESS":
      return "¡Estamos trabajando en tu casa! Vuelve a esta página para ver el estado de la obra y utiliza el chat si tienes cualquier duda.";
    case "WAITING":
      return "Ya está todo casi listo, sólo necesitamos que envíes el contrato firmado y comenzaremos a trabajar en tu casa.";
    case "FINISHED":
      return "¡Tu casa ya está lista! El encargado se pondrá en contacto contigo para organizar la entrega.";
    default:
      return props.status;
  }
});
</script>

<style scoped>
.status {
  font-weight: 600;
  font-size: 1.2rem;
}

.status-text {
  margin-top: 10px;
  background-color: var(--primary-light-1);
  padding: 10px;
  border-radius: 5px;
}
</style>
