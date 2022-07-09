<template>
  <div class="payment-view">
    <h1>Detalles del pago:</h1>
    <div class="payment-select">
      Quiero pagar en
      <select class="months-select" v-model="payments">
        <option v-for="no in monthOptions" :key="no" :value="no">
          {{ no }}
        </option>
      </select>
      meses
    </div>
    <div class="row">
      <span>A pagar:</span>
      <span>{{
        `${monthlyPrice.toLocaleString("es-ES", {
          style: "decimal",
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}€ / mes`
      }}</span>
    </div>
    <div class="row">
      <span>Precio total:</span>
      <span
        >{{
          total.toLocaleString("es-ES", {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        }}€</span
      >
    </div>

    <h1>Datos de contacto:</h1>
    <form class="form">
      <div class="input">
        <label for="name">Nombre</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div class="input">
        <label for="surname">Apellidos</label>
        <input type="text" id="surname" v-model="surname" />
      </div>
      <div class="input">
        <label for="phone">Teléfono de contacto</label>
        <input type="text" id="phone" v-model="phone" />
      </div>
      <div class="input">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="input">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="input">
        <label for="password2">Repetir contraseña</label>
        <input type="password" id="password2" v-model="password2" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import usePriceCalculations from "@/components/editor/usePriceCalculations";

const monthOptions = [1, 6, 12, 24, 36, 48, 60];

const name = ref("");
const surname = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const password2 = ref("");
const payments = ref(24);

const { total } = usePriceCalculations();

const monthlyPrice = computed(() => total.value / payments.value);
</script>

<style scoped>
h1 {
  margin: 50px;
}

.payment-view {
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 0;
  overflow-y: scroll;
  align-items: center;
}

label {
  font-size: 0.9rem;
  margin-left: 20px;
  font-weight: 600;
}

.input input {
  margin-top: 10px;
  width: 80%;
}

.row {
  width: 300px;
  display: flex;
  margin: 5px 0;
  justify-content: space-between;
}

.months-select {
  width: 4rem;
  height: 2rem;
}

.payment-select {
  margin-bottom: 20px;
}
</style>
