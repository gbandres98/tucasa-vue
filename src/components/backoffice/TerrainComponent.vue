<template>
  <div class="bo-element">
    <div :class="{ 'bo-element-title': true, open: open }">
      <font-awesome-icon
        :class="{ 'bo-element-icon': true, open: open }"
        icon="angle-up"
        @click="open = !open"
      />
      <span class="bo-element-name" @click="open = !open">{{
        terrainCopy.address
      }}</span>
      <BackofficeButtons
        class="buttons"
        :editing="editing"
        @edit="
          editing = true;
          open = true;
        "
        @accept="accept"
        @cancel="onCancel"
        @delete="emit('delete', terrain.id)"
      />
    </div>
    <div :class="{ 'terrain-details': true, open: open }">
      <div class="data-view">
        <div class="col-1">
          <TerrainData :terrain="terrainCopy" v-if="!editing" />
          <TerrainForm v-model="terrainCopy" v-if="editing" @confirm="accept" />
        </div>
        <div class="data-img-wrapper">
          <img
            class="data-img"
            :src="terrainCopy.imgUrl"
            alt="Comprueba el enlace de la imagen"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { Terrain } from "@/model/model";
import BackofficeButtons from "@/components/backoffice/BackofficeButtons.vue";
import TerrainData from "@/components/backoffice/TerrainData.vue";
import TerrainForm from "@/components/backoffice/TerrainForm.vue";

const props = defineProps<{
  terrain: Terrain;
}>();

const emit = defineEmits<{
  (e: "change", v: Terrain): void;
  (e: "delete", v: Terrain): void;
}>();

const open = ref(false);
const terrainCopy = ref(Object.assign({}, props.terrain));
const editing = ref(false);

const onCancel = () => {
  terrainCopy.value = Object.assign({}, props.terrain);
  editing.value = false;
};

const accept = () => {
  emit("change", terrainCopy.value);
  editing.value = false;
};
</script>

<style scoped>
.terrain-details {
  max-height: 0;
  overflow-y: hidden;
  transition: 0.5s;
}

.terrain-details.open {
  max-height: 100vh;
}

.buttons {
  margin-left: auto;
}

.data-view {
  display: flex;
  margin-top: 10px;
}

.data-img {
  max-width: 100%;
  display: block;
  margin-left: auto;
}

.col-1 {
  flex: 0 0 70%;
}
</style>
