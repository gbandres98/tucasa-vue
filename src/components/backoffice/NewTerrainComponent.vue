<template>
  <div class="bo-element">
    <div :class="{ 'bo-element-title': true, open: true }">
      <BackofficeButtons
        class="buttons"
        :editing="true"
        @edit="true"
        @accept="accept"
        @cancel="emit('cancel')"
      />
    </div>
    <div :class="{ 'terrain-details': true, open: true }">
      <div class="data-view">
        <div class="col-1">
          <TerrainForm v-model="terrainCopy" @confirm="accept" />
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
  (e: "create", v: Terrain): void;
  (e: "cancel"): void;
}>();
const terrainCopy = ref(Object.assign({}, props.terrain));

const accept = () => {
  emit("create", terrainCopy.value);
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

.col-1 {
  flex: 0 0 70%;
}
</style>
