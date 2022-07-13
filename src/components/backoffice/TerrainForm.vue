<template>
  <form @submit.prevent="emit('confirm')">
    <label class="bo-label">Dirección</label>
    <input type="text" v-model="terrainCopy.address" @input="update" />
    <label class="bo-label">Código postal</label>
    <div class="input-group">
      <input
        class="postalCode"
        type="number"
        v-model="terrainCopy.postalCode"
        @input="update"
      />
      <v-select
        v-model="terrainCopy.province"
        :options="provinces"
        @input="update"
      />
      <v-select v-model="terrainCopy.city" :options="cities" @input="update" />
    </div>
    <label class="bo-label">Tamaño</label>
    <div class="input-group size">
      <input
        class="size-input"
        type="number"
        v-model="terrainCopy.sizeX"
        @input="update"
      />
      X
      <input
        class="size-input"
        type="number"
        v-model="terrainCopy.sizeY"
        @input="update"
      />
      <span>m ({{ terrainCopy.sizeX * terrainCopy.sizeY }} m2)</span>
    </div>
    <label class="bo-label">Precio</label>
    <div class="input-group size">
      <input
        type="number"
        class="price"
        v-model="terrainCopy.price"
        @input="update"
      />
      €
    </div>
    <label class="bo-label">Enlace a la imagen</label>
    <input type="text" v-model="terrainCopy.imgUrl" @input="update" />
  </form>
</template>

<script setup lang="ts">
import type { Terrain } from "@/model/model";
import { onMounted, type Ref, ref, watchEffect } from "vue";
import type { City, Province } from "@/model/model";
import { getCitiesForProvince, getProvinceList } from "@/client/geo";

const props = defineProps<{
  modelValue: Terrain;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: Terrain): void;
  (e: "confirm"): void;
}>();

const terrainCopy = ref(Object.assign({}, props.modelValue));
const provinces: Ref<Array<Province>> = ref([]);
const cities: Ref<Array<City>> = ref([]);

const update = () => emit("update:modelValue", terrainCopy.value);

onMounted(async () => {
  provinces.value = await getProvinceList();
});

watchEffect(async () => {
  if (!terrainCopy.value.province) return;
  cities.value = await getCitiesForProvince(terrainCopy.value.province);
});
</script>

<style scoped>
form {
  flex: 1 0 auto;
  margin-right: 50px;
}

.postalCode {
  width: 5rem;
}

.v-select {
  width: 200px;
}

input {
  margin-bottom: 10px;
}

.size {
  align-items: baseline;
}

.size-input {
  width: 4rem;
}

.price {
  width: 6rem;
}
</style>
