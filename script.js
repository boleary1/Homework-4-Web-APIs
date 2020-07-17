const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionsEl = document.getElementById('question')
const answerButtonEl = document.getElementById('answer-buttons')
const rulesEl = document.getElementById('rules')
const gameOverEl = document.getElementById('gameOver')
const timeEl = document.querySelector(".time");
const username = document.getElementById('usernameText');
const saveScoreButton = document.getElementById('submit-btn');
let currentQuestionIndex;
let score;
let secondsLeft;
let finalScore;
let timerInterval; // added here to try to stop the timer when questions run out

startButton.addEventListener('click', startGame)

function startGame() {

    startButton.classList.add('hide')
    currentQuestionIndex = 0
    score = 0
    secondsLeft = 10
    timer()
    questionContainerElement.classList.remove('hide')
    rulesEl.classList.add('hide')
    gameOverEl.classList.add('hide')
    setNextQuestion()

}

function setNextQuestion() {
    resetState()
    showQuestion(Questions[currentQuestionIndex]);

}

function timer() { //begin the timer
    let timerInterval = setInterval(function () {

        timeEl.textContent = secondsLeft + " seconds left.";
        secondsLeft--;

        if (secondsLeft === -1) { //moved from 0 to -1 do display would count down to 1
            clearInterval(timerInterval);
            timeEl.textContent = "times up!"
        }
        if (currentQuestionIndex == Questions.length - 1) {
            console.log('out of questions')
            clearInterval(timerInterval); //timer stops now
            finalScore = (score * 3) + secondsLeft + 2 //sums up score and time for a final score
            console.log("final score: ", finalScore);

        }


    }, 1000);
}

username.addEventListener("keyup", () => {
    saveScoreButton.disabled = !username.value
});

saveHighScore = e => {
    e.preventDefault(); //stops page from refreshing automatically, might not need
    console.log("submit button")
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
    if (Questions.length > currentQuestionIndex + 1) { //checks for more questions
        setTimeout(() => {
            currentQuestionIndex++;
            setNextQuestion();
        }, 500); //set time between questions

    }
    else {
        setTimeout(() => { //if the questions run out this happens
            startButton.innerText = 'restart'
            startButton.classList.remove('hide')
            questionContainerElement.classList.add('hide')
            gameOverEl.classList.remove('hide')

            // console.log('I want the timer to stop now')
            // clearInterval(timerInterval); //added here to try to stop the timer when questions run out
            resetState()

        }, 750); //set time between questions
    }
    if (selectedButton.dataset = correct) {
        score++; //tried moving ++ before to make it increment before displaying
    }
    else {
        secondsLeft -= 2 //subtracting for wrong answers
        console.log('timecheck', secondsLeft)

    }

    document.getElementById('right-answers').innerHTML = score; //moved to the bottom of the function, because it was not incrimenting correct

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