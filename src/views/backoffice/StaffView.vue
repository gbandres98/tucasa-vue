<template>
  <div class="backoffice-panel-wrapper">
    <h1>Administrar staff</h1>
    <div class="bo-list">
      <StaffComponent
        v-for="staff in staffs"
        :key="staff.address"
        :staff="staff"
        @change="onChange($event, i)"
        @delete="onDelete"
      />
      <button class="button-small" @click="creating = true" v-if="!creating">
        Añadir
      </button>
      <NewStaffComponent
        :staff="newStaff"
        v-if="creating"
        @cancel="creating = false"
        @confirm="onCreate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { Staff } from "@/model/model";
import { onMounted, ref } from "vue";
import { deleteStaff, getStaff, saveStaff, createStaff } from "@/client/staff";
import StaffComponent from "@/components/backoffice/StaffComponent.vue";
import NewStaffComponent from "@/components/backoffice/NewStaffComponent.vue";

const staffs: Ref<Array<Staff>> = ref([]);
const creating = ref(false);
const newStaff: Ref<Staff> = ref({
  email: "",
  name: "",
  admin: false,
});

const updateStaffs = async () => (staffs.value = await getStaff());

onMounted(updateStaffs);

const onChange = async (staff: Staff, index: number) => {
  staffs.value[index] = staff;
  await saveStaff(staff);
  updateStaffs();
};

const onDelete = async (email: string) => {
  staffs.value = staffs.value.filter((staff) => staff.email !== email);
  await deleteStaff(email);
  updateStaffs();
};

const onCreate = async (staff: Staff) => {
  creating.value = false;
  await createStaff(staff);
  updateStaffs();
};
</script>

<style scoped></style>
