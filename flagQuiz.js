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
        question: "Which flag has 3 vertical stripes of green, white and green?",
        choice1: "Nigeria",
        choice2: "France",
        choice3: "Ghana",
        choice4: "Spain",
        answer: 1,
    },
    {
        question: "Which country has a red circle with a green background?",
        choice1: "Bangladesh",
        choice2: "Papua New Guinnea",
        choice3: "Japan",
        choice4: "England",
        answer: 1,
    },
    {
        question: "Which country has a triangular shaped flag?",
        choice1: "Switzerland",
        choice2: "Nepal",
        choice3: "Cambodia",
        choice4: "Swaziland",
        answer: 2,
    },
    {
        question: "Which country has the star of david on it?",
        choice1: "China",
        choice2: "Vietnam",
        choice3: "Isreal",
        choice4: "Myanmar",
        answer: 3,
    },
    {
        question: "Which colours make up the Tajikistan flag?",
        choice1: "Red, White, Green, Yellow",
        choice2: "red, White, Black",
        choice3: "Red, White Green, Blue",
        choice4: "Green, Black, White",
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
        question: "What is unique about the Mozambique flag?",
        choice1: "It's not rectangular",
        choice2: "It has an AK-47 on it",
        choice3: "It's the newest national flag",
        choice4: "Mozambique has no national flag",
        answer: 2,
    },
    {
        question: "Which African country has a flag that’s the reverse of the Irish flag?",
        choice1: "Senegal",
        choice2: "Niger",
        choice3: "Eretria",
        choice4: "Cote d'Ivoire",
        answer: 4,
    },
    {
        question: "What do the flags of Albania, Sri Lanka and Kazakhstan all contain?",
        choice1: "Writing",
        choice2: "Books",
        choice3: "Animals",
        choice4: "The colour green",
        answer: 3,
    },
    {
        question: "What can be seen on the Malawi flag?",
        choice1: "A singular circle",
        choice2: "A temple",
        choice3: "A hammer and sickle",
        choice4: "A rising sun",
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