<template>
  <div class="projectView" v-if="project">
    <div class="col-1">
      <span class="last-modified"
        >Último cambio
        {{ project.lastModified.toRelative({ locale: "ES" }) }}</span
      >
      <div class="versions" v-if="!isStaff">
        <v-select
          v-model="version"
          :options="versions"
          :clearable="false"
          :filterable="false"
        />
      </div>
      <div class="editor">
        <EditorComponent :view="projectId.toString()" />
      </div>
      <ProjectConfig :options="project.options" />
      <PaymentConfig :project="project" />
      <ContactComponent :client="project.client" />
    </div>
    <div class="col-2">
      <span
        >Encargado:
        <StaffComponent
          :staff="project.assigned"
          @click="assignedSelectOpen = true"
      /></span>
      <StaffSelect @select="updateAssigned" :open="assignedSelectOpen" />
      <ProjectState class="project-status" :status="project.status" />
      <ChatComponent :project-id="projectId.toString()" class="chat" />
      <div class="client-buttons" v-if="!isStaff && project.status === 'NEW'">
        <div class="input-group">
          <button class="button-primary confirm">Confirmar proyecto</button>
          <button class="button-primary edit">Editar diseño</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditorComponent from "@/components/editor/EditorComponent.vue";
import StaffComponent from "@/components/StaffComponent.vue";
import type { Project, Staff } from "@/model/model";
import { computed, onBeforeMount, ref, type Ref } from "vue";
import {
  getProject,
  updateProjectAssigned,
  updateProjectStatus,
} from "@/client/project";
import ProjectState from "@/components/project/ProjectState.vue";
import ChatComponent from "@/components/project/ChatComponent.vue";
import ContactComponent from "@/components/project/ContactComponent.vue";
import ProjectConfig from "@/components/project/ProjectConfig.vue";
import PaymentConfig from "@/components/project/PaymentConfig.vue";
import StaffSelect from "@/components/backoffice/StaffSelect.vue";
import { useAuthStore } from "@/stores/auth.store";

const props = defineProps<{
  projectId: number;
}>();

const project: Ref<Project | undefined> = ref(undefined);
const assignedSelectOpen = ref(false);
const version = ref("Versión 4: 27 de Junio de 2022 - 13:05");

const versions = ref([
  "Versión 1: 27 de Junio de 2022 - 11:44",
  "Versión 2: 26 de Junio de 2022 - 20:37",
  "Versión 3: 26 de Junio de 2022 - 19:21",
  "Versión 4: 27 de Junio de 2022 - 13:05",
]);

const isStaff = computed(() => useAuthStore().role != undefined);

onBeforeMount(
  async () => (project.value = await getProject(props.projectId.toString()))
);

const updateAssigned = (staff: Staff) => {
  assignedSelectOpen.value = false;
  if (!project.value) return;

  project.value.assigned = staff;
  updateProjectAssigned(project.value.id.toString(), staff);

  if (project.value.status === "NEW") {
    project.value.status = "ASSIGNED";
    updateProjectStatus(project.value.id.toString(), "ASSIGNED");
  }
};
</script>

<style scoped>
.projectView {
  display: flex;
  gap: 20px;
}
.col-1 {
  flex: 0 1 60%;
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

.col-2 {
  position: relative;
}

.staff-select {
  left: 70px;
  top: 50px;
}

.client-buttons {
  margin-top: 30px;
}

.button-primary.edit {
  background-color: var(--accent-1);
}
</style>
