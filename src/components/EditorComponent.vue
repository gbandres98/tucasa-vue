<template>
  <canvas ref="editorCanvas" class="canvas" />
</template>

<script>
import { Options, Vue } from "vue-class-component";
import { createScene } from "@/editor/editor";

@Options()
export default class EditorComponent extends Vue {
  mounted() {
    const editorCanvas = this.$refs.editorCanvas;
    createScene(editorCanvas);
  }
}
</script>

<style lang="scss" scoped>
.canvas {
  width: 100%;
  height: 100%;
}
</style>
