<template>
  <div class="price-wrapper">
    <div class="price-summary" @click="open = !open">
      Precio estimado:
      <strong>{{
        `${total.toLocaleString("es-ES", {
          style: "decimal",
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}€`
      }}</strong>
      <font-awesome-icon
        :class="{ 'open-icon': true, open: open }"
        icon="angle-down"
      />
    </div>
    <div class="price-detail" :class="{ open: open }">
      <div class="price">
        <span>Parcela:</span>
        <span>{{
          `${terrainPrice.toLocaleString("es-ES", {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}€`
        }}</span>
      </div>
      <div class="price">
        <span>Containers:</span>
        <span
          >{{
            containersPrice.toLocaleString("es-ES", {
              style: "decimal",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
          }}€</span
        >
      </div>
      <div class="price">
        <span>Obra:</span>
        <span
          >{{
            wallPrice.toLocaleString("es-ES", {
              style: "decimal",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
          }}€</span
        >
      </div>
      <div class="price">
        <span>Extras:</span>
        <span
          >{{
            furniturePrice.toLocaleString("es-ES", {
              style: "decimal",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
          }}€</span
        >
      </div>
      <div class="price">
        <span>Configuración:</span>
        <span
          >{{
            optionPrice.toLocaleString("es-ES", {
              style: "decimal",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
          }}€</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import usePriceCalculations from "@/components/editor/usePriceCalculations";

const open = ref(false);

const {
  containersPrice,
  wallPrice,
  terrainPrice,
  furniturePrice,
  optionPrice,
  total,
} = usePriceCalculations();
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
  transition: 0.5s;
  font-size: 0.8rem;
}

.price-detail.open {
  max-height: 300px;
}

.price {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 1px solid #adadad;
}
</style>
