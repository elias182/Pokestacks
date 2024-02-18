// Importa las funciones que necesitas de los SDKs que necesitas
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB0PAVHLypL4BCHedl3GTaxD87eiKr6g6M",
  authDomain: "pokestacks-3d2a2.firebaseapp.com",
  projectId: "pokestacks-3d2a2",
  storageBucket: "pokestacks-3d2a2.appspot.com",
  messagingSenderId: "42742049835",
  appId: "1:42742049835:web:edc83a9594bc017e854e6e",
  measurementId: "G-W8C3MRPWRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export default app;