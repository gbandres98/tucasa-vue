<template>
  <div class="option">
    <div class="option-title" @click="open = !open">
      <font-awesome-icon
        :class="{ 'list-icon': true, open: open }"
        icon="angle-up"
      />
      <span class="option-name" v-if="!editing">{{ option.name }}</span>
      <input type="text" v-if="editing" v-model="optionCopy.name" />
      <span class="option-value-no">{{
        `(${optionCopy.values.length} opciones)`
      }}</span>
      <BackofficeButtons
        :editing="editing"
        @edit="editing = true"
        @accept="accept"
        @cancel="cancel"
      />
    </div>
    <div class="option-values">
      <div class="value" v-for="value in optionCopy.values" :key="value.name">
        <span class="value-name">{{ value.name }}</span>
        <span class="value-description">{{ value.description }}</span>
        <span>{{ value.price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Option } from "@/model/model";
import { ref } from "vue";
import BackofficeButtons from "@/components/backoffice/BackofficeButtons.vue";

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
</script>

<style scoped>
input {
  width: 50%;
}

.option {
  width: 600px;
}

.option-title {
  display: flex;
  gap: 20px;
  font-size: 1.25rem;
  align-items: center;
  cursor: pointer;
}

.list-icon {
  transform: rotate(90deg);
  transition: 0.5s;
}

.list-icon.open {
  transform: rotate(0deg);
}

.value {
  display: flex;
  justify-content: space-between;
}

.value-name {
  flex: 0 0 100px;
}

.value-description {
  flex: 0 0 300px;
}
</style>
