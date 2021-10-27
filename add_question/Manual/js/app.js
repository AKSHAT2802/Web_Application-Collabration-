// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
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

const params = new URLSearchParams(document.location.search);
const name = params.get("subject");

document.getElementById("btn_submit").addEventListener("click", function () {
  console.log("Hello");
  const question = document.getElementById("question").value;
  const optionA = document.getElementById("opt_A").value;
  const optionB = document.getElementById("opt_B").value;
  const optionC = document.getElementById("opt_C").value;
  const optionD = document.getElementById("opt_D").value;
  const correct_ans = document.getElementById("correct_ans").value;
  const marks = document.getElementById("marks").value;
  const chapter = document.getElementById("chapter").value;

  // adding document of new faculty member in firestore
  // Add a new document in collection "faculty_info"

  // var myarr=[];
  //var ls = ["1",marks,question,optionA,optionB,optionC,optionD,correct_ans];
  //myarr.push(ls);

  var newMap = {
    type: "1",
    marks: marks,
    Question: question,
    optionA: optionA,
    optionB: optionB,
    optionC: optionC,
    optionD: optionD,
    correct_ans: correct_ans,
  };

  getDoc(doc(db, name, chapter)).then((docSnap) => {
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      // updateDoc
      const chapterRef = doc(db, name, chapter);
      updateDoc(chapterRef, {
        Questions: arrayUnion(newMap),
      });
      console.log("Update successfully in chapter");
    } else {
      console.log("No such document!");
      setDoc(doc(db, name, chapter), {
        Questions: arrayUnion(newMap),
      });
      alert("Question Added successfully");
      console.log("Question added in the firestore");
    }
  });
});
