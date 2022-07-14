import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
export const getStaff = async () => {
    const staffCollection = collection(firestore, "staff");
    const snap = await getDocs(staffCollection);
    return snap.docs.map((doc) => doc.data());
};
export const saveStaff = async (staff) => {
    return setDoc(doc(firestore, "staff", staff.email), staff);
};
export const deleteStaff = async (email) => {
    return deleteDoc(doc(firestore, "staff", email));
};
//# sourceMappingURL=staff.js.map