<template>
  <div class="projectView" v-if="project">
    <div class="col-1">
      <div class="editor">
        <EditorComponent :view="projectId.toString()" />
      </div>
    </div>
    <div class="col-2">
      <span v-if="project.assigned"
        >Encargado: <StaffComponent :staff="project.assigned"
      /></span>
      <ProjectState class="project-status" :status="project.status" />
      <ChatComponent class="chat" />
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
  flex: 0 1 60%;
}

.col-2 {
  flex: 0 1 40%;
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
