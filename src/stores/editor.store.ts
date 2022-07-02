import { defineStore } from "pinia";
import type { Container } from "@/editor/container";

export type EditorState = {
  step: number;
  activeFloor: number;
  isAddContainerActive: boolean;
  isRemoveContainerActive: boolean;
  isAddWallActive: boolean;
  isRemoveWallActive: boolean;
  containers: Array<Container>;
};

export const useEditorStore = defineStore({
  id: "editor",
  state: (): EditorState => ({
    step: 1,
    activeFloor: 0,
    isAddContainerActive: false,
    isRemoveContainerActive: false,
    isAddWallActive: false,
    isRemoveWallActive: false,
    containers: [],
  }),
});
