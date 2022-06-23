import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
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
export { auth, storage, firestore };
//# sourceMappingURL=firebase.js.map