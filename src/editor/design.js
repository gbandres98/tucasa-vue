import { Area } from "@/editor/grid";
import { getProject } from "@/client/project";
export const getDesign = async (id) => {
    let design;
    if (id === "local") {
        const designJson = localStorage.getItem("design");
        if (!designJson)
            return;
        design = JSON.parse(designJson);
    }
    else {
        const project = await getProject(id.toString());
        design = project.design;
    }
    processDesign(design);
    return design;
};
export const processDesign = (design) => {
    design.containers.forEach((container) => (container.area = new Area(container.area.start, container.area.end)));
};
//# sourceMappingURL=design.js.map