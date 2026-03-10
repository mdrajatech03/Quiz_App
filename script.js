const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            {Text: "Shark", correct: false},
            {Text: "Blue Whale", correct: true},
            {Text: "Elephant", correct: false},
            {Text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is smallest country in the world?",
        answers: [
            {Text: "Vatican city", correct: true},
            {Text: "Bhutan", correct: false},
            {Text: "Nepal", correct: false},
            {Text: "Shri Lanka", correct: false},
        ] 
    },
    {
        question: "Which is largest desert in the world?",
        answers: [
            {Text: "Kalahari", correct: false},
            {Text: "Gobi", correct: false},
            {Text: "Sahara", correct: false},
            {Text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is smallest continent in the world?",
        answers: [
            {Text: "Asia", correct: false},
            {Text: "Australia", correct: true},
            {Text: "Arctic", correct: false},
            {Text: "Africa", correct: false},
        ]
    },
    {
        question: "Which is your favoriate?",
        answers: [
            {Text: "Movie", correct: false},
            {Text: "Web Series", correct: false},
            {Text: "Reading", correct: true},
            {Text: "Writing", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
         const button = document.createElement("button");
         button.innerHTML = answer.Text;
         button.classList.add("btn");
         answerButtons.appendChild(button);
         if(answer.correct){
            button.dataset.correct = answer.correct;
         }
         button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
     nextButton.style.display = "none";
     while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
     }
}

function selectAnswer(e){
    const selecteBtn = e.target;
    const isCorrect = selecteBtn.dataset.correct === "true";
    if (isCorrect){
        selecteBtn.classList.add("correct");
        score++;
    }else{
        selecteBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
       if(button.dataset.correct === "true"){
        button.classList.add("correct");
       }
       button.disabled = true;
    });
    nextButton.style.display ="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener("click",()=> {
   if(currentQuestionIndex < questions.length){
    handleNextButton();
   }else{
    startQuiz();
   }
});


startQuiz();