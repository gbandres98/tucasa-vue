import { BaseTexture, Color3, MeshBuilder, StandardMaterial, Texture, } from "@babylonjs/core";
import grassTexture from "@/assets/grass.jpg";
import terrainHeightmap from "@/assets/heightmap.webp";
const scale = 20;
class ScaledTexture extends BaseTexture {
    uScale;
    vScale;
}
export const createBackground = () => {
    createGround();
};
const createGround = () => {
    const grassMaterial = new StandardMaterial("grassMaterial");
    grassMaterial.diffuseTexture = new Texture(grassTexture);
    grassMaterial.diffuseTexture.uScale = scale;
    grassMaterial.diffuseTexture.vScale = scale;
    grassMaterial.specularColor = new Color3(0.1, 0.07, 0);
    const grass = MeshBuilder.CreateGroundFromHeightMap("grass", terrainHeightmap, {
        height: 400,
        width: 400,
        subdivisions: 100,
        minHeight: 0,
        maxHeight: 10,
    });
    grass.material = grassMaterial;
};
//# sourceMappingURL=background.js.map