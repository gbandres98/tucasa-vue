<template>
  <ModalComponent :open="open" @modalClose="$emit('signupModalClose')">
    <h1>Crea tu cuenta</h1>
    <form class="form" @submit.prevent="submit">
      <FormError :msg="emailError" />
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
        type="tel"
        name="phone"
        id="phone"
        placeholder="Teléfono"
        v-model="phone"
      />
      <FormError :msg="passwordError" />
      <div class="input-group">
        <input
          required
          type="password"
          name="password1"
          id="password1"
          placeholder="Contraseña"
          v-model="password1"
        />
        <input
          required
          type="password"
          name="password2"
          id="password2"
          placeholder="Confirmación"
          v-model="password2"
        />
      </div>
      <FormError :msg="signUpError" />
      <button class="button-primary">Continuar</button>
    </form>
  </ModalComponent>
</template>

<script setup lang="ts">
import ModalComponent from "@/components/modals/ModalComponent.vue";
import { onMounted, ref, toRefs } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import { FirebaseError } from "firebase/app";
import FormError from "@/components/FormError.vue";

const props = defineProps<{
  open: boolean;
}>();

const { open } = toRefs(props);
const emit = defineEmits(["signupModalClose"]);

const authStore = useAuthStore();

const email = ref("");
const phone = ref("");
const password1 = ref("");
const password2 = ref("");
const emailError = ref("");
const passwordError = ref("");
const signUpError = ref("");

onMounted(clearErrors);

async function submit() {
  clearErrors();

  if (password1.value != password2.value) {
    passwordError.value = "Las contraseñas no coinciden";
    return;
  }

  try {
    await authStore.register(email.value, password1.value, phone.value);

    emit("signupModalClose");
  } catch (e: unknown) {
    if (!(e instanceof FirebaseError)) {
      signUpError.value = "Error de conexión";
      return;
    }
    switch (e.code) {
      case "auth/weak-password":
        passwordError.value = "La contraseña es demasiado débil";
        return;
      case "auth/invalid-email":
        emailError.value = "El correo electrónico no es válido";
        return;
      case "auth/email-already-in-use":
        emailError.value = "El correo electrónico ya está en uso";
        return;
      default:
        console.log(e.code);
        return;
    }
  }
}

function clearErrors() {
  passwordError.value = "";
  signUpError.value = "";
  emailError.value = "";
}
</script>

<style scoped></style>
