<template>
  <div class="columns-wrapper">
    <div class="column" v-for="column in columns" :key="column.status">
      <h3>{{ column.name }}</h3>
      <Draggable
        class="card-list"
        v-model="column.projects"
        group="cards"
        itemKey="id"
        ghost-class="ghost"
        @change="onMove($event, column.status)"
      >
        <template #item="{ element }">
          <ProjectCard :project="element" />
        </template>
      </Draggable>
    </div>
  </div>
  <StaffModal
    :open="staffModalOpen"
    @staffModalClose="onStaffModalClose"
    @select="onStaffUpdate"
  />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, type Ref, ref } from "vue";
import type { HomeStatus, Project, Staff } from "@/model/model";
import Draggable from "vuedraggable";
import {
  getProjects,
  updateProjectAssigned,
  updateProjectModified,
  updateProjectStatus,
} from "@/client/project";
import ProjectCard from "@/components/backoffice/ProjectCard.vue";
import StaffModal from "@/components/modals/StaffModal.vue";

type Column = {
  status: HomeStatus;
  name: string;
  projects: Array<Project>;
};

const columns = ref([
  {
    status: "NEW",
    name: "Nuevo",
    projects: [],
  },
  {
    status: "ASSIGNED",
    name: "Asignado",
    projects: [],
  },
  {
    status: "IN_PROGRESS",
    name: "En progreso",
    projects: [],
  },
  {
    status: "WAITING",
    name: "Necesita atención",
    projects: [],
  },
] as Column[]);
const timer: Ref = ref(undefined);
const staffModalOpen = ref(false);
const lastMoved: Ref<undefined | Project> = ref(undefined);

const loadProjects = async () => {
  const projects = await getProjects();

  columns.value[0].projects = [];
  columns.value[1].projects = [];
  columns.value[2].projects = [];
  columns.value[3].projects = [];

  projects.forEach((project) => {
    switch (project.status) {
      case "NEW":
        columns.value[0].projects.push(project);
        return;
      case "ASSIGNED":
        columns.value[1].projects.push(project);
        return;
      case "IN_PROGRESS":
        columns.value[2].projects.push(project);
        return;
      case "WAITING":
        columns.value[3].projects.push(project);
        return;
      default:
        return;
    }
  });
};

onMounted(loadProjects);

onMounted(() => (timer.value = setInterval(loadProjects, 10000)));

onUnmounted(() => clearInterval(timer.value));

const onMove = (e: any, status: HomeStatus) => {
  if (!e.added) return;

  const project = e.added.element as Project;

  lastMoved.value = project;

  if (status === "ASSIGNED" && !project.assigned) {
    staffModalOpen.value = true;
    return;
  }

  project.status = status;
  updateProjectStatus(project.id.toString(), status);
  updateProjectModified(project.id.toString());
};

const onStaffUpdate = (staff: Staff) => {
  if (!lastMoved.value) return;

  staffModalOpen.value = false;

  const project = lastMoved.value;

  project.assigned = staff;
  updateProjectAssigned(project.id.toString(), staff);
  updateProjectStatus(project.id.toString(), "ASSIGNED");
  updateProjectModified(project.id.toString());
};

const onStaffModalClose = () => {
  staffModalOpen.value = false;
  loadProjects();
};
</script>

<style scoped>
.columns-wrapper {
  margin: 60px 40px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.column {
  padding: 10px 5px;
  width: 100%;
  background-color: #f1f3f5;
  border-radius: 2px;
}

.column h3 {
  margin-bottom: 20px;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}
</style>
