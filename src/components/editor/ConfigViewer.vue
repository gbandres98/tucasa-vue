<template>
  <div class="config-viewer">
    <ConfigElement
      v-for="option in options"
      :key="option.name"
      :config="option"
      @change="onSelected"
    />
    <button
      class="button-primary"
      :disabled="!buttonActive"
      @click="onContinue"
    >
      Continuar al pago
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { Option, Value } from "@/model/model";
import { computed, defineEmits, onMounted, provide, ref } from "vue";
import { getOptions } from "@/client/option";
import ConfigElement from "@/components/editor/ConfigElement.vue";
import { useEditorStore } from "@/stores/editor.store";

const options: Ref<Array<Option>> = ref([]);

const emit = defineEmits<{
  (e: "finish"): void;
}>();

onMounted(async () => (options.value = await getOptions()));

const onSelected = (option: Option, value: Value) => {
  const o = options.value.find((o) => o.name === option.name);

  if (!o) return;

  o.filled = true;
  o.values.forEach((v) => (v.selected = v.name === value.name));

  useEditorStore().options = options.value;
};

const buttonActive = computed(
  () => !options.value.some((option) => !option.filled)
);

const onContinue = () => {
  if (!buttonActive.value) return;

  useEditorStore().options = options.value;
  emit("finish");
};
</script>

<style scoped>
.config-viewer {
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 0;
  gap: 30px;
  overflow-y: scroll;
  align-items: center;
}

.config-viewer button {
  margin-top: 50px;
}
</style>
