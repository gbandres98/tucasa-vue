<template>
  <div class="option">
    <h1>{{ config.name }}</h1>
    <div class="values">
      <div
        class="value-wrapper"
        v-for="value in config.values"
        :key="value.name"
      >
        <span class="value">
          <input
            type="radio"
            :id="value.name"
            :value="value.name"
            @change="selectValue"
            :checked="selected === value.name"
          />
          <label :for="value.name">{{ value.name }}</label>
          <span class="price"
            >{{
              value.price.toLocaleString("es-ES", {
                style: "decimal",
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            }}€</span
          >
        </span>
        <div
          :class="{ 'value-description': true, show: selected === value.name }"
        >
          {{ value.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Option } from "@/model/model";
import { ref, type Ref } from "vue";

const props = defineProps<{
  config: Option;
}>();

const emit = defineEmits(["change"]);

const selected: Ref<undefined | string> = ref(undefined);

const selectValue = (e: any) => {
  selected.value = e.currentTarget?.value;
  const value = props.config.values.find(
    (value) => value.name === selected.value
  );
  emit("change", props.config, value);
};
</script>

<style scoped>
.option {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.values {
  margin-top: 50px;
  display: flex;
  width: 100%;
  padding: 0 50px;
  flex-direction: column;
}

.value {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
}

.value * {
  cursor: pointer;
}

.value-wrapper:hover .value-description {
  max-height: 600px;
  transition: 1.5s;
}

.value input {
  width: 20px;
}

.price {
  margin-left: auto;
}

.value-description {
  max-height: 0;
  overflow: hidden;
  margin: 0 auto;
  width: 70%;
  font-size: 0.8rem;
  transition: 0.1s;
}

.value-description.show {
  max-height: 600px;
}
</style>
