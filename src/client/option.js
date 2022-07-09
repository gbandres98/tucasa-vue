import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
export const getOptions = async () => {
    const optionsCollection = collection(firestore, "options");
    const snap = await getDocs(optionsCollection);
    return snap.docs.map((doc) => doc.data());
};
//# sourceMappingURL=option.js.map