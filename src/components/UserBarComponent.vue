<template>
  <div>
    <div class="user-bar" v-if="!user">
      <a class="animated-link" @click="loginModalOpen = true"
        >Acceso clientes</a
      >
      <LoginModal
        :open="loginModalOpen"
        @loginModalClose="loginModalOpen = false"
      />
    </div>
    <div class="user-bar" v-if="user">
      <span>{{ user.email }}</span>
      <a class="animated-link" @click="authStore.logout">Cerrar sesión</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginModal from "@/components/modals/LoginModal.vue";
import { ref, watchEffect } from "vue";
import SignupModal from "@/components/modals/SignupModal.vue";
import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

const loginModalOpen = ref(false);
const signupModalOpen = ref(false);
</script>

<style scoped>
.user-bar {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}

.user-bar a {
  margin-left: 20px;
}
</style>
