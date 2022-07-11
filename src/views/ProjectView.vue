<template>
  <div class="project">
    <h1>Tu Proyecto</h1>
    <ProjectComponent :project-id="projectId" v-if="projectId > 0" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.store";
import { getUserProject } from "@/client/project";
import ProjectComponent from "@/components/project/ProjectComponent.vue";

const projectId = ref(-1);
const { user } = storeToRefs(useAuthStore());

watch(
  user,
  async (newUser) => (projectId.value = await getUserProject(newUser))
);
</script>

<style scoped>
.project {
  max-width: 1400px;
  margin: 0 auto;
  padding: 50px 100px;
}

h1 {
  margin-bottom: 20px;
}
</style>
