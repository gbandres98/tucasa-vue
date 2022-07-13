import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import type { Terrain } from "@/model/model";

export const getTerrains = async () => {
  const modelsCollection = collection(firestore, "terrains");

  const snap = await getDocs(modelsCollection);

  return snap.docs.map((doc) => {
    const terrain = doc.data() as Terrain;

    terrain.id = doc.id;
    return terrain;
  });
};

export const saveTerrain = async (terrain: Terrain) => {
  if (terrain.id) {
    return setDoc(doc(firestore, "terrains", terrain.id), terrain);
  }

  const optionsCollection = collection(firestore, "terrains");
  return addDoc(optionsCollection, terrain);
};

export const deleteTerrain = async (id: string) => {
  return deleteDoc(doc(firestore, "terrains", id));
};
