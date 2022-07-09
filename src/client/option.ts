import { collection, getDocs, setDoc, doc, addDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import type { Option } from "@/model/model";

export const getOptions = async () => {
  const optionsCollection = collection(firestore, "options");

  const snap = await getDocs(optionsCollection);

  return snap.docs.map((doc) => {
    const option = doc.data() as Option;
    option.id = doc.id;
    return option;
  });
};

export const saveOption = async (option: Option) => {
  if (option.id) {
    return setDoc(doc(firestore, "options", option.id), option);
  }

  const optionsCollection = collection(firestore, "options");
  return addDoc(optionsCollection, option);
};
