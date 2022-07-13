<template>
  <div>
    <div class="card">
      <div class="card-id">
        <span class="details-link" @click="open = true">
          <img class="logo" :src="logo" alt="tucasa logo" />
          <span>{{ `#${project.id.toString().padStart(3, "0")}` }}</span>
        </span>
        <font-awesome-icon class="clock-icon" :icon="['far', 'clock']" />
        <span class="card-time">{{
          project.lastModified.toRelative({ locale: "ES" })
        }}</span>
      </div>
      <div class="card-name">
        {{ `${project.client.name} ${project.client.surname.charAt(0)}.` }}
      </div>
      <div class="card-bottom">
        <font-awesome-icon class="message-icon" :icon="['far', 'comment']" />
        <span>{{ messageNo }}</span>
        <ProfilePic
          class="profile-pic"
          :email="project.assigned ? project.assigned.email : ''"
        />
      </div>
    </div>
    <ProjectModal :open="open" :projectId="project.id" @close="open = false" />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  onMounted,
  onUnmounted,
  ref,
  type Ref,
} from "vue";
import type { Project } from "@/model/model";
import ProfilePic from "@/components/ProfilePic.vue";
import logo from "@/assets/logo.svg";
import { onValue, type Unsubscribe } from "firebase/database";
import { ref as dbRef } from "@firebase/database";
import { database } from "@/firebase/firebase";
import ProjectModal from "@/components/modals/ProjectModal.vue";

const props = defineProps<{
  project: Project;
}>();

const listener: Ref<Unsubscribe | undefined> = ref(undefined);
const messageNo = ref(0);
const open = ref(false);

onMounted(() => {
  const chatRef = dbRef(database, `chats/${props.project.id}`);
  listener.value = onValue(chatRef, (snapshot) => {
    if (!snapshot.val()) {
      messageNo.value = 0;
      return;
    }
    messageNo.value = Object.values(snapshot.val()).length;
  });
});

onUnmounted(() => {
  if (listener.value) listener.value();
});
</script>

<style scoped>
.card {
  cursor: grab;
  background-color: white;
  border-radius: 1px;
  padding: 10px;
}

.card.ghost {
  background-color: rgba(255, 255, 255, 0.6);
}

.logo {
  height: 20px;
}

.card-id {
  border-bottom: 2px solid var(--primary-light-1);
  display: flex;
  align-items: baseline;
  padding-bottom: 5px;
}

.clock-icon {
  margin-left: auto;
  color: var(--primary);
  margin-right: 10px;
}

.card-time {
  align-self: center;
}

.card-bottom {
  margin-top: -20px;
  display: flex;
  align-items: baseline;
}

.card-name {
  margin: 10px 0;
}

.message-icon {
  margin-right: 5px;
  font-size: 0.8rem;
}

.profile-pic {
  margin-left: auto;
}

.details-link {
  cursor: pointer;
}

.details-link:hover {
  font-weight: 800;
}
</style>
