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
      >
        <template #item="{ element }">
          <ProjectCard :project="element" />
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { HomeStatus, Project } from "@/model/model";
import Draggable from "vuedraggable";
import { getProjects } from "@/client/project";
import ProjectCard from "@/components/backoffice/ProjectCard.vue";

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

onMounted(async () => {
  const projects = await getProjects();

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
});
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
