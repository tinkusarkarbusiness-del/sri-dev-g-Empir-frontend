import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {        
  apiKey: "AIzaSyBnz-YXuHnLtFb74tdXbKGV9LeDF9wLlFU",        
  authDomain: "studio-309973033-1ca91.firebaseapp.com",        
  projectId: "studio-309973033-1ca91",        
  storageBucket: "studio-309973033-1ca91.appspot.com",        
  messagingSenderId: "617769747497",        
  appId: "1:617769747497:web:a2fe4015897d99d9e34838"        
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

