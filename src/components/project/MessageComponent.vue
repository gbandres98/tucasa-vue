<template>
  <div :class="{ message: true, user: !message.staff }">
    <div class="message-date">
      {{ timeText }}
    </div>
    <div class="message-content">{{ message.text }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, type Ref, ref } from "vue";
import type { Message } from "@/model/model";

const props = defineProps<{
  message: Message;
}>();

const timeText: Ref<string | null> = ref("Recién enviado");
const interval = ref(-1);

const setTimeText = () =>
  (timeText.value = props.message.date.toRelative({ locale: "ES" }));

onMounted(() => {
  setTimeText();
  interval.value = window.setInterval(setTimeText, 5000);
});

onUnmounted(() => window.clearInterval(interval.value));
</script>

<style scoped>
.message-content {
  background-color: var(--primary-light-1);
  padding: 5px 10px 10px 10px;
  border-radius: 0 20px 20px 20px;
  width: fit-content;
  max-width: 60%;
}

.message-date {
  width: fit-content;
  font-size: 0.9rem;
}

.user .message-content {
  margin-left: auto;
  border-radius: 20px 0 20px 20px;
  background-color: var(--secondary-light-1);
}

.user .message-date {
  margin-left: auto;
}
</style>
