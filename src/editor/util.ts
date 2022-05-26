import { BaseTexture, Vector3 } from "@babylonjs/core";

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

  return lowerCornerCenter.subtract(new Vector3(1.25, 0, 1.25));
};

export const centerToUpperCorner = (
  center: Vector3,
  sizeI: number,
  sizeJ: number
) => {
  const upperCornerUpper = center.add(
    new Vector3((sizeI * 2.5) / 2, 0, (sizeJ * 2.5) / 2)
  );

  return upperCornerUpper.add(new Vector3(1.25, 0, 1.25));
};

export const lowerCornerToCenter = (
  corner: Vector3,
  sizeI: number,
  sizeJ: number
) => {
  const lowerCornerCorner = corner.add(
    new Vector3((sizeI * 2.5) / 2, 0, (sizeJ * 2.5) / 2)
  );

  return lowerCornerCorner.add(new Vector3(1.25, 0, 1.25));
};
