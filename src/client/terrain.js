import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where, } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
export const getTerrains = async () => {
    const modelsCollection = collection(firestore, "terrains");
    const snap = await getDocs(modelsCollection);
    return snap.docs.map((doc) => {
        const terrain = doc.data();
        terrain.id = doc.id;
        return terrain;
    });
};
export const saveTerrain = async (terrain) => {
    if (terrain.id) {
        return setDoc(doc(firestore, "terrains", terrain.id), terrain);
    }
    const optionsCollection = collection(firestore, "terrains");
    return addDoc(optionsCollection, terrain);
};
export const deleteTerrain = async (id) => {
    return deleteDoc(doc(firestore, "terrains", id));
};
//# sourceMappingURL=terrain.js.map