<template>
  <div class="bo-element">
    <div class="bo-element-title">
      <font-awesome-icon
        :class="{ 'bo-element-icon': true, open: open }"
        icon="angle-up"
        @click="open = !open"
      />
      <span class="bo-element-name" v-if="!editing" @click="open = !open">{{
        modelCopy.name
      }}</span>
      <BackofficeButtons
        class="buttons"
        :editing="editing"
        @edit="editing = true"
        @accept="accept"
        @cancel="cancel"
      />
    </div>
    <div :class="{ details: true, open: open }">
      <div class="col-1">
        <div>{{ `Precio: ${modelCopy.price.toLocaleString("es")}€` }}</div>
        <div>{{ `Modelo: ${modelCopy.file}` }}</div>
        <div>{{ `Tamaño: ${modelCopy.size}` }}</div>
      </div>
      <div class="col-2">
        <ModelViewer :model="modelCopy" v-if="open" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Model } from "@/editor/furniture";
import { ref } from "vue";
import BackofficeButtons from "@/components/backoffice/BackofficeButtons.vue";
import ModelViewer from "@/components/backoffice/ModelViewer.vue";

const props = defineProps<{
  model: Model;
}>();
const emit = defineEmits<{
  (e: "change", v: Model): void;
  (e: "delete", id: string): void;
}>();

const modelCopy = ref(Object.assign({}, props.model));
const open = ref(false);
const editing = ref(false);

const accept = () => {
  emit("change", modelCopy.value);
  editing.value = false;
};

const cancel = () => {
  modelCopy.value = Object.assign({}, props.model);
  editing.value = false;
};
</script>

<style scoped>
.details {
  max-height: 0;
  overflow-y: hidden;
  display: flex;
}

.details.open {
  max-height: 100vh;
}

.col-1 {
  flex: 0 0 60%;
  padding-top: 30px;
}

.col-1 div {
  margin-bottom: 20px;
}

.buttons {
  margin-left: auto;
}
</style>
