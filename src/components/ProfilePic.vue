<template>
  <img :src="url" alt="avatar" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getAvatarUrl } from "@/client/avatar";

const props = defineProps<{
  email?: string;
}>();

const url = computed(() => getAvatarUrl(props.email ? props.email : ""));
</script>

<style scoped>
img {
  border-radius: 50%;
  width: 40px;
}
</style>
