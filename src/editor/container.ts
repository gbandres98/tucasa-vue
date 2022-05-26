import {
  ActionManager,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";
import wallTexture from "@/assets/wall.jpg";
import { ScaledTexture } from "@/editor/util";

export class Container extends Mesh {
  sizeI: number;
  sizeJ: number;

  wallMaterial: StandardMaterial;
  wallGhostMaterial: StandardMaterial;
}

let wallMaterial: StandardMaterial;
let wallGhostMaterial: StandardMaterial;

const initializeMaterials = () => {
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
};

export const createContainer = (sizeI: number, sizeJ: number) => {
  if (!wallMaterial || !wallGhostMaterial) initializeMaterials();

  const container = MeshBuilder.CreateBox("container", {
    width: 2.5,
    depth: 2.5,
    height: 4,
    updatable: true,
  }) as Container;
  container.material = wallMaterial;

  container.wallMaterial = wallMaterial;
  container.wallGhostMaterial = wallGhostMaterial;

  container.position.y = 2;
  resizeContainer(container, sizeI, sizeJ);

  container.isPickable = true;
  container.enablePointerMoveEvents = true;

  container.actionManager = new ActionManager();
  container.actionManager.hoverCursor = "grab";

  return container;
};

export const resizeContainer = (container: Container, i: number, j: number) => {
  container.sizeI = i;
  container.sizeJ = j;
  container.scaling.x = container.sizeI;
  container.scaling.z = container.sizeJ;
};
