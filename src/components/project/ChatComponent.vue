<template>
  <div class="chat">
    <div class="chat-top"></div>
    <div class="chat-content">
      <div
        v-for="message in messages"
        :key="message.date.toMillis()"
        :class="{ message: true, user: !message.staff }"
      >
        <div class="message-date">
          {{ message.date.toRelative({ locale: "ES" }) }}
        </div>
        <div class="message-content">{{ message.text }}</div>
      </div>
    </div>
    <div class="chat-bottom"></div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from "@/model/model";
import type { Ref } from "vue";
import { ref } from "vue";
import { DateTime } from "luxon";

const messages: Ref<Array<Message>> = ref([
  {
    date: DateTime.now().minus({ day: 3 }),
    text: "El proyecto ha sido creado. Pronto se asignará un encargado para que lo revise y contactará contigo para definir los detalles del proyecto.",
    staff: true,
  },
  {
    date: DateTime.now().minus({ minute: 15, hour: 2 }),
    text: "El proyecto ha sido creado. Pronto se asignará un encargado para que lo revise y contactará contigo para definir los detalles del proyecto.",
    staff: false,
  },
]);
</script>

<style scoped>
.chat {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  flex: 1 0 auto;
  max-height: 700px;
  display: flex;
  flex-direction: column;
}

.chat-top {
  height: 50px;
  background-color: #ebebeb;
}

.chat-content {
  flex: 1 0 auto;
  padding: 20px;
  overflow-y: scroll;
}

.chat-bottom {
  height: 50px;
  background-color: #ebebeb;
}

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
}

.user .message-date {
  margin-left: auto;
  background-color: var(--primary-light-1);
}
</style>
