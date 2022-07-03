<template>
  <div class="wrapper">
    <div class="terrain-picker">
      <h1>Elige un terreno:</h1>
      <TerrainShowcase />
      <h1>¿Ya tienes un terreno?</h1>
      <span>Danos los detalles de tu terreno y contruiremos tu casa en él</span>
      <form class="form">
        <label class="size-label">Tamaño edificable:</label>
        <div class="size-group">
          <input
            required
            type="number"
            name="sizeX"
            id="sizeX"
            placeholder="largo (m)"
            v-model="sizeX"
          />
          X
          <input
            required
            type="number"
            name="sizeY"
            id="sizeY"
            placeholder="ancho (m)"
            v-model="sizeY"
          />
          <span>metros</span>
        </div>
        <label class="size-label">Ubicación:</label>
        <div class="input-group">
          <input
            required
            type="text"
            name="address"
            id="address"
            placeholder="Dirección"
            v-model="address"
          />
          <input
            required
            type="text"
            name="postalCode"
            id="postalCode"
            placeholder="Código Postal"
            v-model="postalCode"
            maxlength="6"
            style="flex-shrink: 3"
          />
        </div>
        <div class="input-group">
          <v-select v-model="province" :options="provinces" />
          <v-select v-model="city" :options="cities" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import type { Ref } from "vue";
import { getProvinceList, getCitiesForProvince } from "@/client/geo";
import type { City, Province } from "@/model/model";
import TerrainShowcase from "@/components/editor/TerrainShowcase.vue";

const sizeX: Ref<number | undefined> = ref(undefined);
const sizeY: Ref<number | undefined> = ref(undefined);
const address = ref("");
const postalCode = ref("");
const province = ref({ code: "-1", label: "Provincia" });
const city = ref({ code: "-1", label: "Municipio" });
const provinces: Ref<Array<Province>> = ref([]);
const cities: Ref<Array<City>> = ref([]);

onMounted(async () => {
  provinces.value = await getProvinceList();
});

watchEffect(async () => {
  if (!province.value) return;
  cities.value = await getCitiesForProvince(province.value);
});
</script>

<style scoped>
.wrapper {
  margin: 50px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.terrain-picker {
  width: 100%;
  max-width: 1600px;
}

.filler {
  height: 30vh;
}

.size-group {
  display: flex;
  align-items: end;
  width: 21rem;
  gap: 20px;
}

.form {
  margin-top: 30px;
  max-width: 768px;
}

label {
  font-weight: 600;
}

.size-label {
  margin-bottom: -10px;
}

.v-select {
  width: 200px;
}
</style>
