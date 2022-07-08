import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import type { Option } from "@/model/model";

export const getOptions = async () => {
  const optionsCollection = collection(firestore, "options");

  const snap = await getDocs(optionsCollection);

  return snap.docs.map((doc) => doc.data() as Option);
};
