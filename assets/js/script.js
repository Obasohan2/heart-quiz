
// Arrays of questions and optional answers//
const questions = [
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antartica", correct: true },
        ]
    },

    {
        question: "Which is the largest animal ?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },

    {
        question: "What is 176 - 18 ?",
        answers: [
            { text: "158", correct: true },
            { text: "138", correct: false },
            { text: "140", correct: false },
            { text: "161", correct: false },
        ]
    },

    {
        question: "What is the capital of Spain?",
        answers: [
            { text: "Barcelona", correct: false },
            { text: "Alicante", correct: false },
            { text: "Madrid", correct: true },
            { text: "Bilbao", correct: false },
        ]
    },
    {
        question: "Who is a football player ?",
        answers: [
            { text: "Michael Jackson", correct: false },
            { text: "Cristiano Ronaldo", correct: true },
            { text: "Hussain Bolt", correct: false },
            { text: "Joe Biden", correct: false },
        ]
    },
    {
        question: "Who is a known singer ?",
        answers: [

            { text: "Mohammed Salah", correct: false },
            { text: "Alex Ferguson", correct: false },
            { text: "Alan Shearer", correct: false },
            { text: "Michael Jackson", correct: true },
        ]
    },
    {
        question: "What is the name of UK currency ?",
        answers: [
            { text: "Dollar", correct: false },
            { text: "Naira", correct: false },
            { text: "Pounds Sterling", correct: true },
            { text: "Euro", correct: false },
        ]
    },
    {
        question: "Where is Spain located ?",
        answers: [
            { text: "Africa", correct: false },
            { text: "Australia", correct: false },
            { text: "Asia", correct: false },
            { text: "Europe", correct: true },
        ]
    },
    {
        question: "Who is a boxer ?",
        answers: [
            { text: "Harry Kane", correct: false },
            { text: "Justin Bieber", correct: false },
            { text: "Anthony Joshua", correct: true },
            { text: "Rishi Sunak", correct: false },
        ]
    },
]

// declaring variable element
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//chnages in scores while answering the quiz questions
let currentQuestionIndex = 0;
let score = 0;


// start quiz with question index zero and score zero
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    // code to click on the next button to call show question.
    nextButton.innerHTML = "Next";
    showQuestion();
}

//code to show the questions element index 
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    // code to display the answers 
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        //select answer button
        button.addEventListener("click", selectAnswwer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//click on the chosen answer button which will optionally respond
function selectAnswwer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");

        //score increases when click on correct answer
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        //disable click after selecting choiced answer
        button.disabled = true;
    })

    //display of next button to the next question after user's choiced answer.
    nextButton.style.display = "block";
}

//diaply the score 
function showScore() {
    resetState();

    //using the "backtick" to avoid javascript interpretation as string
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

//code to move into next question and if no more question, show the score.
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
};

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

//show quiz game questions
startQuiz();