<template>
  <Transition>
    <div class="modal-wrapper" v-if="open">
      <div class="modal">
        <div class="modal-close-button" @click="$emit('modalClose')">
          <font-awesome-icon icon="x" />
        </div>
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{
  open: boolean;
}>();

const { open } = toRefs(props);
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.modal-wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0, 0.4);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 999;
}

.modal {
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgb(255, 255, 255, 0.9);
  background-clip: padding-box;
  border-radius: 16px;
}

.modal-content {
  position: relative;
  padding: 1rem;
}

.modal-close-button {
  position: absolute;
  top: 10px;
  right: 14px;
  color: #999;
  cursor: pointer;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 16px;
  z-index: 999;
}

.modal-close-button:hover {
  background-color: #ebebeb;
}

.modal-content h1 {
  margin-bottom: 30px;
}
</style>
