import "@babylonjs/loaders/glTF/2.0";
import {
  AbstractMesh,
  Color3,
  Mesh,
  PBRMaterial,
  PointerEventTypes,
  PointerInfo,
  Scene,
  SceneLoader,
  StandardMaterial,
  Tools,
  Vector3,
} from "@babylonjs/core";
import { firestore, storage } from "@/firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import {
  activeFloor,
  getClosestWallToPointer,
  wallHash,
} from "@/editor/indoorEditor";
import { scene } from "@/editor/editor";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEditorStore } from "@/stores/editor.store";

export type Model = {
  name: string;
  file: string;
  preview: string;
  price: number;
  scaling: number;
  wall: boolean;
  window: boolean;
  wallOffset: number | undefined;
};

export type PlacedModel = {
  position: Vector3;
  rotation: Vector3;
  wallHash: string;
  model: Model;
};

const furnitures: Map<string, AbstractMesh> = new Map<string, AbstractMesh>();
let activeCallBack: (pointerInfo: PointerInfo) => void;

export const getModels = async (type: string) => {
  const modelsCollection = collection(firestore, "models");
  const q = query(modelsCollection, where("type", "==", "door"));

  const snap = await getDocs(q);

  return snap.docs.map((doc) => doc.data() as Model);
};

export const startFurniturePlacement = async (model: Model) => {
  const url = await getDownloadURL(ref(storage, model.file));

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

    activeCallBack = furniturePlacementCallback(root, model);
    scene.onPointerObservable.add(activeCallBack);
  });
};

const endFurniturePlacement = () => {
  scene.onPointerObservable.removeCallback(activeCallBack);
};

const furniturePlacementCallback =
  (mesh: AbstractMesh, model: Model) => (pointerInfo: PointerInfo) => {
    const wall = getClosestWallToPointer(true);

    if (!wall || wall.status != "enabled") return;

    if (
      pointerInfo.type == PointerEventTypes.POINTERDOWN &&
      pointerInfo.event.button == 0
    ) {
      if (furnitures.has(wallHash(wall))) return;
      const hash = wallHash(wall);
      furnitures.set(hash, mesh);
      updateStoreFurniture({
        position: mesh.position,
        rotation: mesh.rotation,
        wallHash: hash,
        model: model,
      });
      endFurniturePlacement();
      return;
    }

    if (wall.vertical) mesh.rotation = new Vector3(0, Tools.ToRadians(90), 0);
    else mesh.rotation = new Vector3(0, Tools.ToRadians(0), 0);

    mesh.position = new Vector3(
      wall.position.x,
      activeFloor * 4,
      wall.position.z
    );

    if (furnitures.has(wallHash(wall))) setFurnitureError(mesh);
    else removeFurnitureError(mesh);
  };

const setFurnitureError = (root: AbstractMesh) => {
  root.getChildren().forEach((node) => {
    const mesh = node as Mesh;
    if (!mesh.material) return;
    (mesh.material as PBRMaterial).albedoColor = new Color3(1, 0.2, 0.2);
  });
};

const removeFurnitureError = (root: AbstractMesh) => {
  root.getChildren().forEach((node) => {
    const mesh = node as Mesh;
    if (!mesh.material) return;
    (mesh.material as PBRMaterial).albedoColor = new Color3(1, 1, 1);
  });
};

const updateStoreFurniture = (model: PlacedModel) => {
  const newArray: Array<PlacedModel> = [];

  useEditorStore().modelData.forEach((model) => newArray.push(model));
  newArray.push(model);

  useEditorStore().modelData = newArray;
};
