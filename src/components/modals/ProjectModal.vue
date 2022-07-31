<template>
  <ModalComponent
    class="project-modal"
    :open="open"
    @modalClose="$emit('close')"
  >
    <ProjectComponent :project-id="projectId" />
  </ModalComponent>
</template>

<script setup lang="ts">
import ModalComponent from "@/components/modals/ModalComponent.vue";
import { toRefs } from "vue";
import ProjectComponent from "@/components/project/ProjectComponent.vue";

const props = defineProps<{
  open: boolean;
  projectId: number;
}>();

const { open } = toRefs(props);
defineEmits(["close"]);
</script>

<style scoped>
.project-modal ::v-deep(.modal) {
  max-width: 80%;
  height: 80%;
  overflow-y: scroll;
  background-color: whitesmoke;
}
</style>
