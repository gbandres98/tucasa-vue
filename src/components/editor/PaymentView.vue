<template>
  <div class="payment-view">
    <div class="payment-details">
      <h1>Detalles del pago</h1>
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
        <span class="price">{{
          `${monthlyPrice.toLocaleString("es-ES", {
            style: "decimal",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}€ / mes`
        }}</span>
      </div>
      <div class="row">
        <span>Precio total:</span>
        <span class="price"
          >{{
            total.toLocaleString("es-ES", {
              style: "decimal",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
          }}€</span
        >
      </div>
    </div>

    <form class="form">
      <h1>Datos de contacto</h1>
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
      <FormError :msg="passwordError" />
    </form>

    <button
      class="button-primary"
      :disabled="!buttonActive"
      @click="onContinue"
    >
      Continuar
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import usePriceCalculations from "@/components/editor/usePriceCalculations";
import FormError from "@/components/FormError.vue";
import { createProject } from "@/client/project";

const monthOptions = [1, 6, 12, 24, 36, 48, 60];

const name = ref("");
const surname = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const password2 = ref("");
const payments = ref(24);
const passwordError = ref("");

const { total } = usePriceCalculations();

const monthlyPrice = computed(() => total.value / payments.value);

const buttonActive = computed(
  () =>
    name.value &&
    surname.value &&
    phone.value &&
    email.value &&
    password.value &&
    password2.value
);

const onContinue = async () => {
  passwordError.value = "";

  if (!buttonActive.value) return;

  if (password.value != password2.value)
    passwordError.value = "Las contraseñas no coinciden";

  const error = await createProject(
    {
      payments: payments.value,
      totalPrice: total.value,
    },
    {
      name: name.value,
      surname: surname.value,
      phone: phone.value,
      email: email.value,
    },
    password.value
  );

  if (error) passwordError.value = error;
};
</script>

<style scoped>
h1 {
  margin-bottom: 10px;
}

.payment-view {
  max-height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  align-items: center;
  gap: 40px;
}

label {
  font-size: 0.9rem;
  margin-left: 20px;
  font-weight: 600;
}

.input input {
  margin-top: 5px;
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
  margin-top: 40px;
  margin-bottom: 20px;
}

.price {
  font-weight: 700;
}

.form {
  width: 80%;
  gap: 10px;
}

.payment-details {
  border-bottom: 1px solid var(--primary);
  padding-bottom: 10px;
  margin-top: 50px;
  margin-bottom: 20px;
}

button {
  margin: 20px 0 50px 0;
  width: 80%;
}
</style>
