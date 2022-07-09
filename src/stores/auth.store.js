import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import router from "@/router";
export const useAuthStore = defineStore({
    id: "auth",
    state: () => {
        return {
            user: auth.currentUser,
            role: undefined,
        };
    },
    actions: {
        async register(email, password, phone) {
            await createUserWithEmailAndPassword(auth, email, password);
        },
        async login(email, password) {
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
            const role = idTokenResult.claims.role;
            useAuthStore().role = role;
            // if (role === "STAFF" || role === "ADMIN") router.push("/backoffice");
        });
    }
});
//# sourceMappingURL=auth.store.js.map