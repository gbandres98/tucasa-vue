<template>
  <span class="error" v-if="msg">{{ msg }}</span>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{
  msg: string;
}>();

const { msg } = toRefs(props);
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.9rem;
  margin-bottom: -15px;
}
</style>
