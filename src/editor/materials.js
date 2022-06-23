import { Color3, StandardMaterial, Texture } from "@babylonjs/core";
import wallTexture from "@/assets/editor/wall.jpg";
import floorTexture from "@/assets/editor/floor.jpg";
export let wallMaterial;
export let wallGhostMaterial;
export let wallErrorMaterial;
export let cellMaterial;
export let cellHoverMaterial;
export let cellHighlightMaterial;
export let floorMaterial;
export const initializeMaterials = () => {
    wallMaterial = new StandardMaterial("wallMaterial");
    wallMaterial.diffuseTexture = new Texture(wallTexture);
    wallMaterial.diffuseTexture.uScale = 4;
    wallMaterial.diffuseTexture.vScale = 4;
    wallGhostMaterial = new StandardMaterial("wallMaterial");
    wallGhostMaterial.diffuseTexture = new Texture(wallTexture);
    wallGhostMaterial.diffuseTexture.uScale = 4;
    wallGhostMaterial.diffuseTexture.vScale = 4;
    wallGhostMaterial.alpha = 0.8;
    wallGhostMaterial.backFaceCulling = true;
    wallErrorMaterial = new StandardMaterial("wallMaterial");
    wallErrorMaterial.diffuseTexture = new Texture(wallTexture);
    wallErrorMaterial.diffuseTexture.uScale = 4;
    wallErrorMaterial.diffuseTexture.vScale = 4;
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
    floorMaterial.diffuseTexture.uScale = 1;
    floorMaterial.diffuseTexture.vScale = 1;
};
//# sourceMappingURL=materials.js.map