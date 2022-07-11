<template>
  <div class="wrapper">
    <div class="terrain-picker">
      <h1>Elige un lugar:</h1>
      <TerrainShowcase @continue="onContinue" />
      <h1>¿Ya tienes una parcela?</h1>
      <span>Danos los detalles de tu terreno y contruiremos tu casa en él</span>
      <form class="form" @submit.prevent="onFormSubmit">
        <label class="size-label">Tamaño edificable:</label>
        <FormError :msg="sizeError" />
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
        <FormError :msg="addressError" />
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
        <button :disabled="!buttonEnabled" class="button-primary">
          Usar mi propio terreno
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import type { Ref } from "vue";
import { getProvinceList, getCitiesForProvince } from "@/client/geo";
import type { City, Province, Terrain } from "@/model/model";
import TerrainShowcase from "@/components/editor/TerrainShowcase.vue";
import FormError from "@/components/FormError.vue";
import { useEditorStore } from "@/stores/editor.store";

const sizeX: Ref<number | undefined> = ref(undefined);
const sizeY: Ref<number | undefined> = ref(undefined);
const address = ref("");
const postalCode = ref("");
const province = ref({ code: "-1", label: "Provincia" });
const city = ref({ code: "-1", label: "Municipio" });
const provinces: Ref<Array<Province>> = ref([]);
const cities: Ref<Array<City>> = ref([]);
const sizeError: Ref<string> = ref("");
const addressError: Ref<string> = ref("");

onMounted(async () => {
  provinces.value = await getProvinceList();
});

watchEffect(async () => {
  if (!province.value) return;
  cities.value = await getCitiesForProvince(province.value);
});

const buttonEnabled = computed(() => {
  return (
    sizeX.value &&
    sizeY.value &&
    address.value &&
    postalCode.value &&
    province.value.code !== "-1" &&
    city.value.code !== "-1"
  );
});

const clearErrors = () => {
  sizeError.value = "";
  addressError.value = "";
};

const onFormSubmit = () => {
  clearErrors();

  if (!sizeX.value || sizeX.value < 5 || !sizeY.value || sizeY.value < 5) {
    sizeError.value = "El tamaño mínimo del terreno es de 15x15m";
    return;
  }

  if (!postalCode.value.startsWith(province.value.code)) {
    addressError.value = "El código postal no es correcto para esa provincia";
    return;
  }

  const terrain: Terrain = {
    address: address.value,
    postalCode: postalCode.value,
    province: province.value,
    city: city.value,
    sizeX: sizeX.value,
    sizeY: sizeY.value,
    price: 0,
    custom: true,
    imgUrl:
      "https://media.istockphoto.com/vectors/straight-empty-road-through-the-countryside-green-hills-blue-sky-and-vector-id1161948652?k=20&m=1161948652&s=612x612&w=0&h=aYwLStFq8jKf0yKZWUaBY7kYMhOFiGiMNpUDh5brIqk=",
  };

  onContinue(terrain);
};

const editorStore = useEditorStore();

const onContinue = (terrain: Terrain) => {
  editorStore.selectTerrain(terrain);
};
</script>

<style scoped>
.wrapper {
  margin: 25px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.terrain-picker {
  width: 100%;
  max-width: 1600px;
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

.button-primary {
  margin-left: 0;
  margin-right: auto;
}
</style>
