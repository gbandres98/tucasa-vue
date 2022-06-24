<template>
  <div class="header">
    <RouterLink class="title" to="/">
      <div>
        <img :src="logo" alt="tucasa logo" />
        TuCasa
      </div>
    </RouterLink>
    <div class="links">
      <RouterLink class="animated-link" to="/casas">Sobre nosotros</RouterLink>
      <RouterLink class="animated-link" to="/editor">Casos de éxito</RouterLink>
    </div>
    <UserBarComponent class="user-bar" />
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/logo.svg";
import UserBarComponent from "@/components/UserBarComponent.vue";
</script>

<style scoped>
.header {
  box-sizing: border-box;
  height: 60px;
  padding: 10px 20px;
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
}

.header div {
  height: 100%;
}

.title {
  display: flex;
  align-items: baseline;
  font-weight: 600;
  font-size: 1.7rem;
  text-decoration: none;
  margin-bottom: 4px;
}

.title img {
  height: 100%;
  margin-right: 5px;
}

.links {
  display: flex;
  align-items: end;
  justify-content: space-between;
  width: 15rem;
  margin-left: 40px;
}

.user-bar {
  margin-left: auto;
  margin-right: 10px;
}
</style>
