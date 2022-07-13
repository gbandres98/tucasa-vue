<script setup lang="ts">
import "vue-select/dist/vue-select.css";
import { RouterView } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>

<template>
  <HeaderComponent />
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
@import "@/assets/color.css";
@import "@/assets/backoffice.css";
</style>
