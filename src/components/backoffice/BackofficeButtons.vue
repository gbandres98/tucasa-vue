<template>
  <span class="buttons">
    <font-awesome-icon
      class="icon-edit"
      icon="pen-to-square"
      v-if="!editing"
      @click="emit('edit')"
    />
    <font-awesome-icon
      class="icon-delete"
      icon="trash-can"
      v-if="!editing"
      @click="emit('delete')"
    />
    <font-awesome-icon
      class="icon-accept"
      icon="check"
      v-if="editing"
      @click="emit('accept')"
    />
    <font-awesome-icon
      class="icon-cancel"
      icon="x"
      v-if="editing"
      @click="emit('cancel')"
    />
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  editing: boolean;
}>();

const emit = defineEmits<{
  (e: "edit"): void;
  (e: "delete"): void;
  (e: "accept"): void;
  (e: "cancel"): void;
}>();
</script>

<style scoped>
svg {
  cursor: pointer;
}
</style>
