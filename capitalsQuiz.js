const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

let questions = [
    {
        question: "What is the capital of Argentina?",
        choice1: "Quito",
        choice2: "Santiago",
        choice3: "Caracas",
        choice4: "Buenos Aires",
        answer: 4,
    },
    {
        question: "What is the capital of Thailand?",
        choice1: "hanoi",
        choice2: "Bangkok",
        choice3: "Vientiane",
        choice4: "Phnom Penh",
        answer: 2,
    },
    {
        question: "What is the capital of Turkey?",
        choice1: "Baghdad",
        choice2: "Tehran",
        choice3: "Ankara",
        choice4: "Sophia",
        answer: 3,
    },
    {
        question: "What is the capital of United States?",
        choice1: "California",
        choice2: "Maine",
        choice3: "Washington DC",
        choice4: "New York",
        answer: 3,
    },
    {
        question: "What is the capital of the UK?",
        choice1: "London",
        choice2: "Edinburgh",
        choice3: "Dublin",
        choice4: "Cardiff",
        answer: 1,
    },
    {
        question: "What is the capital of Ukraine?",
        choice1: "Budapest",
        choice2: "Chisinau",
        choice3: "Bucharest",
        choice4: "Kiev",
        answer: 4,
    },
    {
        question: "What is the capital of Norway?",
        choice1: "Oslo",
        choice2: "Reykjavik",
        choice3: "Copenhagen",
        choice4: "Helsinki",
        answer: 1,
    },
    {
        question: "What is the capital of Palau?",
        choice1: "Port Vila",
        choice2: "Tarawa",
        choice3: "Ngerulmud",
        choice4: "Yaren",
        answer: 3,
    },
    {
        question: "What is the capital of Romania?",
        choice1: "Belgrade",
        choice2: "Bucharest",
        choice3: "Brussels",
        choice4: "Baku",
        answer: 2,
    },
    {
        question: "What is the capital of kyrgyzstan?",
        choice1: "Bishkek",
        choice2: "Kabul",
        choice3: "Dushanbe",
        choice4: "Tashkent",
        answer: 1,
    }
]

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply == 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 750)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()