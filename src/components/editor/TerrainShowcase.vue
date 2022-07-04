<template>
  <div class="terrain-showcase-wrapper">
    <v-select v-model="provinceFilter" :options="provinces" />
    <div class="terrain-showcase">
      <div
        :class="{ terrain, active: selected === terrain }"
        v-for="terrain in terrainsFiltered"
        :key="terrain.address"
        :style="`background-image: url(${terrain.imgUrl})`"
        @click="selected = terrain"
      >
        <div class="terrain-data">
          <span>{{ `${terrain.address}` }}</span>
          <span>{{
            `${terrain.postalCode} ${terrain.city && terrain.city.label}, ${
              terrain.city && terrain.province.label
            }`
          }}</span>
          <span>{{
            `${terrain.sizeX}x${terrain.sizeY} (${
              terrain.sizeX * terrain.sizeY
            } m2)`
          }}</span>
          <span>{{ `${terrain.price.toLocaleString("es")}€` }}</span>
        </div>
      </div>
    </div>
    <button :disabled="!selected" class="button-primary" @click="onContinue">
      Continuar
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { Province, Terrain } from "@/model/model";
import { computed, onMounted, ref } from "vue";
import { getTerrains } from "@/client/terrain";

const emit = defineEmits<{
  (e: "continue", selected: Terrain): void;
}>();

const terrains: Ref<Array<Terrain>> = ref([]);
const provinceFilter: Ref<Province> = ref({ code: "-1", label: "Filtro" });
const selected: Ref<Terrain | undefined> = ref(undefined);

const provinces = computed(() => [
  ...new Set(terrains.value.map((terrain) => terrain.province)),
]);
const terrainsFiltered = computed(() => {
  if (!provinceFilter.value || provinceFilter.value.code === "-1")
    return terrains.value;
  return terrains.value.filter(
    (terrain) =>
      provinceFilter.value &&
      terrain.province.code === provinceFilter.value.code
  );
});

onMounted(async () => {
  const t = await getTerrains();
  for (let i = 0; i < 6; i++) {
    const n = Object.assign({ address: i }, t[0]);
    terrains.value.push(n);
  }
});

const onContinue = () => {
  if (selected.value) emit("continue", selected.value);
};
</script>

<style scoped>
.terrain-showcase-wrapper {
  margin: 25px 0;
}

.terrain-showcase {
  display: flex;
  gap: 40px;
  overflow-x: scroll;
}

.terrain {
  margin-bottom: 10px;
  flex: 1 0 250px;
  height: 250px;
  width: 250px;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: end;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.2s;
  border: 0px solid var(--primary);
}

.terrain-data {
  background-color: rgba(248, 248, 248, 1);
  opacity: 0.95;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 20px;
  padding: 20px;
  transition: 0.2s;
}

.terrain:hover > .terrain-data {
  opacity: 0.2;
}

.v-select {
  width: 10rem;
  margin-bottom: 20px;
}

.terrain.active {
  border: 5px solid var(--primary);
}

button {
  margin-top: 20px;
}
</style>
