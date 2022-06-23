<template>
  <ModalComponent :open="open" @modalClose="$emit('loginModalClose')">
    <h1>Bienvenido</h1>
    <form class="form" @submit.prevent="submit">
      <input
        required
        type="email"
        name="email"
        id="email"
        placeholder="Correo electrónico"
        v-model="email"
      />
      <input
        required
        type="password"
        name="password"
        id="password"
        placeholder="Contraseña"
        v-model="password"
      />
      <FormError :msg="loginError" />
      <button class="button-primary">Continuar</button>
    </form>
  </ModalComponent>
</template>

<script setup lang="ts">
import ModalComponent from "@/components/modals/ModalComponent.vue";
import { ref, toRefs } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import FormError from "@/components/FormError.vue";
import { FirebaseError } from "firebase/app";

const props = defineProps<{
  open: boolean;
}>();

const { open } = toRefs(props);
const emit = defineEmits(["loginModalClose"]);

const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const loginError = ref("");

async function submit() {
  loginError.value = "";

  try {
    await authStore.login(email.value, password.value);

    emit("loginModalClose");
  } catch (e: unknown) {
    if (!(e instanceof FirebaseError)) {
      loginError.value = "Error de conexión";
      return;
    }
    switch (e.code) {
      case "auth/user-not-found":
        loginError.value = "No existe un usuario con el email indicado";
        return;
      case "auth/wrong-password":
        loginError.value = "Contraseña incorrecta";
        return;
      case "auth/too-many-requests":
        loginError.value =
          "Has alcanzado el límite de intentos, prueba más adelante";
        return;
      default:
        console.log(e.code);
        return;
    }
  }
}
</script>

<style scoped></style>
