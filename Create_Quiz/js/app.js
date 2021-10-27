// var userSelection = document.getElementsByClassName('addQuestion');

// for(var i = 0; i < userSelection.length; i++) {
//   (function(Question_no) {
//     userSelection[Question_no].addEventListener("click", function() {
//        console.log("Clicked index: " + Question_no);
//      })
//   })(i);
// }
// document.getElementsByClassName("addQuestion").addEventListener("click", function () {
//   var rowId = event.target.parentNode.parentNode.id;
//   //this gives id of tr whose button was clicked
//   var data = document.getElementById(rowId).querySelectorAll(".row-data");
//   /*returns array of all elements with
// "row-data" class within the row with given id*/

//   var type = data[0].innerHTML;
//   var marks = data[1].innerHTML;
//   var question = data[2].innerHTML;
//   var OpA = data[3].innerHTML;
//   var OpB = data[4].innerHTML;
//   var OpC = data[5].innerHTML;
//   var OpD = data[6].innerHTML;
//   var Correct = data[7].innerHTML;

//   alert("Question " + question + "\nCorrect: " + Correct);

//   // Now add question to list .
// });


// document.getElementById('add1234').addEventListener("click",function() {
//     console.print("IWT");
// });