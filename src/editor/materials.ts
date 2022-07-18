import {
  Color3,
  PBRMaterial,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";
import wallTexture from "@/assets/editor/wall.jpg";
import type { ScaledTexture } from "@/editor/util";
import floorTexture from "@/assets/editor/floor.jpg";

export let wallMaterial: StandardMaterial;
export let wallGhostMaterial: StandardMaterial;
export let wallErrorMaterial: StandardMaterial;
export let cellMaterial: StandardMaterial;
export let cellHoverMaterial: StandardMaterial;
export let cellHighlightMaterial: StandardMaterial;
export let floorMaterial: StandardMaterial;
export let glassMaterial: PBRMaterial;

export const initializeMaterials = () => {
  wallMaterial = new StandardMaterial("wallMaterial");
  wallMaterial.diffuseTexture = new Texture(wallTexture);
  (wallMaterial.diffuseTexture as ScaledTexture).uScale = 4;
  (wallMaterial.diffuseTexture as ScaledTexture).vScale = 4;

  wallGhostMaterial = new StandardMaterial("wallMaterial");
  wallGhostMaterial.diffuseTexture = new Texture(wallTexture);
  (wallGhostMaterial.diffuseTexture as ScaledTexture).uScale = 4;
  (wallGhostMaterial.diffuseTexture as ScaledTexture).vScale = 4;
  wallGhostMaterial.alpha = 0.8;
  wallGhostMaterial.backFaceCulling = true;

  wallErrorMaterial = new StandardMaterial("wallMaterial");
  wallErrorMaterial.diffuseTexture = new Texture(wallTexture);
  (wallErrorMaterial.diffuseTexture as ScaledTexture).uScale = 4;
  (wallErrorMaterial.diffuseTexture as ScaledTexture).vScale = 4;
  wallErrorMaterial.alpha = 0.8;
  wallErrorMaterial.diffuseColor = Color3.Red();
  wallErrorMaterial.backFaceCulling = true;

  cellMaterial = new StandardMaterial("cellMaterial");
  cellMaterial.alpha = 0;

  cellHoverMaterial = new StandardMaterial("cellHoverMaterial");
  cellHoverMaterial.alpha = 0.4;

  cellHighlightMaterial = new StandardMaterial("cellHighlightMaterial");
  cellHighlightMaterial.alpha = 0.2;
  cellHighlightMaterial.diffuseColor = Color3.Green();

  floorMaterial = new StandardMaterial("floorMaterial");
  floorMaterial.diffuseTexture = new Texture(floorTexture);
  (floorMaterial.diffuseTexture as ScaledTexture).uScale = 1;
  (floorMaterial.diffuseTexture as ScaledTexture).vScale = 1;

  glassMaterial = new PBRMaterial("glassMtl");
  glassMaterial.metallic = 0;
  glassMaterial.transparencyMode = PBRMaterial.MATERIAL_ALPHABLEND;
  glassMaterial.alpha = 0.4;
  glassMaterial.roughness = 0.5;
  glassMaterial.subSurface.isRefractionEnabled = true;
};
