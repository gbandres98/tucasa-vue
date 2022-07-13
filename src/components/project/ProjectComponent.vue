<template>
  <div class="projectView" v-if="project">
    <div class="col-1">
      <span class="last-modified"
        >Último cambio
        {{ project.lastModified.toRelative({ locale: "ES" }) }}</span
      >
      <div class="editor">
        <EditorComponent :view="projectId.toString()" />
      </div>
      <ProjectConfig :options="project.options" />
      <PaymentConfig :project="project" />
      <ContactComponent :client="project.client" />
    </div>
    <div class="col-2">
      <span v-if="project.assigned"
        >Encargado: <StaffComponent :staff="project.assigned"
      /></span>
      <ProjectState class="project-status" :status="project.status" />
      <ChatComponent :project-id="projectId.toString()" class="chat" />
    </div>
  </div>
</template>

<script setup lang="ts">
import EditorComponent from "@/components/editor/EditorComponent.vue";
import StaffComponent from "@/components/StaffComponent.vue";
import type { Project } from "@/model/model";
import { onBeforeMount, ref, type Ref } from "vue";
import { getProject } from "@/client/project";
import ProjectState from "@/components/project/ProjectState.vue";
import ChatComponent from "@/components/project/ChatComponent.vue";
import ContactComponent from "@/components/project/ContactComponent.vue";
import ProjectConfig from "@/components/project/ProjectConfig.vue";
import PaymentConfig from "@/components/project/PaymentConfig.vue";

const props = defineProps<{
  projectId: number;
}>();

const project: Ref<Project | undefined> = ref(undefined);

onBeforeMount(
  async () => (project.value = await getProject(props.projectId.toString()))
);
</script>

<style scoped>
.projectView {
  display: flex;
  gap: 20px;
}
.col-1 {
  flex: 0 1 55%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.col-2 {
  height: 100%;
  flex: 0 1 45%;
}

.editor {
  height: 40vh;
  border-radius: 5px;
  border: 2px solid var(--primary);
}

.project-status {
  margin-top: 20px;
}

.chat {
  margin: 10px 0;
}
</style>
