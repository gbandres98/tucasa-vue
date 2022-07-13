<template>
  <div class="bo-element">
    <div :class="{ 'bo-element-title': true, open: open }">
      <font-awesome-icon
        :class="{ 'bo-element-icon': true, open: open }"
        icon="angle-up"
        @click="open = !open"
      />
      <span class="bo-element-name" v-if="!editing" @click="open = !open">{{
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
        @delete="emit('delete', option.id)"
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
  (e: "delete", id: string): void;
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

.plus-icon {
  display: block;
  margin: 0 auto;
}

.button-small {
  margin-left: 10px;
}
</style>
