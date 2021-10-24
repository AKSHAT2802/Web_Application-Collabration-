// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import {
  getFirestore,
  doc,
  setDoc,
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
  setDoc(doc(db, "quiz", chapter), {
    Q_Type: "1",
    Q_mark: marks,
    Question: question,
    OptionA: optionA,
    OptionB: optionB,
    OptionC: optionC,
    OptionD: optionD,
    Correct_Ans: correct_ans
  });
  alert("Question Added successfully");
  console.log("Question added in the firestore");
});
