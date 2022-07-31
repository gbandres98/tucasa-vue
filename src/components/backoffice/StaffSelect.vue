<template>
  <div class="staff-select" v-show="open">
    <div
      class="staff"
      v-for="staff in staffs"
      :key="staff.email"
      @click="emit('select', staff)"
    >
      <ProfilePic :email="staff.email" />
      <span>{{ staff.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { Staff } from "@/model/model";
import { onMounted, ref } from "vue";
import { getStaff } from "@/client/staff";
import ProfilePic from "@/components/ProfilePic.vue";

defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "select", v: Staff): void;
}>();

const staffs: Ref<Array<Staff>> = ref([]);

onMounted(async () => (staffs.value = await getStaff()));
</script>

<style scoped>
.staff-select {
  position: absolute;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  border: 2px solid var(--primary);
}

.staff {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.staff:hover {
  box-shadow: inset 0 0 2px 0 rgba(158, 158, 158, 1);
}
</style>
