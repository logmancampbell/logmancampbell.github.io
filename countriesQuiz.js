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
        question: "In which country is the national animal a Unicorn?",
        choice1: "Scotland",
        choice2: "Wales",
        choice3: "England",
        choice4: "North Korea",
        answer: 1,
    },
    {
        question: "What country is not landlocked?",
        choice1: "San Marino",
        choice2: "Vatican City",
        choice3: "Lesotho",
        choice4: "Eritrea",
        answer: 4,
    },
    {
        question: "What country has the most lakes?",
        choice1: "Scotland",
        choice2: "United States",
        choice3: "Canada",
        choice4: "Brazil",
        answer: 3,
    },
    {
        question: "Which country is surrounded by 14 countries?",
        choice1: "Brazil",
        choice2: "China",
        choice3: "UAE",
        choice4: "New Zealand",
        answer: 2,
    },
    {
        question: "What country borders Namibia, Botswana, Zimbabwe, Mozambique, Swaziland, and Lesotho?",
        choice1: "South Africa",
        choice2: "Nigeria",
        choice3: "Ghana",
        choice4: "Central African Republic",
        answer: 1,
    },
    {
        question: "which countries' tradional robes are called kimonos?",
        choice1: "Japan",
        choice2: "China",
        choice3: "South Korea",
        choice4: "Thailand",
        answer: 1,
    },
    {
        question: "Which of these is not a country?",
        choice1: "Niue",
        choice2: "Jascasal",
        choice3: "Palau",
        choice4: "Nauru",
        answer: 2,
    },
    {
        question: "What country is called 'Land of Fire and Ice'?",
        choice1: "Scotland",
        choice2: "Canada",
        choice3: "Australia",
        choice4: "Iceland",
        answer: 4,
    },
    {
        question: "Which country calls 'Beer', 'öl'?",
        choice1: "Germany",
        choice2: "Norway",
        choice3: "Sweden",
        choice4: "Poland",
        answer: 3,
    },
    {
        question: "If you called spaghetti, noodles, which country would be the most offended?",
        choice1: "Italy",
        choice2: "China",
        choice3: "Japan",
        choice4: "England",
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