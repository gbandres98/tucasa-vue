import type { ClientInfo, PaymentInfo, Project } from "@/model/model";
import { generateDesign } from "@/editor/util";
import { DateTime } from "luxon";
import { httpsCallable } from "firebase/functions";
import { firestore, functions } from "@/firebase/firebase";
import { useAuthStore } from "@/stores/auth.store";
import { FirebaseError } from "firebase/app";
import router from "@/router";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import type { User } from "firebase/auth";

export const createProject = async (
  paymentInfo: PaymentInfo,
  client: ClientInfo,
  password: string
) => {
  const project: Project = {
    id: -1,
    design: generateDesign(),
    payment: paymentInfo,
    client: client,
    assigned: undefined,
    status: "NEW",
    lastModified: DateTime.now(),
  };

  const saveProject = httpsCallable<Project, Project>(functions, "saveProject");

  try {
    const res = await saveProject(project);
    await useAuthStore().register(client.email, password);

    if (res.data.id) {
      router.push(`/micasa`);
    }
  } catch (e: unknown) {
    if (!(e instanceof FirebaseError)) {
      console.log(e);
      return "Error de conexión";
    }
    switch (e.code) {
      case "auth/weak-password":
        return "La contraseña es demasiado débil";
      case "auth/invalid-email":
        return "El correo electrónico no es válido";
      case "auth/email-already-in-use":
        return "El correo electrónico ya está en uso";
      default:
        console.log(e.code);
        return "Error de conexión";
    }
  }
};

export const getUserProject = async (user: User | null) => {
  if (!user) return -1;

  const projectCollection = collection(firestore, "projects");
  const snap = await getDocs(
    query(projectCollection, where("client.email", "==", user.email))
  );

  if (snap.empty) return -1;

  return parseInt(snap.docs[0].id);
};

export const getProject = async (id: string) => {
  const snap = await getDoc(doc(firestore, "projects", id));

  return snap.data() as Project;
};
