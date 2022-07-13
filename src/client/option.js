import { collection, getDocs, setDoc, doc, addDoc, deleteDoc, } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
export const getOptions = async () => {
    const optionsCollection = collection(firestore, "options");
    const snap = await getDocs(optionsCollection);
    return snap.docs.map((doc) => {
        const option = doc.data();
        option.id = doc.id;
        return option;
    });
};
export const saveOption = async (option) => {
    if (option.id) {
        return setDoc(doc(firestore, "options", option.id), option);
    }
    const optionsCollection = collection(firestore, "options");
    return addDoc(optionsCollection, option);
};
export const deleteOption = async (id) => {
    return deleteDoc(doc(firestore, "options", id));
};
//# sourceMappingURL=option.js.map