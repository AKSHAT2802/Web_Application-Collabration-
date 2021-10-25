// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
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

const auth = getAuth(app);
const user = auth.currentUser;
const db = getFirestore(app);

console.log("Hello");

//Get the currently signed-in user
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    const email = user.email;
    // ...
    //alert("User is looged in "+uid);
    console.log("email: " + email);
    // document.getElementById("username").innerHTML = email;

    const docRef = doc(db, "faculty_info", email);
    //const docSnap = getDoc(docRef);

    getDoc(doc(db, "faculty_info", email)).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    });


    /* Reading data from firestore
    https://www.youtube.com/watch?v=dMx4ug7XVoo 
    */
    // Converting object into string
    class Faculty {
      constructor(name, email, phoneNo) {
        this.name = name;
        this.email = email;
        this.phoneNo = phoneNo;
      }
      toString() {
        // return this.name + ", " + this.email + ", " + this.phoneNo;
        return this.name;
      }
    }

    // Firestore data converter
    const facultyConverter = {
      toFirestore: (faculty) => {
        return {
          name: faculty.name,
          email: faculty.email,
          phoneNo: faculty.phoneNo,
        };
      },
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Faculty(data.F_Name, data.F_Email, data.F_PhoneNo);
      },
    };

    const ref = doc(db, "faculty_info", email).withConverter(facultyConverter);
    getDoc(doc(db, "faculty_info", email).withConverter(facultyConverter)).then((docSnap) => {
      if (docSnap.exists()) {
        // Convert to City object
        const faculty = docSnap.data();
        // Use a City instance method
        console.log(faculty.toString());
        document.getElementById("username").innerHTML = faculty.toString();
      } else {
        console.log("No such document!");
      }
    });

    




  } else {
    // User is signed out
    // ...
    // alert("User is not logged in");
    // window.location.href = "../login_signup/login.html";
    window.location.href = "../../login_signup/login.html";
  }
});

document.getElementById("btn_logout").addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("Logged out successfully");
      window.location.href = "../../login_signup/login.html";
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
});
// if (user !== null) {

//   // The user object has basic properties such as display name, email, etc.
//   //const displayName = user.displayName;

//   //const photoURL = user.photoURL;
//   //const emailVerified = user.emailVerified;

//   // The user's ID, unique to the Firebase project. Do NOT use
//   // this value to authenticate with your backend server, if
//   // you have one. Use User.getToken() instead.
//   const uid = user.uid;
//   console.log("Email: "+email);
//   console.log("UID: "+uid);
// }
