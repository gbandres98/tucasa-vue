<template>
  <div class="project">
    <h1>Tu Proyecto</h1>
    <ProjectComponent :project-id="projectId" v-if="projectId > 0" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onUnmounted, type Ref, ref } from "vue";
import { getUserProject } from "@/client/project";
import ProjectComponent from "@/components/project/ProjectComponent.vue";
import { onAuthStateChanged } from "firebase/auth";
import type { Unsubscribe } from "firebase/database";
import { auth } from "@/firebase/firebase";

const projectId = ref(-1);
const listener: Ref<Unsubscribe | undefined> = ref(undefined);

onBeforeMount(
  () =>
    (listener.value = onAuthStateChanged(auth, async (user) => {
      if (user) projectId.value = await getUserProject(user);
    }))
);

onUnmounted(() => {
  if (listener.value) listener.value();
});
</script>

<style scoped>
.project {
  max-width: 1700px;
  margin: 0 auto;
  padding: 50px 100px;
}

h1 {
  margin-bottom: 20px;
}
</style>
