<template>
  <div class="faq-wrapper">
    <div class="faq-title" @click="open = !open">
      {{ faq.title }} <span :class="{ openButton: true, open: open }">+</span>
    </div>
    <div :class="{ 'faq-description': true, open: open }">
      {{ faq.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Faq } from "@/model/model";
import { ref } from "vue";

defineProps<{
  faq: Faq;
}>();

const open = ref(false);
</script>

<style scoped>
.faq-wrapper {
  width: 1000px;
  border-radius: 2px;
  box-shadow: 0 0 5px 0 #d2d2d2;
  padding: 20px;
  margin-bottom: 20px;
}

.faq-title {
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.faq-description {
  max-height: 0;
  overflow-y: hidden;
  transition: 0.4s;
}

.faq-description.open {
  padding-top: 40px;
  max-height: 400px;
}

.openButton.open {
  transform: rotate(180deg);
}

.openButton {
  margin-left: auto;
  font-size: 1.8rem;
  transition: 0.4s;
}
</style>
