const params = new URLSearchParams(document.location.search);
const name = params.get("subject");
document.getElementById("ADM").addEventListener("click",function(){
    window.location.href="../../add_question/Manual/add_question.html?subject="+name;
});

document.getElementById("create_quiz").addEventListener("click",function(){
    window.location.href="../../Create_Quiz/CreateQuiz.html?subject="+name;
});