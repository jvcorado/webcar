// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0OzsIBz3hnwk7W9SN2ehAb63eI58dvig",
  authDomain: "webcarros-4c038.firebaseapp.com",
  projectId: "webcarros-4c038",
  storageBucket: "webcarros-4c038.appspot.com",
  messagingSenderId: "705200334734",
  appId: "1:705200334734:web:673d460ea605e31d4a26df",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
