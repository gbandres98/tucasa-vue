<template>
  <div class="terrain-data">
    <div>{{ terrain.address }}</div>
    <div>
      {{
        `${terrain.postalCode} - ${terrain.city.label}, ${terrain.province.label}`
      }}
    </div>
    <div>
      {{ `Precio: ${terrain.price.toLocaleString("ES")}€` }}
    </div>
    <div>
      {{
        `Tamaño: ${terrain.sizeX}x${terrain.sizeY}m (${
          terrain.sizeX * terrain.sizeY
        } m2)`
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Terrain } from "@/model/model";

defineProps<{
  terrain: Terrain;
}>();
</script>

<style scoped>
.terrain-data div {
  margin-bottom: 5px;
}
</style>
