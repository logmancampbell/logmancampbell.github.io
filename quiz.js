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
        question: "Where can you find the Eiffel Tower?",
        choice1: "Paris",
        choice2: "Lille",
        choice3: "Marseille",
        choice4: "Lyon",
        answer: 1,
    },
    {
        question: "The tallest building in the world is located in which city?",
        choice1: "Dubai",
        choice2: "New York",
        choice3: "Shanghai",
        choice4: "England",
        answer: 1,
    },
    {
        question: "What is the smallest country listed?",
        choice1: "Monaco",
        choice2: "Vatican City",
        choice3: "Luxembourg",
        choice4: "Malta",
        answer: 2,
    },
    {
        question: "In which country is the humble 'thumbs up' considered a great insult?",
        choice1: "China",
        choice2: "Ethiopia",
        choice3: "Iran",
        choice4: "Azerbaijan",
        answer: 3,
    },
    {
        question: "Which lake is famously referred to as the 'Jewel of the Italian Lakes?'",
        choice1: "Lake Como",
        choice2: "Lake Garda",
        choice3: "Lake Iseo",
        choice4: "Lake Orta",
        answer: 1,
    },
    {
        question: "What colours make up the Seychelles flag?",
        choice1: "Green, Blue, Red",
        choice2: "Blue, Green White, Yellow, Red",
        choice3: "Green, White, Red",
        choice4: "Yellow, Red, White, Blue",
        answer: 2,
    },
    {
        question: "Which island group includes Ibiza, Menorca and Majorca?",
        choice1: "Canary Islands",
        choice2: "Balearic Islands",
        choice3: "Galapagos Islands",
        choice4: "Channel Islands",
        answer: 2,
    },
    {
        question: "What was the original purpose of the leaning tower of Pisa?",
        choice1: "As a Pizza Hut",
        choice2: "As a helter skelter ride",
        choice3: "As a beacon",
        choice4: "As a bell tower",
        answer: 4,
    },
    {
        question: "What is the scientific name for the Northern Lights?",
        choice1: "Glowy Sky Lights",
        choice2: "Southern Lights",
        choice3: "Aurora Borealis",
        choice4: "Lighty McLightface",
        answer: 3,
    },
    {
        question: "How many Japanese islands are there?",
        choice1: "3",
        choice2: "27",
        choice3: "186",
        choice4: "6852",
        answer: 4,
    }
]

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    //i there are no questions left in the array...
    if(availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
        //stores the final score of the user into memory to be used in the end.js file
        localStorage.setItem('mostRecentScore', score)
        //opens the end.html file due to there being no questions left
        return window.location.assign('end.html')
    }


    //if there are questions left, program follows through with this code

    //increment question by 1
    questionCounter++
    //questions numbers are updated using the variables below
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    //new variable created or storing a random number from index 0 to how many questions are left 
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    //question displayed on the interface is decided by the random number chosen above
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    //
    choices.forEach(choice => {
        //a varibale that stores the number of the choice that the user makes
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