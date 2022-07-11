<template>
  <div class="config-wrapper">
    <div class="editor-wrapper">
      <EditorComponent view="local" />
    </div>
    <ConfigViewer
      class="config-viewer"
      v-if="!onPaymentView"
      @finish="onPaymentView = true"
    />
    <PaymentView class="config-viewer" v-if="onPaymentView" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import type { Option } from "@/model/model";
import { getOptions } from "@/client/option";
import EditorComponent from "@/components/editor/EditorComponent.vue";
import ConfigViewer from "@/components/editor/ConfigViewer.vue";
import PaymentView from "@/components/editor/PaymentView.vue";

const options: Ref<Array<Option>> = ref([]);
const onPaymentView = ref(false);

onMounted(async () => {
  options.value = await getOptions();
});
</script>

<style scoped>
.config-wrapper {
  display: flex;
  flex-direction: row;
}

.config-viewer {
  height: calc(100vh - 117px);
  overflow-y: scroll;
}
</style>
