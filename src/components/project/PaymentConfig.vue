<template>
  <div class="contact">
    <h2 @click="open = !open">
      <font-awesome-icon icon="angle-up" :class="{ open: open }" /> Presupuesto
    </h2>
    <div class="details" :class="{ open: open }" v-if="project">
      <div class="price-element">
        <span>Parcela:</span>
        <span>{{ formatNumber(terrainPrice) }}€</span>
      </div>
      <div class="price-element">
        <span>Containers:</span>
        <span>{{ formatNumber(containersPrice) }}€</span>
      </div>
      <div class="price-element">
        <span>Obra:</span>
        <span>{{ formatNumber(wallPrice) }}€</span>
      </div>
      <div class="price-element">
        <span>Extras:</span>
        <span>{{ formatNumber(furniturePrice) }}€</span>
      </div>
      <div class="price-element">
        <span>Configuración:</span>
        <span>{{ formatNumber(optionPrice) }}€</span>
      </div>
      <div class="price-element total">
        <span>Total:</span>
        <span class="total-no">{{ formatNumber(total) }}€</span>
      </div>
      <div class="price-element">
        <span>A pagar: </span
        ><span class="total-no">{{
          `${formatNumber(monthly)}€ / mes en ${
            project.payment.payments
          } plazos`
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from "@/model/model";
import { computed, ref } from "vue";
import usePriceCalculations from "@/components/editor/usePriceCalculations";

const props = defineProps<{
  project: Project | undefined;
}>();

const {
  furniturePrice,
  terrainPrice,
  containersPrice,
  wallPrice,
  optionPrice,
  total,
} = usePriceCalculations();

const open = ref(false);

const formatNumber = (n: number) =>
  n.toLocaleString("es-ES", {
    style: "decimal",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

const monthly = computed(() =>
  props.project ? total.value / props.project.payment.payments : 0
);
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

.price-element {
  display: flex;
  justify-content: space-between;
}

.total {
  border-top: 1px solid var(--primary-light-1);
}

.total-no {
  font-weight: 600;
}
</style>
