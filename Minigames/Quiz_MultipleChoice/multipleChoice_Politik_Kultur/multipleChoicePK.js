const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

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
  questionElement.innerText = question.question
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
    startButton.addEventListener("click", () => {window.open("../../Startseite/Startseite.html", "_self");})
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
    question: 'Der Wald freut sich, wenn...',
    answers: [
      { text: 'du deinen Müll wieder mit nach Hause nimmst', correct: true },
      { text: 'du laut rumschreist', correct: false },
      { text: 'du deinen Müll auf den Boden wirfst', correct: false },
      { text: 'du mutwillig die Natur zerstörst', correct: false },
    ]
  },
  {
    question: 'Die Tiere freuen sich, wenn...',
    answers: [
      { text: 'dein Hund frei herumläuft und mit ihnen spielt', correct: false },
      { text: 'du die Tiere nicht störst', correct: true },
      { text: 'du probierst sie einzufangen', correct: false },
      { text: 'du Abseits der Wege gehst', correct: false }
    ]
  },
  {
    question: 'Es ist gut für den Wald, wenn...',
    answers: [
      { text: 'du ihn abbrennst', correct: false },
      { text: 'du Beeren/Blätter oder Aste abreißt ', correct: false },
      { text: 'du auf den Wegen bleibst', correct: true },
      { text: 'du mehr Pilze sammelst, als du benötigst', correct: false }
    ]
  },
  {
    question: 'Die Person die sich um den Wald kümmert ist...',
    answers: [
      { text: 'ein/e Förster/in', correct: true },
      { text: 'ein/e Waldmeister/in', correct: false },
      { text: 'ein/e Waldbürgermeister/in', correct: false },
      { text: 'ein/e Gärtner/in', correct: false }
    ]
  },
  {
    question: 'Du bist ein/e Naturschützer/in, wenn...',
    answers: [
      { text: 'du im Wald grillst', correct: false },
      { text: 'du im Wald zeltest', correct: false },
      { text: 'du den Schildern folgst', correct: true },
      { text: 'dir das Bestehen des Waldes egal ist', correct: false }
    ]
  }
]