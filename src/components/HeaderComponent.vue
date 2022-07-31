<template>
  <div class="header">
    <RouterLink class="title" to="/">
      <div>
        <img :src="logo" alt="tucasa logo" />
        TuCasa
      </div>
    </RouterLink>
    <div class="links">
      <RouterLink
        class="menu-link animated-link"
        to="/backoffice"
        v-if="!isUser"
        >Proyectos</RouterLink
      >
      <RouterLink
        class="menu-link animated-link"
        to="/backoffice/opciones"
        v-if="!isUser"
        >Opciones</RouterLink
      >
      <RouterLink
        class="menu-link animated-link"
        to="/backoffice/terrenos"
        v-if="!isUser"
        >Terrenos</RouterLink
      >
      <RouterLink
        class="menu-link animated-link"
        to="/backoffice/modelos"
        v-if="!isUser"
        >Modelos</RouterLink
      >
      <RouterLink
        class="menu-link animated-link"
        to="/backoffice/staff"
        v-if="isAdmin"
        >Staff</RouterLink
      >
    </div>
    <RouterLink to="/editor" custom v-slot="{ navigate }"
      ><button class="button-primary" @click="navigate" v-if="isAnon">
        Diseña tu casa
      </button></RouterLink
    >
    <UserBarComponent :class="{ 'user-bar': true, logged: user }" />
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/logo.svg";
import UserBarComponent from "@/components/UserBarComponent.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.store";
import { computed } from "vue";

const { role, user } = storeToRefs(useAuthStore());

const isAdmin = computed(() => role.value === "ADMIN");
const isUser = computed(() => !role.value || role.value === "USER");
const isAnon = computed(() => !user.value);
</script>

<style scoped>
button {
  margin-left: auto;
}

.menu-link {
  font-size: 1.4rem;
  font-weight: 600;
}

.menu-link:hover {
  font-weight: 800;
}

.header {
  box-sizing: border-box;
  height: 62px;
  padding: 10px 100px;
  display: flex;
  background-color: white;
  border-bottom: 2px solid #d2d2d2;
}

.header div {
  height: 100%;
}

.title {
  display: flex;
  align-items: baseline;
  font-weight: 600;
  font-size: 2rem;
  text-decoration: none;
  margin-bottom: 4px;
  margin-right: 40px;
}

.title img {
  height: 100%;
  margin-right: 5px;
}

.links {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 50px;
  margin-left: 10%;
}

.user-bar {
  margin-left: 50px;
  margin-right: 10px;
}

.user-bar.logged {
  margin-left: auto;
  margin-right: 10px;
}
</style>
