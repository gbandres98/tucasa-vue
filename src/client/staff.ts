import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { auth, firestore, functions } from "@/firebase/firebase";
import type { Staff } from "@/model/model";
import { httpsCallable } from "firebase/functions";
import { sendPasswordResetEmail } from "firebase/auth";

export const getStaff = async () => {
  const staffCollection = collection(firestore, "staff");

  const snap = await getDocs(staffCollection);

  return snap.docs.map((doc) => doc.data() as Staff);
};

export const createStaff = async (staff: Staff) => {
  const createUser = httpsCallable(functions, "createUser");

  await createUser({
    email: staff.email,
    role: staff.admin ? "ADMIN" : "STAFF",
  });

  sendPasswordResetEmail(auth, staff.email);
  return setDoc(doc(firestore, "staff", staff.email), staff);
};

export const saveStaff = async (staff: Staff) => {
  const setRole = httpsCallable(functions, "setRole");

  setRole({
    email: staff.email,
    role: staff.admin ? "ADMIN" : "STAFF",
  });

  return setDoc(doc(firestore, "staff", staff.email), staff);
};

export const deleteStaff = async (email: string) => {
  const deleteUser = httpsCallable(functions, "deleteUser");

  deleteUser({
    email: email,
  });

  return deleteDoc(doc(firestore, "staff", email));
};
