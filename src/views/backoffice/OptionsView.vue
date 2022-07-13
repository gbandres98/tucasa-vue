<template>
  <div class="backoffice-panel-wrapper">
    <h1>Configurar opciones</h1>
    <div class="bo-list">
      <OptionComponent
        v-for="(option, i) in options"
        :key="option.id"
        :option="option"
        @change="onChange($event, i)"
        @delete="onDelete"
      />
      <button class="button-small" v-if="!creating" @click="creating = true">
        Añadir
      </button>
      <NewOptionComponent
        v-model="newOption"
        v-if="creating"
        @accept="createOption"
        @cancel="creating = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { Option } from "@/model/model";
import { onMounted, ref } from "vue";
import { deleteOption, getOptions, saveOption } from "@/client/option";
import OptionComponent from "@/components/backoffice/OptionComponent.vue";
import NewOptionComponent from "@/components/backoffice/NewOptionComponent.vue";

const options: Ref<Array<Option>> = ref([]);
const creating = ref(false);
const newOption: Ref<Option> = ref({
  name: "",
  id: "",
  values: [],
  filled: false,
});

const updateOptions = async () => (options.value = await getOptions());

onMounted(updateOptions);

const onChange = async (option: Option, index: number) => {
  options.value[index] = option;
  await saveOption(option);
  updateOptions();
};

const createOption = async (option: Option) => {
  creating.value = false;
  await saveOption(option);
  updateOptions();
};

const onDelete = async (id: string) => {
  options.value = options.value.filter((option) => option.id !== id);
  await deleteOption(id);
  updateOptions();
};
</script>

<style scoped></style>
