import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  onSnapshot,
  collection,
  arrayUnion,
  updateDoc,
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

const params = new URLSearchParams(document.location.search);
const name = params.get("subject");
const db = getFirestore(app);
// document.getElementById("Subject_name").innerHTML = name;
document.getElementById("btn_submit").addEventListener("click", function () {
  const Qname = document.getElementById("QuizName").value;
  //console.log("First element");
  // const iterator1 = QuizQuestions[1].values();

  // document.write(iterator1.next().value);
  // document.write(iterator1.next().value);
  // document.write(iterator1.next().value);

  for (let index = 0; index < QuizQuestions.length; index++) {
    const iterator1 = QuizQuestions[index].values();

    //     var myMap = new Map([["type",iterator1.next().value],
    //     ["marks",iterator1.next().value],
    //     ["question",iterator1.next().value],
    //     ["OptionA",iterator1.next().value],
    //     ["OptionB",iterator1.next().value],
    //     ["OptionC",iterator1.next().value],
    //     ["OptionD",iterator1.next().value],
    //     ["correct_ans",iterator1.next().value]
    // ]);

    var newMap = {
      type: iterator1.next().value,
      marks: iterator1.next().value,
      Question: iterator1.next().value,
      optionA: iterator1.next().value,
      optionB: iterator1.next().value,
      optionC: iterator1.next().value,
      optionD: iterator1.next().value,
      correct_ans: iterator1.next().value,
    };
    console.log(newMap);
    // var map2 = new Map([["firstname" ,"sumit"],
    //         ["lastname", "ghosh"], ["website", "geeksforgeeks"]]);
    //         console.log(map2);

    if(index == 0)
    {
        setDoc(doc(db, name, Qname), {
            paper: arrayUnion(newMap),
          });
          alert("Quiz Created successfully");
          console.log("Quiz Created in the firestore");
    }
    else
    {
        const chapterRef = doc(db, name, Qname);
        updateDoc(chapterRef, {
          paper: arrayUnion(newMap),
          title: Qname,
        });
        console.log("Update successfully in paper");
    }
    // getDoc(doc(db, name, Qname)).then((docSnap) => {
    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //     // updateDoc
    //     const chapterRef = doc(db, name, Qname);
    //     updateDoc(chapterRef, {
    //       paper: arrayUnion(newMap),
    //     });
    //     console.log("Update successfully in paper");
    //   } else {
    //     console.log("No such document!");
    //     setDoc(doc(db, name, Qname), {
    //       paper: arrayUnion(newMap),
    //     });
    //     alert("Quiz Created successfully");
    //     console.log("Quiz Created in the firestore");
    //   }
    // });
    
  }

  //alert('Quiz Generated Successfully');
});
