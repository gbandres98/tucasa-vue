import type { Design } from "@/model/model";
import { Area } from "@/editor/grid";
import { startIndoorEditor } from "@/editor/indoorEditor";

export const getDesign = (id: string): Design | undefined => {
  const designJson = localStorage.getItem("design");

  if (!designJson) return;

  const design = JSON.parse(designJson) as Design;
  processDesign(design);

  return design;
};

export const processDesign = (design: Design) => {
  design.containers.forEach(
    (container) =>
      (container.area = new Area(container.area.start, container.area.end))
  );
};
