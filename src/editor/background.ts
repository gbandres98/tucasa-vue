import {
  Color3,
  CubeTexture,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";

import grassTexture from "@/assets/editor/grass.jpg";
import terrainHeightmap from "@/assets/editor/heightmap.webp";
import type { ScaledTexture } from "@/editor/util";

const scale = 20;

export const createBackground = (scene: Scene) => {
  createGround();
  createSky(scene);
};

const createGround = () => {
  const grassMaterial = new StandardMaterial("grassMaterial");
  grassMaterial.diffuseTexture = new Texture(grassTexture);

  (grassMaterial.diffuseTexture as ScaledTexture).uScale = scale;
  (grassMaterial.diffuseTexture as ScaledTexture).vScale = scale;

  grassMaterial.specularColor = new Color3(0.1, 0.07, 0);

  const grass = MeshBuilder.CreateGroundFromHeightMap(
    "grass",
    terrainHeightmap,
    {
      height: 400,
      width: 400,
      subdivisions: 100,
      minHeight: 0,
      maxHeight: 10,
    }
  );

  grass.material = grassMaterial;
};

const createSky = (scene: Scene) => {
  scene.environmentTexture = CubeTexture.CreateFromPrefilteredData(
    "https://playground.babylonjs.com/textures/country.env",
    scene
  );

  scene.createDefaultSkybox(scene.environmentTexture, false, 1000);
};
