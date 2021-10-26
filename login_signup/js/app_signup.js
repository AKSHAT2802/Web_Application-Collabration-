// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var flag = 0;
const firebaseConfig = {
  apiKey: "AIzaSyB8Y7OU15I_IyIomfTOEXL0MVsI8Pcbd5g",
  authDomain: "gearup-d7328.firebaseapp.com",
  projectId: "gearup-d7328",
  storageBucket: "gearup-d7328.appspot.com",
  messagingSenderId: "611471043795",
  appId: "1:611471043795:web:e6df90d2e826fa7a983826",
  measurementId: "G-EL8DJYYRTE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("btn_submit").addEventListener("click", function () {
  const email = document.getElementById("Email").value;
  const password = document.getElementById("Password").value;
  const userName = document.getElementById("user_name").value;
  const phnNo = document.getElementById("phn_no").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...

      console.log("User added in the authentication");
      alert("User created successfully");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode + errorMessage);
      flag = 1;
      if (
        errorCode + errorMessage ==
        "auth/email-already-in-useFirebase: Error (auth/email-already-in-use)."
      ) {
        alert("Account already exist with given email");
        flag = 2;
        location.reload();
      }
    });
    console.log(flag);
  // if no error
  if (flag == 0) {
    // adding document of new faculty member in firestore
    // Add a new document in collection "faculty_info"
    setDoc(doc(db, "faculty_info", email), {
      F_Email: email,
      F_Name: userName,
      F_PhoneNo: phnNo,
    });
    //  setDoc(doc(db, "cities", "LA"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA"
    // });

    console.log("User added in the firestore");

  }
});
