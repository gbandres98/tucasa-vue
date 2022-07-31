import { ArcRotateCamera, Color3, CubeTexture, Engine, HemisphericLight, MeshBuilder, PBRMaterial, Scene, SceneLoader, StandardMaterial, Texture, Tools, Vector3, } from "@babylonjs/core";
import grassTexture from "@/assets/editor/grass.jpg";
import terrainHeightmap from "@/assets/editor/heightmap.webp";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/firebase/firebase";
import wallTexture from "@/assets/editor/wall.jpg";
export const initModelViewer = async (editorCanvas, model) => {
    const canvas = editorCanvas;
    const engine = new Engine(canvas, true, { stencil: true });
    const scene = new Scene(engine);
    const camera = createCamera(scene, canvas);
    loadModel(model, scene, camera);
    createGround(scene);
    createSky(scene);
    new HemisphericLight("ambientLight", new Vector3(0.2, 1, -0.2), scene);
    engine.runRenderLoop(() => {
        scene.render();
    });
    return scene;
};
const loadModel = async (model, scene, camera) => {
    const url = await getDownloadURL(ref(storage, model.file));
    SceneLoader.ImportMesh("", url, "", scene, (meshes) => {
        const wallMaterial = new StandardMaterial("wallMaterial" + model.id, scene);
        wallMaterial.diffuseTexture = new Texture(wallTexture);
        wallMaterial.diffuseTexture.uScale = 4;
        wallMaterial.diffuseTexture.vScale = 4;
        const glassMaterial = new PBRMaterial("glassMtl" + model.id, scene);
        glassMaterial.metallic = 0;
        glassMaterial.transparencyMode = PBRMaterial.MATERIAL_ALPHABLEND;
        glassMaterial.alpha = 0.4;
        glassMaterial.roughness = 0.5;
        glassMaterial.subSurface.isRefractionEnabled = true;
        meshes.forEach((mesh) => {
            if (mesh.name === "Wall")
                mesh.material = wallMaterial;
            if (mesh.name.startsWith("Glass"))
                mesh.material = glassMaterial;
        });
        camera.focusOn(meshes, true);
    });
};
const createCamera = (scene, canvas) => {
    const camera = new ArcRotateCamera("camera", Tools.ToRadians(270), Tools.ToRadians(60), 10, new Vector3(0, 2, 0), scene);
    camera.attachControl(canvas, true);
    camera.upperBetaLimit = Tools.ToRadians(80);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 20;
    return camera;
};
const createGround = (scene) => {
    const scale = 20;
    const grassMaterial = new StandardMaterial("grassMaterial" + Math.random().toString(), scene);
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
    }, scene);
    grass.material = grassMaterial;
};
const createSky = (scene) => {
    scene.environmentTexture = CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/country.env", scene);
    scene.createDefaultSkybox(scene.environmentTexture, false, 1000);
};
//# sourceMappingURL=modelViewer.js.map