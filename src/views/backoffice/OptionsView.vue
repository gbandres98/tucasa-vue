<template>
  <div class="backoffice-panel-wrapper">
    <h1>Configurar opciones:</h1>
    <div class="options-wrapper">
      <OptionComponent
        v-for="(option, i) in options"
        :key="option.id"
        :option="option"
        @change="onChange($event, i)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { Option } from "@/model/model";
import { onMounted, ref } from "vue";
import { getOptions, saveOption } from "@/client/option";
import OptionComponent from "@/components/backoffice/OptionComponent.vue";

const options: Ref<Array<Option>> = ref([]);

const updateOptions = async () => (options.value = await getOptions());

onMounted(updateOptions);

const onChange = async (option: Option, index: number) => {
  options.value[index] = option;
  await saveOption(option);
  updateOptions();
};
</script>

<style scoped>
.options-wrapper {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}

.option-info {
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  font-size: 1.25rem;
}

.value-number {
  margin-left: auto;
}
</style>
