import { BaseTexture, Vector3 } from "@babylonjs/core";
import { Area, GridCoords, worldToGrid } from "@/editor/grid";
import type { Container } from "@/editor/container";

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

export const isPointInArea = (point: GridCoords, area: Area) => {
  if (point.i < area.firstI() || point.i > area.lastI()) return false;
  if (point.j < area.firstJ() || point.j > area.lastJ()) return false;

  return true;
};

export const getContainerArea = (container: Container): Area =>
  new Area(
    worldToGrid(
      centerToLowerCorner(container.position, container.sizeI, container.sizeJ)
    ),
    worldToGrid(
      centerToUpperCorner(container.position, container.sizeI, container.sizeJ)
    )
  );
