import { BaseTexture, Vector3 } from "@babylonjs/core";
import { Area, GridCoords, worldToGrid } from "@/editor/grid";
import type { Container } from "@/editor/container";
import type { ContainerData, Design, Terrain } from "@/model/model";
import { useEditorStore } from "@/stores/editor.store";
import { getContainerData } from "@/editor/editor";
import { containerData, IndoorContainerData } from "@/editor/indoorEditor";

export class ScaledTexture extends BaseTexture {
  uScale: number;
  vScale: number;
}

export const centerToLowerCorner = (
  center: Vector3,
  sizeI: number,
  sizeJ: number
) => {
  const lowerCornerCenter = center.subtract(
    new Vector3((sizeI * 2.5) / 2, 0, (sizeJ * 2.5) / 2)
  );

  return lowerCornerCenter.add(new Vector3(1.25, 0, 1.25));
};

export const centerToUpperCorner = (
  center: Vector3,
  sizeI: number,
  sizeJ: number
) => {
  const upperCornerUpper = center.add(
    new Vector3((sizeI * 2.5) / 2, 0, (sizeJ * 2.5) / 2)
  );

  return upperCornerUpper.subtract(new Vector3(1.25, 0, 1.25));
};

export const lowerCornerToCenter = (
  corner: Vector3,
  sizeI: number,
  sizeJ: number
) => {
  const center = corner.add(
    new Vector3((sizeI * 2.5) / 2, 0, (sizeJ * 2.5) / 2)
  );

  return center.subtract(new Vector3(1.25, 0, 1.25));
};

export const areasOverlap = (area1: Area, area2: Area): boolean => {
  if (area1.start.i > area2.end.i || area2.start.i > area1.end.i) return false;

  if (area1.start.j > area2.end.j || area2.start.j > area1.end.j) return false;

  return true;
};

export const getContainerArea = (container: Container): Area => {
  return new Area(
    worldToGrid(
      centerToLowerCorner(
        container.mesh.position,
        container.sizeI,
        container.sizeJ
      )
    ),
    worldToGrid(
      centerToUpperCorner(
        container.mesh.position,
        container.sizeI,
        container.sizeJ
      )
    )
  );
};

export const isPointInArea = (point: GridCoords, area: Area) => {
  if (point.i < area.firstI() || point.i > area.lastI()) return false;
  if (point.j < area.firstJ() || point.j > area.lastJ()) return false;

  return true;
};

export const getPrice = (
  containers: Array<ContainerData>,
  terrain: Terrain
): number => {
  let price = 0;

  price += 15000;

  containers.forEach((container) => {
    price += getContainerPrice(container);
  });

  if (terrain) price += terrain.price;

  return price;
};

export const getContainerPrice = (container: ContainerData) => {
  const area = container.sizeI * 2.5 * container.sizeJ * 2.5;

  return area * 242;
};

export const getIndoorContainerPrice = (container: IndoorContainerData) => {
  const area = container.area.sizeI() * 2.5 * container.area.sizeJ() * 2.5;

  return area * 242;
};

export const localSaveDesign = () => {
  const design = generateDesign();

  localStorage.setItem("design", JSON.stringify(design));
};

export const generateDesign = (): Design => ({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  terrain: useEditorStore().terrain!,
  containers: containerData,
  walls: useEditorStore().walls,
  furniture: useEditorStore().modelData,
  options: useEditorStore().options,
});
