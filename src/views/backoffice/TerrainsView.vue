<template>
  <div class="backoffice-panel-wrapper">
    <h1>Terrenos</h1>
    <div class="bo-list">
      <TerrainComponent
        v-for="terrain in terrains"
        :key="terrain.address"
        :terrain="terrain"
        @change="onChange($event, i)"
        @delete="onDelete"
      />
      <button class="button-small" @click="creating = true" v-if="!creating">
        Añadir
      </button>
      <NewTerrainComponent
        :terrain="newTerrain"
        v-if="creating"
        @cancel="creating = false"
        @create="createTerrain"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { Terrain } from "@/model/model";
import { onMounted, ref } from "vue";
import { deleteTerrain, getTerrains, saveTerrain } from "@/client/terrain";
import TerrainComponent from "@/components/backoffice/TerrainComponent.vue";
import { deleteOption } from "@/client/option";
import NewTerrainComponent from "@/components/backoffice/NewTerrainComponent.vue";

const terrains: Ref<Array<Terrain>> = ref([]);
const creating = ref(false);
const newTerrain: Ref<Terrain> = ref({
  id: "",
  address: "",
  city: {
    code: "-1",
    label: "Ciudad",
  },
  province: {
    code: "-1",
    label: "Provincia",
  },
  custom: false,
  imgUrl: "",
  postalCode: "",
  price: 0,
  sizeX: 0,
  sizeY: 0,
});

const updateTerrains = async () => (terrains.value = await getTerrains());

onMounted(updateTerrains);

const onChange = async (terrain: Terrain, index: number) => {
  terrains.value[index] = terrain;
  await saveTerrain(terrain);
  updateTerrains();
};

const onDelete = async (id: string) => {
  terrains.value = terrains.value.filter((terrain) => terrain.id !== id);
  await deleteTerrain(id);
  updateTerrains();
};

const createTerrain = async (terrain: Terrain) => {
  creating.value = false;
  await saveTerrain(terrain);
  updateTerrains();
};
</script>

<style scoped></style>
