import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import type { Staff } from "@/model/model";

export const getStaff = async () => {
  const staffCollection = collection(firestore, "staff");

  const snap = await getDocs(staffCollection);

  return snap.docs.map((doc) => doc.data() as Staff);
};

export const createStaff = async (staff: Staff) => {
  saveStaff(staff);
};

export const saveStaff = async (staff: Staff) => {
  return setDoc(doc(firestore, "staff", staff.email), staff);
};

export const deleteStaff = async (email: string) => {
  return deleteDoc(doc(firestore, "staff", email));
};
