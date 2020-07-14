const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionsEl = document.getElementById('question')
const answerButtonEl = document.getElementById('answer-buttons')

let currentQuestionIndex
let score = 0 ;


startButton.addEventListener('click', startGame)

function startGame() {
    console.log('start game function working')
    startButton.classList.add('hide')
    currentQuestionIndex = 0
    score = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(Questions[currentQuestionIndex]);

}

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
            score++
            button.dataset.correct = answer.correct
            console.log(score)
        }
        button.addEventListener('click', selectAnswer)
        answerButtonEl.appendChild(button)
    })
}

function selectAnswer(e) {
    document.getElementById('right-answers').innerHTML = score;
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (Questions.length > currentQuestionIndex + 1) {
        setTimeout(() => {
            currentQuestionIndex++;
            setNextQuestion();
        }, 750); //set time between questions

    }
    else {
        setTimeout(() => {
            startButton.innerText ='restart'
            startButton.classList.remove('hide')
            resetState()
        }, 750); //set time between questions
    }

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
            { text: '22', correct: false }
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