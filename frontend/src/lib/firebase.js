import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDiT5Z1RePeMCp1zTwi9hI5ctckqC5jUiE",
    authDomain: "researchify-assignment.firebaseapp.com",
    projectId: "researchify-assignment",
    storageBucket: "researchify-assignment.firebasestorage.app",
    messagingSenderId: "510783930269",
    appId: "1:510783930269:web:8b402055c9f1471c1d7974"
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export default firebaseApp;
