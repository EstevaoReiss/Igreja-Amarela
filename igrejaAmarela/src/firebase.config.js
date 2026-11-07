import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYIuRGMnPbdjM-HnzgnYjmz3I38SFsI4A",
  authDomain: "igreja-amarela.firebaseapp.com",
  projectId: "igreja-amarela",
  storageBucket: "igreja-amarela.firebasestorage.app",
  messagingSenderId: "861200894844",
  appId: "1:861200894844:web:c0a5856914b26edeecb2f9"
};

export const firebase = getApps().length ? getApp() : initializeApp(firebaseConfig);

function criarAuth() {
  try {
    return initializeAuth(firebase, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    return getAuth(firebase);
  }
}

export const auth = criarAuth();
export const db = getFirestore(firebase);