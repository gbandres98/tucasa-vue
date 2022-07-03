import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
export const getTerrains = async () => {
    const modelsCollection = collection(firestore, "terrains");
    const snap = await getDocs(modelsCollection);
    return snap.docs.map((doc) => doc.data());
};
//# sourceMappingURL=terrain.js.map