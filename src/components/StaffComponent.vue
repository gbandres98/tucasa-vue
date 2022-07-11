<template>
  <span class="staff"
    ><ProfilePic :email="staff.email" /> {{ staff.name }}</span
  >
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { Staff } from "@/model/model";
import ProfilePic from "@/components/ProfilePic.vue";

defineProps<{
  staff: Staff;
}>();
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
</style>
