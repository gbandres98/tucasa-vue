import { Area } from "@/editor/grid";
import { startIndoorEditor } from "@/editor/indoorEditor";
export const getDesign = (id) => {
    const designJson = localStorage.getItem("design");
    if (!designJson)
        return;
    const design = JSON.parse(designJson);
    processDesign(design);
    return design;
};
export const processDesign = (design) => {
    design.containers.forEach((container) => (container.area = new Area(container.area.start, container.area.end)));
};
//# sourceMappingURL=design.js.map