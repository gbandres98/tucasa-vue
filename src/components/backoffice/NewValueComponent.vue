<template>
  <div class="value">
    <input class="value-name" type="text" v-model="valueCopy.name" />
    <textarea class="value-description edit" v-model="valueCopy.description" />
    <input class="value-price" type="number" v-model="valueCopy.price" />
    <BackofficeButtons
      class="buttons"
      :editing="true"
      @accept="accept"
      @cancel="cancel"
    />
  </div>
</template>

<script setup lang="ts">
import type { Value } from "@/model/model";
import { ref } from "vue";
import BackofficeButtons from "@/components/backoffice/BackofficeButtons.vue";

const props = defineProps<{
  value: Value;
}>();

const emit = defineEmits<{
  (e: "create", v: Value): void;
  (e: "cancel"): void;
}>();

const valueCopy = ref(Object.assign({}, props.value));

const accept = () => {
  emit("create", valueCopy.value);
};

const cancel = () => {
  emit("cancel");
};
</script>

<style scoped>
.value {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 0 10px 15px 10px;
}

.value-name {
  flex: 0 0 20%;
  font-weight: 600;
}

.value-description {
  flex: 0 0 50%;
}

.value-description.edit {
  height: 150px;
  font-family: inherit;
}

.value-price {
  flex: 0 0 10%;
  font-weight: 600;
}

input {
  margin: 0 10px;
}
</style>
