<template>
  <div>
    <EditorComponent></EditorComponent>
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import EditorComponent from "@/components/EditorComponent.vue";

@Options({
  components: {
    EditorComponent,
  },
})
export default class EditorView extends Vue {}
</script>

<style lang="scss" scoped></style>
