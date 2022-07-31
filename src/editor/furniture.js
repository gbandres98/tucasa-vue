import "@babylonjs/loaders/glTF/2.0";
import { AbstractMesh, Color3, Mesh, PBRMaterial, PointerEventTypes, PointerInfo, Scene, SceneLoader, StandardMaterial, Tools, Vector3, } from "@babylonjs/core";
import { firestore, storage } from "@/firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { activeFloor, getClosestWallToPointer, setWallStatus, wallHash, wallIDFromHash, walls, } from "@/editor/indoorEditor";
import { scene } from "@/editor/editor";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEditorStore } from "@/stores/editor.store";
import { glassMaterial, wallMaterial } from "@/editor/materials";
const meshes = [];
let activeCallBack;
export const getModels = async (window) => {
    const modelsCollection = collection(firestore, "models");
    const snap = await getDocs(modelsCollection);
    return snap.docs
        .map((doc) => {
        const model = doc.data();
        model.id = doc.id;
        return model;
    })
        .filter((model) => model.window === window);
};
export const startFurniturePlacement = async (model) => {
    const url = await getDownloadURL(ref(storage, model.file));
    SceneLoader.ImportMesh("", url, "", scene, (meshes) => {
        meshes.forEach((mesh) => {
            if (mesh.name === "Wall")
                mesh.material = wallMaterial;
            if (mesh.name.startsWith("Glass"))
                mesh.material = glassMaterial;
        });
        activeCallBack = furniturePlacementCallback(meshes[0], model);
        scene.onPointerObservable.add(activeCallBack);
    });
};
const endFurniturePlacement = () => {
    scene.onPointerObservable.removeCallback(activeCallBack);
};
const furniturePlacementCallback = (mesh, model) => (pointerInfo) => {
    const closeWalls = getClosestWallToPointer(true, model.size);
    if (closeWalls.length === 0 ||
        closeWalls.some((wall) => wall.status !== "temp" && wall.status !== "enabled"))
        return;
    if (pointerInfo.type == PointerEventTypes.POINTERDOWN &&
        pointerInfo.event.button == 0) {
        const placedModel = {
            floor: activeFloor,
            wallHashes: closeWalls.map((w) => wallHash(w)),
            model: model,
        };
        meshes.push({
            placedModel: placedModel,
            mesh: mesh,
        });
        updateStoreFurniture(placedModel);
        closeWalls.forEach((w) => setWallStatus(w, "furniture"));
        endFurniturePlacement();
    }
    walls.forEach((w) => {
        if (w.status === "temp")
            setWallStatus(w, "enabled");
    });
    closeWalls
        .filter((w) => w.status !== "furniture")
        .forEach((w) => setWallStatus(w, "temp"));
    const baseWall = closeWalls[0];
    if (baseWall.vertical)
        mesh.rotation = new Vector3(0, Tools.ToRadians(0), 0);
    else
        mesh.rotation = new Vector3(0, Tools.ToRadians(90), 0);
    mesh.position = new Vector3(baseWall.position.x, activeFloor * 4, baseWall.position.z);
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
const updateStoreFurniture = (model) => {
    const newArray = [];
    useEditorStore().modelData.forEach((model) => newArray.push(model));
    newArray.push(model);
    useEditorStore().modelData = newArray;
};
export const hideFurniture = (floor) => {
    meshes
        .filter((m) => m.placedModel.floor === floor)
        .forEach((m) => m.mesh.setEnabled(false));
};
export const showFurniture = (floor) => {
    meshes
        .filter((m) => m.placedModel.floor === floor)
        .forEach((m) => m.mesh.setEnabled(true));
};
export const restorePlacedModels = (models) => {
    models.forEach(async (placedModel) => {
        const url = await getDownloadURL(ref(storage, placedModel.model.file));
        SceneLoader.ImportMesh("", url, "", scene, (meshes) => {
            meshes.forEach((mesh) => {
                if (mesh.name === "Wall")
                    mesh.material = wallMaterial;
                if (mesh.name.startsWith("Glass"))
                    mesh.material = glassMaterial;
            });
            const modelWalls = placedModel.wallHashes.map((hash) => walls.get(wallIDFromHash(hash, placedModel.floor)));
            const rootWall = modelWalls[0];
            if (!rootWall)
                return;
            modelWalls.forEach((w) => {
                if (w)
                    setWallStatus(w, "furniture");
            });
            const root = meshes[0];
            root.position = new Vector3(rootWall.position.x, placedModel.floor * 4, rootWall.position.z);
            if (rootWall.vertical)
                root.rotation = new Vector3(0, Tools.ToRadians(0), 0);
            else
                root.rotation = new Vector3(0, Tools.ToRadians(90), 0);
            updateStoreFurniture(placedModel);
        });
    });
};
//# sourceMappingURL=furniture.js.map