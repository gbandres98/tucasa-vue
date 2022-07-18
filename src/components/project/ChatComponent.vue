<template>
  <div class="chat">
    <div class="chat-content">
      <MessageComponent
        class="message"
        v-for="message in messages"
        :key="message.date.toMillis()"
        :message="message"
      />
    </div>
    <form class="chat-bottom" @submit.prevent="send">
      <input type="text" v-model="text" />
      <div class="send-button">
        <font-awesome-icon icon="paper-plane" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Message } from "@/model/model";
import type { Ref } from "vue";
import { onMounted, onUnmounted, ref } from "vue";
import { DateTime } from "luxon";
import { sendMessage } from "@/client/chat";
import { ref as dbRef, onValue, type Unsubscribe } from "firebase/database";
import { database } from "@/firebase/firebase";
import MessageComponent from "@/components/project/MessageComponent.vue";
import { useAuthStore } from "@/stores/auth.store";

const props = defineProps<{
  projectId: string;
}>();

const text = ref("");

const messages: Ref<Array<Message>> = ref([]);
const listener: Ref<Unsubscribe | undefined> = ref(undefined);

onMounted(() => {
  const chatRef = dbRef(database, `chats/${props.projectId}`);
  listener.value = onValue(
    chatRef,
    (snapshot) =>
      (messages.value = Object.values(snapshot.val()).map((msg) => {
        const message = msg as Message;
        return {
          text: message.text,
          staff: message.staff,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          date: DateTime.fromMillis(message.date.ts),
        };
      }))
  );
});

const send = () => {
  sendMessage(props.projectId, text.value, useAuthStore().role != undefined);
  text.value = "";
};

onUnmounted(() => {
  if (listener.value) listener.value();
});
</script>

<style scoped>
.chat {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 4px 17px -3px #e7e7e7;
}

.chat-top {
  flex: 0 0 50px;
  background-color: #ebebeb;
}

.chat-content {
  padding: 20px;
  flex: auto;
  overflow-y: scroll;
}

.chat-bottom {
  flex: 0 0 50px;
}

.chat-bottom {
  display: flex;
  padding: 10px 20px;
}

.chat-bottom input {
  height: 100%;
  border-radius: 5px 0 0 5px;
}

.send-button {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  border-radius: 0 5px 5px 0;
  background-color: #f5f5f5;
  border: 1px solid rgb(180, 180, 180);
  cursor: pointer;
}

.message {
  margin-top: 20px;
}
</style>
