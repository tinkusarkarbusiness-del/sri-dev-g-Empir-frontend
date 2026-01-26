import { getAuth } from "firebase/auth"
import { firebaseApp } from "@/firebase/client";

export const auth = getAuth(firebaseApp)
