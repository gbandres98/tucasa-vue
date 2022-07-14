<template>
  <span :class="{ staff: true, clickable: isStaff }"
    ><ProfilePic :email="staff ? staff.email : undefined" />
    {{ staff ? staff.name : "Sin asignar" }}
    <font-awesome-icon icon="angle-down" v-if="isStaff" />
  </span>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import type { Staff } from "@/model/model";
import ProfilePic from "@/components/ProfilePic.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.store";

defineProps<{
  staff?: Staff;
}>();

const { role } = storeToRefs(useAuthStore());

const isStaff = computed(
  () => role.value === "STAFF" || role.value === "ADMIN"
);
</script>

<style scoped>
.staff {
  vertical-align: middle;
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 5px;
  border: 2px solid var(--primary);
}

.clickable {
  cursor: pointer;
}
</style>
