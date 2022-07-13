<template>
  <div class="contact">
    <h2 @click="open = !open">
      <font-awesome-icon icon="angle-up" :class="{ open: open }" /> Contacto
    </h2>
    <div class="details" :class="{ open: open }">
      <div>{{ `${client.surname}, ${client.name}` }}</div>
      <div>{{ client.email }}</div>
      <div>{{ client.phone }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ClientInfo } from "@/model/model";
import { ref } from "vue";

defineProps<{
  client: ClientInfo;
}>();

const open = ref(false);
</script>

<style scoped>
.contact {
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
  max-height: 200px;
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
</style>
