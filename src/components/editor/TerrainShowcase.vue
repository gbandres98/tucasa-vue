<template>asdasd</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { Terrain } from "@/model/model";
import { onMounted, ref } from "vue";
import { getTerrains } from "@/client/terrain";

const terrains: Ref<Array<Terrain>> = ref([]);

onMounted(async () => {
  terrains.value = await getTerrains();
});
</script>

<style scoped></style>
