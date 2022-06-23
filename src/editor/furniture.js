import "@babylonjs/loaders/glTF/2.0";
import { AbstractMesh, Color3, Mesh, PBRMaterial, PointerEventTypes, PointerInfo, Scene, SceneLoader, StandardMaterial, Tools, Vector3, } from "@babylonjs/core";
import { firestore, storage } from "@/firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { activeFloor, getClosestWallToPointer, wallHash, } from "@/editor/indoorEditor";
import { scene } from "@/editor/editor";
import { collection, getDocs, query, where } from "firebase/firestore";
const furnitures = new Map();
let activeCallBack;
export const getModels = async (type) => {
    const modelsCollection = collection(firestore, "models");
    const q = query(modelsCollection, where("type", "==", "door"));
    const snap = await getDocs(q);
    return snap.docs.map((doc) => doc.data());
};
export const startFurniturePlacement = async (model) => {
    // const model = {
    //   name: "door.glb",
    //   scaling: [0.015, 0.015, 0.015],
    //   wall: true,
    // };
    const url = await getDownloadURL(ref(storage, model.name));
    SceneLoader.ImportMesh("", url, "door.glb", scene, (meshes) => {
        const root = meshes[0];
        root.scaling = new Vector3(model.scaling, model.scaling, model.scaling);
        const child = meshes[1];
        if (model.wall) {
            const clone = child.clone(child.name + "-clone", root);
            if (clone && model.wallOffset) {
                clone.position.z += model.wallOffset;
                child.position.z -= model.wallOffset;
            }
            child.rotation = new Vector3(0, Tools.ToRadians(180), 0);
        }
        activeCallBack = furniturePlacementCallback(root);
        scene.onPointerObservable.add(activeCallBack);
    });
};
const endFurniturePlacement = () => {
    console.log("A");
    scene.onPointerObservable.removeCallback(activeCallBack);
};
const furniturePlacementCallback = (mesh) => (pointerInfo) => {
    const wall = getClosestWallToPointer(true);
    if (!wall || wall.status != "enabled")
        return;
    if (pointerInfo.type == PointerEventTypes.POINTERDOWN &&
        pointerInfo.event.button == 0) {
        if (furnitures.has(wallHash(wall)))
            return;
        furnitures.set(wallHash(wall), mesh);
        endFurniturePlacement();
        return;
    }
    if (wall.vertical)
        mesh.rotation = new Vector3(0, Tools.ToRadians(90), 0);
    else
        mesh.rotation = new Vector3(0, Tools.ToRadians(0), 0);
    mesh.position = new Vector3(wall.position.x, activeFloor * 4, wall.position.z);
    if (furnitures.has(wallHash(wall)))
        setFurnitureError(mesh);
    else
        removeFurnitureError(mesh);
};
const setFurnitureError = (root) => {
    root.getChildren().forEach((node) => {
        const mesh = node;
        if (!mesh.material)
            return;
        mesh.material.albedoColor = new Color3(1, 0.2, 0.2);
    });
};
const removeFurnitureError = (root) => {
    root.getChildren().forEach((node) => {
        const mesh = node;
        if (!mesh.material)
            return;
        mesh.material.albedoColor = new Color3(1, 1, 1);
    });
};
//# sourceMappingURL=furniture.js.map