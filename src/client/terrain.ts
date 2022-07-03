import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import type { Model } from "@/editor/furniture";
import type { Terrain } from "@/model/model";

export const getTerrains = async () => {
  const modelsCollection = collection(firestore, "terrains");

  const snap = await getDocs(modelsCollection);

  return snap.docs.map((doc) => doc.data() as Terrain);
};
