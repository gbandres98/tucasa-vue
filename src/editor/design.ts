import type { Design } from "@/model/model";
import { Area } from "@/editor/grid";
import { getProject } from "@/client/project";

export const getDesign = async (id: string) => {
  let design: Design;

  if (id === "local") {
    const designJson = localStorage.getItem("design");

    if (!designJson) return;

    design = JSON.parse(designJson) as Design;
  } else {
    const project = await getProject(id.toString());
    design = project.design;
  }

  processDesign(design);

  return design;
};

export const processDesign = (design: Design) => {
  design.containers.forEach(
    (container) =>
      (container.area = new Area(container.area.start, container.area.end))
  );
};
