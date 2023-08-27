import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoH7_Eupq4h0_G9qUU0DUQZnj4zdMYoYI",
  authDomain: "photofolio-ca49a.firebaseapp.com",
  projectId: "photofolio-ca49a",
  storageBucket: "photofolio-ca49a.appspot.com",
  messagingSenderId: "249403895673",
  appId: "1:249403895673:web:cf6bb59e91a5f8755e09a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
