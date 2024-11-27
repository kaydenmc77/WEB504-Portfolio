// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJNMbf2UYXiQOOwagkCRrNqeQs-D8tOos",
  authDomain: "portfolio-caf72.firebaseapp.com",
  databaseURL: "https://portfolio-caf72-default-rtdb.firebaseio.com",
  projectId: "portfolio-caf72",
  storageBucket: "portfolio-caf72.firebasestorage.app",
  messagingSenderId: "1087473340138",
  appId: "1:1087473340138:web:93f4e43206de99aab05193",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

function writeUserData() {
  const db = getDatabase();
  set(ref(db, "messages/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}
