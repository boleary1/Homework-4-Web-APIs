const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')

const questionsEl = document.getElementById('question')
const answerButtonEl = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () =>{
    currrentQuestionIndex++
    setNextQuestion()
})

function startGame() {
console.log('start game function working')
startButton.classList.add('hide')
shuffledQuestions = questions.sort(() => Math.random()-.5)
currentQuestionIndex = 0
questionContainerElement.classList.remove('hide')
setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);

}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild (answerButtonEl.firstChild)
    }
}
function showQuestion (question){
    questionsEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct
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
    if (shuffledQuestions.length > currentQuestionIndex + 1){
    nextButton.classList.remove('hide')
} else{
    startButton.innerText ('restart')
    startButton.classList.remove('hide')
}

}

function setStatusClass (element, correct) {
    clearStatusClass(element)
    if(correct) {
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

const questions = [
    {
        question: 'what is 2 + 2',
        answers: [
            {text: '4', correct: true },
            {text: '22' , correct: false}
        ]
    },
    {
        question: 'what is 2 + 8',
        answers: [
            {text: '10', correct: true },
            {text: '22' , correct: false}
        ]
    },
    {
        question: 'what is 2 + 20',
        answers: [
            {text: '22', correct: true },
            {text: '6' , correct: false}
        ]
    },
    {
        question: 'what is 2 + 2',
        answers: [
            {text: '4', correct: true },
            {text: '22' , correct: false}
        ]
    }
]