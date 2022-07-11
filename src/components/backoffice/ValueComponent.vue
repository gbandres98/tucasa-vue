<template>
  <div class="value">
    <span class="value-name" v-if="!editing">{{ valueCopy.name }}</span>
    <input
      class="value-name"
      type="text"
      v-model="valueCopy.name"
      v-if="editing"
    />
    <span class="value-description" v-if="!editing">{{
      valueCopy.description
    }}</span>
    <textarea
      class="value-description edit"
      v-model="valueCopy.description"
      v-if="editing"
    />
    <span class="value-price" v-if="!editing"
      >{{
        valueCopy.price.toLocaleString("es-ES", {
          style: "decimal",
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })
      }}€</span
    >
    <input
      class="value-price"
      type="number"
      v-model="valueCopy.price"
      v-if="editing"
    />
    <BackofficeButtons
      class="buttons"
      :editing="editing"
      @edit="editing = true"
      @accept="accept"
      @cancel="cancel"
    />
  </div>
</template>

<script setup lang="ts">
import type { Value } from "@/model/model";
import { onMounted, ref } from "vue";
import BackofficeButtons from "@/components/backoffice/BackofficeButtons.vue";

const props = defineProps<{
  value?: Value;
}>();

const emit = defineEmits<{
  (e: "change", v: Value): void;
}>();

const valueCopy = ref(Object.assign({}, props.value));
const editing = ref(false);

if (!valueCopy.value)
  valueCopy.value = {
    name: "",
    description: "",
    price: 0,
    selected: false,
  };

const accept = () => {
  emit("change", valueCopy.value);
  editing.value = false;
};

const cancel = () => {
  valueCopy.value = Object.assign({}, props.value);
  editing.value = false;
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
