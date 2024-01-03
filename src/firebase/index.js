import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB1p5XHzkKNwaFqlmI7Ypq6XozTmquoCt4",
  authDomain: "time-sheets-79862.firebaseapp.com",
  databaseURL: "https://time-sheets-79862-default-rtdb.firebaseio.com",
  projectId: "time-sheets-79862",
  storageBucket: "time-sheets-79862.appspot.com",
  messagingSenderId: "1028561171726",
  appId: "1:1028561171726:web:5b5f6811697e270228535f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//exportamos la obtencion de la base da datos
export default db
