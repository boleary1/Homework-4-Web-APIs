const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionsEl = document.getElementById('question')
const answerButtonEl = document.getElementById('answer-buttons')
const rulesEl = document.getElementById('rules')
const gameOverEl = document.getElementById('gameOver')
const submittedEl = document.getElementById('submitted')
const timeEl = document.querySelector(".time");
const username = document.getElementById('usernameText');
const saveScoreButton = document.getElementById('submit-btn');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const highScoresList = document.getElementById('highScoresList');
const formReset = document.getElementById('usernameForm')
const maxHighScores = 5;
let finalScoreEl = document.getElementById('finalScoreDisplay');
let currentQuestionIndex;
let score;
let secondsLeft;
let finalScore;
let timerInterval; // added here to try to stop the timer when questions run out

startButton.addEventListener('click', startGame)
printHighScores()
submittedEl.classList.add('hide')


function startGame() {

    startButton.classList.add('hide')
    currentQuestionIndex = 0
    score = 0
    secondsLeft = 10
    timer()
    questionContainerElement.classList.remove('hide')
    rulesEl.classList.add('hide')
    gameOverEl.classList.add('hide')
    submittedEl.classList.add('hide')
    setNextQuestion();

}

function setNextQuestion() {
    resetState()
    showQuestion(Questions[currentQuestionIndex]);

}

function timer() { //begin the timer
    let timerInterval = setInterval(function () {

        timeEl.textContent = secondsLeft + " seconds left.";
        secondsLeft--;

        if (secondsLeft <= -1) { //moved from 0 to -1 do display would count down to 1, moved from === to <= so that it can't go negative
            clearInterval(timerInterval);
            timeEl.textContent = "times up!"
            finalScore = (score * 3) + secondsLeft + 1  //sums up score and time for a final score
            finalScoreEl.innerText = 'Your score is: ' + finalScore;
            startButton.innerText = 'restart'
            startButton.classList.remove('hide')
            questionContainerElement.classList.add('hide')
            gameOverEl.classList.remove('hide')
        }
        if (currentQuestionIndex == Questions.length) {
            clearInterval(timerInterval); //timer stops now
            finalScore = (score * 3) + secondsLeft + 1  //sums up score and time for a final score
            finalScoreEl.innerText = 'Your score is: ' + finalScore;

        }


    }, 1000);
}


username.addEventListener("keyup", () => { //if there is text in the username box, save score button is enabled
    saveScoreButton.disabled = !username.value
});


saveHighScore = e => {
    e.preventDefault(); //stops page from refreshing automatically, might not need
    const playerScore = {
        score: finalScore,
        name: username.value
    }
    highScores.push(playerScore)
    highScores.sort((a, b) => {
        return parseInt(b.score) - parseInt(a.score);
    })
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    printHighScores();
    gameOverEl.classList.add('hide');
    submittedEl.classList.remove('hide')
    username.value = ""
};
function printHighScores() {
    highScoresList.innerHTML = ""
    highScores.map(score => {
        // console.log('<li>${score.name}-${score.score}</li>');
        var li = document.createElement('li')
        li.innerHTML = score.name + " - " + score.score
        highScoresList.appendChild(li)
    });
};

function resetState() {
    clearStatusClass(document.body)
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    }
}
function showQuestion(question) {
    questionsEl.innerText = question.question

    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
            // console.log(score)
        }
        button.addEventListener('click', selectAnswer)
        answerButtonEl.appendChild(button)
    })
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    currentQuestionIndex++;
    answerButtonEl.disabled;

    if (Questions.length > currentQuestionIndex) { //checks for more questions
        // if (currentQuestionIndex + 1 <= Questions.length ) { //checks for more questions

        setTimeout(() => {

            answerButtonEl.disabled = true;

            setNextQuestion();
        }, 500); //set time between questions

    }
    else {
        setTimeout(() => { //if the questions run out this happens
            startButton.innerText = 'restart'
            startButton.classList.remove('hide')
            questionContainerElement.classList.add('hide')
            gameOverEl.classList.remove('hide')

            clearInterval(timerInterval); //added here to try to stop the timer when questions run out
            resetState()

        }, 750); //set time between questions
    }
    if (selectedButton.dataset = correct) {
        score++; //tried moving ++ before to make it increment before displaying
    }
    else {
        secondsLeft -= 2 //subtracting for wrong answers

    }

    // document.getElementById('right-answers').innerHTML = score; //moved to the bottom of the function, because it was not incrimenting correct

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}



const Questions = [
    {
        question: 'what is 2 + 2',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'what is 2 + 8',
        answers: [
            { text: '10', correct: true },
            { text: '22', correct: false },
            { text: '92', correct: false },
            { text: '29', correct: false }
        ]
    },
    {
        question: 'what is 2 + 20',
        answers: [
            { text: '22', correct: true },
            { text: '6', correct: false }
        ]
    },
    {
        question: 'what is 2 + 2',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    }
]