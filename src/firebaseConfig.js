// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATRyzioRODNiNnkb1ep3eeipc06k_dqdM",
  authDomain: "scissor-88588.firebaseapp.com",
  projectId: "scissor-88588",
  storageBucket: "scissor-88588.appspot.com",
  messagingSenderId: "55699547763",
  appId: "1:55699547763:web:9a7f7da1d68f1024beec06",
  measurementId: "G-B1428Y9Q9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;







// import { initializeApp } from 'firebase/app'
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
//   authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.VUE_APP_FIREBASE_APP_ID,
// };

// console.log(process.env.VUE_APP_FIREBASE_API_KEY);


// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export default db;