import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYIuRGMnPbdjM-HnzgnYjmz3I38SFsI4A",
  authDomain: "igreja-amarela.firebaseapp.com",
  projectId: "igreja-amarela",
  storageBucket: "igreja-amarela.firebasestorage.app",
  messagingSenderId: "861200894844",
  appId: "1:861200894844:web:c0a5856914b26edeecb2f9"
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
