<template>
  <div class="columns-wrapper">
    <div class="column" v-for="column in columns" :key="column.status">
      <h3>{{ column.name }}</h3>
      <Draggable
        class="card-list"
        v-model="column.homes"
        group="cards"
        itemKey="id"
        ghost-class="ghost"
      >
        <template #item="{ element }">
          <div class="card">
            <div class="card-title">{{ `Casa ${element.id}` }}</div>
            <div class="card-modified">
              {{ element.lastModified.toRelative({ locale: "ES" }) }}
            </div>
          </div>
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Home, HomeStatus } from "@/client/home";
import { getHomes } from "@/client/home";
import Draggable from "vuedraggable";

type Column = {
  status: HomeStatus;
  name: string;
  homes: Array<Home>;
};

const columns = ref([
  {
    status: "NEW",
    name: "Nuevo",
    homes: [],
  },
  {
    status: "ASSIGNED",
    name: "Asignado",
    homes: [],
  },
  {
    status: "IN_PROGRESS",
    name: "En progreso",
    homes: [],
  },
  {
    status: "WAITING",
    name: "Necesita atención",
    homes: [],
  },
] as Column[]);

onMounted(async () => {
  const homes = await getHomes();

  homes.forEach((home) => {
    switch (home.status) {
      case "NEW":
        columns.value[0].homes.push(home);
        return;
      case "ASSIGNED":
        columns.value[1].homes.push(home);
        return;
      case "IN_PROGRESS":
        columns.value[2].homes.push(home);
        return;
      case "WAITING":
        columns.value[3].homes.push(home);
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

.card {
  cursor: grab;
  background-color: white;
  border-radius: 1px;
  padding: 10px;
}

.card.ghost {
  background-color: rgba(255, 255, 255, 0.6);
}

.card-title {
  border-bottom: 1px solid #ebebeb;
}
</style>
