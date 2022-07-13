<template>
  <div class="option">
    <div class="option-title">
      <input type="text" v-model="option.name" />
      <BackofficeButtons
        class="buttons"
        :editing="true"
        @accept="accept"
        @cancel="cancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Option } from "@/model/model";
import { ref, type Ref } from "vue";
import BackofficeButtons from "@/components/backoffice/BackofficeButtons.vue";

const emit = defineEmits<{
  (e: "accept", v: Option): void;
  (e: "cancel"): void;
}>();

const option: Ref<Option> = ref({
  name: "",
  id: "",
  values: [],
  filled: false,
});

const accept = () => emit("accept", option.value);
const cancel = () => emit("cancel");
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

.buttons {
  margin-left: auto;
}
</style>
