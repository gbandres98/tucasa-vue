import { ArcRotateCamera, Engine, HemisphericLight, Scene, Tools, Vector3, } from "@babylonjs/core";
import { createBackground } from "@/editor/background";
let sizeX, sizeZ;
let engine;
let scene;
let canvas;
export const createScene = (editorCanvas, x = 15, z = 15) => {
    sizeX = x;
    sizeZ = z;
    canvas = editorCanvas;
    engine = new Engine(canvas, true, { stencil: true });
    scene = new Scene(engine);
    new HemisphericLight("ambientLight", new Vector3(0.2, 1, -0.2), scene);
    createCamera();
    createBackground();
    engine.runRenderLoop(() => {
        scene.render();
    });
};
const createCamera = () => {
    const distance = realSizeX() + realSizeZ();
    const newCamera = new ArcRotateCamera("camera", Tools.ToRadians(270), Tools.ToRadians(60), distance, new Vector3(realSizeX() / 2, 0, realSizeZ() / 2), scene);
    newCamera.attachControl(canvas, true);
    newCamera.upperBetaLimit = Tools.ToRadians(80);
    newCamera.lowerRadiusLimit = 20;
    newCamera.upperRadiusLimit = distance + 20;
};
const realSizeX = () => {
    return sizeX * 2.5;
};
const realSizeZ = () => {
    return sizeZ * 2.5;
};
//# sourceMappingURL=editor.js.map