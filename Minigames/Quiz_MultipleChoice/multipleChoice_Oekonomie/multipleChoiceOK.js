const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const questionText = document.getElementById("question-text");
// const source = document.getElementById("source");
// const audioControls = document.getElementById("audio");

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionText.innerText = question.question;

  // source.setAttribute("src", "../../../Minigames/AudioZuordnen/sounds/Amsel.mp3");

  questionElement.appendChild(questionText);
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Startseite'
    console.log("Finished Game");
    startButton.removeEventListener('click', startGame);
    startButton.addEventListener("click", () => { window.open("../../Startseite/Startseite.html", "_self"); })
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Ein Entnahmebaum...',
    answers: [
      { text: 'soll nicht gefällt werden', correct: false },
      { text: 'ist Erntereif', correct: false },
      { text: 'soll bei der nächsten Durchforstungsmaßnahme gefällt werden', correct: true },
      { text: 'steht am Rand einer Fahrgasse', correct: false },
    ]
  },
  {
    question: 'Ein Gassenrandbaum...',
    answers: [
      { text: 'ist das Zuhause von Eichhörnchen', correct: false },
      { text: 'verbindet zwei Baumgassen miteinander', correct: false },
      { text: 'darf nur parallel gefällt werden', correct: false },
      { text: 'gibt vor wo eine Forstmaschine im Wald fahren darf', correct: true }
    ]
  },
  {
    question: 'Ein Habitatbaum...',
    answers: [
      { text: 'hat eine hohe Bedeutung für die Artenvielfalt', correct: true },
      { text: 'sollte nur im Zick-Zack Schnitt gefällt werden', correct: false },
      { text: 'ist von Holzwürmern befallen', correct: false },
      { text: 'ist ein besonders schief gewachsener Baum', correct: false }
    ]
  },
  {
    question: 'Ein Zukunftsbaum...',
    answers: [
      { text: 'gibt vor, wie jeder Baum in 10 Jahren aussieht', correct: false },
      { text: 'ist ein genetisch veränderter Baum', correct: false },
      { text: 'ist schon älter als 300 Jahre', correct: false },
      { text: 'gehört zu den wertvollsten Bäumen im Bestand', correct: true }
    ]
  }
]