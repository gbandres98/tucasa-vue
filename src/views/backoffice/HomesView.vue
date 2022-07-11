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
            <div class="card-id">
              <img class="logo" :src="logo" alt="tucasa logo" />
              <span>{{ `#${element.id.toString().padStart(3, "0")}` }}</span>
              <font-awesome-icon class="clock-icon" :icon="['far', 'clock']" />
              <span class="card-time">{{
                element.lastModified.toRelative({ locale: "ES" })
              }}</span>
            </div>
            <div class="card-name">
              {{
                `${element.client.name} ${element.client.surname.charAt(0)}.`
              }}
            </div>
            <div class="card-bottom">
              <font-awesome-icon
                class="message-icon"
                :icon="['far', 'comment']"
              />
              <span>3</span>
              <ProfilePic
                class="profile-pic"
                :email="element.assigned ? element.assigned.email : ''"
              />
            </div>
          </div>
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { HomeStatus, Project } from "@/model/model";
import Draggable from "vuedraggable";
import logo from "@/assets/logo.svg";
import ProfilePic from "@/components/ProfilePic.vue";

type Column = {
  status: HomeStatus;
  name: string;
  homes: Array<Project>;
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

// onMounted(async () => {
//   const homes = await getHomes();
//
//   homes.forEach((home) => {
//     switch (home.status) {
//       case "NEW":
//         columns.value[0].homes.push(home);
//         return;
//       case "ASSIGNED":
//         columns.value[1].homes.push(home);
//         return;
//       case "IN_PROGRESS":
//         columns.value[2].homes.push(home);
//         return;
//       case "WAITING":
//         columns.value[3].homes.push(home);
//         return;
//       default:
//         return;
//     }
//   });
// });
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
</style>
