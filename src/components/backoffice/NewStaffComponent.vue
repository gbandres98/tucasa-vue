<template>
  <div class="bo-element">
    <div class="bo-element-title">
      <input class="staff-input" type="email" v-model="staffCopy.email" />

      <input class="staff-input" type="text" v-model="staffCopy.name" />

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
        :editing="true"
        @accept="accept"
        @cancel="onCancel"
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
  (e: "confirm", v: Staff): void;
  (e: "cancel"): void;
}>();

const staffCopy = ref(Object.assign({}, props.staff));

const changeRole = () => {
  staffCopy.value.admin = !staffCopy.value.admin;
};

const onCancel = () => {
  emit("cancel");
};

const accept = () => {
  emit("confirm", staffCopy.value);
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
