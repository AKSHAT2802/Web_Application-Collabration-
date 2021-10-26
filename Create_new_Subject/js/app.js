// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc ,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
const user = auth.currentUser;
var email = "abc";
//Get the currently signed-in user
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    //const uid = user.uid;
    email = user.email;
    // ...
    //alert("User is looged in "+uid);
    console.log("email: " + email);
    // document.getElementById("username").innerHTML = email;
  }
});

document.getElementById("btn_submit").addEventListener("click", function () {
  console.log("Hello");
  const C_name = document.getElementById("C_Name").value;
  const C_Code = document.getElementById("C_Code").value;
  const C_Credits = document.getElementById("C_Credits").value;
  const C_Description = document.getElementById("C_Description").value;
  //   const C_Faculty = document.getElementById("opt_C").value;
  
  // adding document of new faculty member in firestore
  // Add a new document in collection "faculty_info"
  setDoc(doc(db, "courses", C_name), {
    C_name: C_name,
    C_Code: C_Code,
    C_Credits: C_Credits,
    C_Faculty: email,
  });
  alert("Subject Added successfully");
  console.log("Subject added in the firestore");


  const facultyRef = doc(db, "faculty_info", email);
  updateDoc(facultyRef,{
    courses: arrayUnion(C_name)
  });
  console.log("Update successfully in faculty_info");



  setDoc(doc(db, C_name, "README"), {
    C_Description: C_Description
  });
  console.log("Created new collection of Course_name");

  window.location.href = "../../Dashboard/srtdash/index.html";
});
