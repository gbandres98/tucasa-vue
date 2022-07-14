<template>
  <div class="bo-element">
    <div class="bo-element-title">
      <span class="bo-element-name">{{ staffCopy.email }}</span>

      <span class="bo-element-name" v-if="!editing">{{ staffCopy.name }}</span>
      <input
        class="staff-input"
        type="text"
        v-model="staffCopy.name"
        v-if="editing"
      />

      <button
        :class="{
          'button-small': true,
          'button-admin': staffCopy.admin,
          'button-staff': !staffCopy.admin,
        }"
        @click="changeRole"
      >
        {{ staffCopy.admin ? "Admin" : "Staff" }}
      </button>
      <BackofficeButtons
        class="buttons"
        :editing="editing"
        @edit="editing = true"
        @accept="accept"
        @cancel="onCancel"
        @delete="emit('delete', staff.email)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { Staff } from "@/model/model";
import BackofficeButtons from "@/components/backoffice/BackofficeButtons.vue";

const props = defineProps<{
  staff: Staff;
}>();

const emit = defineEmits<{
  (e: "change", v: Staff): void;
  (e: "delete", v: string): void;
}>();

const staffCopy = ref(Object.assign({}, props.staff));
const editing = ref(false);

const changeRole = () => {
  if (editing.value) staffCopy.value.admin = !staffCopy.value.admin;
};

const onCancel = () => {
  staffCopy.value = Object.assign({}, props.staff);
  editing.value = false;
};

const accept = () => {
  emit("change", staffCopy.value);
  editing.value = false;
};
</script>

<style scoped>
.bo-element-title {
  justify-content: space-between;
}

.staff-input {
  width: 20rem;
}

.button-staff {
  border-color: var(--secondary);
}

.button-staff:hover {
  background-color: var(--secondary-light-1);
}

.button-admin {
  border-color: var(--accent);
}

.button-admin:hover {
  background-color: var(--accent-light-1) !important;
}
</style>
