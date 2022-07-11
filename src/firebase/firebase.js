import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
const firebaseConfig = {
    apiKey: "AIzaSyA0tOKO3Syodgw6HbPaXNKrQfRQGgMd7Vw",
    authDomain: "tucasa-dev-d3f3a.firebaseapp.com",
    projectId: "tucasa-dev-d3f3a",
    storageBucket: "tucasa-dev-d3f3a.appspot.com",
    messagingSenderId: "505891523322",
    appId: "1:505891523322:web:12a874c82f7e5809b99743",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
const functions = getFunctions(app, "europe-west3");
export { auth, storage, firestore, functions };
//# sourceMappingURL=firebase.js.map