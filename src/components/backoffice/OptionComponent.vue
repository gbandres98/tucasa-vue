<template>
  <div :class="{ option: true }">
    <div :class="{ 'option-title': true, open: open }">
      <font-awesome-icon
        :class="{ 'list-icon': true, open: open }"
        icon="angle-up"
      />
      <span class="option-name" v-if="!editing" @click="open = !open">{{
        option.name
      }}</span>
      <input type="text" v-if="editing" v-model="optionCopy.name" />
      <span class="option-value-no">{{
        `(${optionCopy.values.length} opciones)`
      }}</span>
      <BackofficeButtons
        class="buttons"
        :editing="editing"
        @edit="editing = true"
        @accept="accept"
        @cancel="cancel"
      />
    </div>
    <div :class="{ 'option-values': true, open: open }">
      <ValueComponent
        class="option-value"
        v-for="(value, i) in optionCopy.values"
        :key="value.name"
        :value="value"
        @change="onValueChange($event, i)"
      />
      <!--      <font-awesome-icon class="plus-icon" icon="plus" />-->
      <button class="button-small">Añadir</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Option, Value } from "@/model/model";
import { ref } from "vue";
import BackofficeButtons from "@/components/backoffice/BackofficeButtons.vue";
import ValueComponent from "@/components/backoffice/ValueComponent.vue";

const props = defineProps<{
  option: Option;
}>();
const emit = defineEmits<{
  (e: "change", v: Option): void;
}>();

const optionCopy = ref(Object.assign({}, props.option));
const open = ref(false);
const editing = ref(false);

const accept = () => {
  emit("change", optionCopy.value);
  editing.value = false;
};

const cancel = () => {
  optionCopy.value = Object.assign({}, props.option);
  editing.value = false;
};

const onValueChange = (value: Value, index: number) => {
  optionCopy.value.values[index] = value;
  emit("change", optionCopy.value);
};
</script>

<style scoped>
input {
  width: 50%;
}

.option {
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1.5px solid var(--primary);
}

.option-title:hover {
  background-color: var(--primary-light-1);
}

.option-title.open {
  background-color: var(--primary-light-1);
}

.option-title {
  display: flex;
  gap: 20px;
  font-size: 1.25rem;
  align-items: center;
  transition: 0.5s;
  background-color: white;
  border-radius: 2px;
  padding: 5px 10px;
}

.list-icon {
  transform: rotate(90deg);
  transition: 0.5s;
}

.list-icon.open {
  transform: rotate(0deg);
}

.option-values {
  max-height: 0;
  overflow-y: hidden;
  transition: 0.5s;
}

.option-values.open {
  max-height: 100vh;
}

.buttons {
  margin-left: auto;
}

.option-value-no {
  font-size: 0.9rem;
  color: #999999;
}

.option-value:last-of-type {
  border-bottom: none;
}

.option-value {
  border-bottom: 1px solid var(--primary-light-1);
}

.option-name {
  cursor: pointer;
}

.plus-icon {
  display: block;
  margin: 0 auto;
}

.button-small {
  margin-left: 10px;
}
</style>
