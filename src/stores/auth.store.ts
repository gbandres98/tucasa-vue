import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import router from "@/router";

export type Role = undefined | "USER" | "STAFF" | "ADMIN";

type AuthState = {
  user: User | null;
  role: Role;
};

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => {
    return {
      user: auth.currentUser,
      role: undefined,
    };
  },
  actions: {
    async register(email: string, password: string) {
      await createUserWithEmailAndPassword(auth, email, password);
    },
    async login(email: string, password: string) {
      await signInWithEmailAndPassword(auth, email, password);
    },
    logout() {
      signOut(auth);
    },
  },
});

onAuthStateChanged(auth, (user) => {
  useAuthStore().user = user;

  if (user) {
    auth.currentUser?.getIdTokenResult().then((idTokenResult) => {
      const role = idTokenResult.claims.role as Role;

      useAuthStore().role = role;
      // if (role === "STAFF" || role === "ADMIN") router.push("/backoffice");
    });
  }
});
