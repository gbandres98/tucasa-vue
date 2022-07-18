import { Color3, CubeTexture, MeshBuilder, Scene, SceneLoader, Sprite, SpriteManager, StandardMaterial, Texture, } from "@babylonjs/core";
import grassTexture from "@/assets/editor/grass.jpg";
import terrainHeightmap from "@/assets/editor/heightmap.webp";
import roadModel from "@/assets/editor/road.glb?url";
import treeSprite from "@/assets/editor/palmtree.png";
import { wallMaterial } from "@/editor/materials";
import { useEditorStore } from "@/stores/editor.store";
const scale = 20;
export const createBackground = (scene) => {
    createEnvironment(scene);
    createGround();
    createSky(scene);
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
        maxHeight: 60,
    });
    grass.material = grassMaterial;
};
const createSky = (scene) => {
    scene.environmentTexture = CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/country.env", scene);
    scene.createDefaultSkybox(scene.environmentTexture, false, 1000);
};
const createEnvironment = (scene) => {
    SceneLoader.ImportMesh("", roadModel, "", scene, () => (useEditorStore().loaded = true));
    const spriteManagerTrees = new SpriteManager("treesManager", treeSprite, 2000, { width: 512, height: 1024 }, scene);
    for (let i = 0; i < 50; i++) {
        const tree = new Sprite("tree", spriteManagerTrees);
        tree.position.x = randomNumber(-100, -20);
        tree.position.z = randomNumber(200, 250);
        tree.position.y = randomNumber(15, 17);
        tree.size = randomNumber(8, 13);
    }
    for (let i = 0; i < 50; i++) {
        const tree = new Sprite("tree", spriteManagerTrees);
        tree.position.x = randomNumber(200, 300);
        tree.position.z = randomNumber(150, 250);
        tree.position.y = randomNumber(10, 17);
        tree.size = randomNumber(12, 17);
    }
};
const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
};
//# sourceMappingURL=background.js.map