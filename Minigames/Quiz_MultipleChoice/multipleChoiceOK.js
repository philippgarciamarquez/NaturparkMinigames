const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const questionText = document.getElementById("question-text");
// const source = document.getElementById("source");
// const audioControls = document.getElementById("audio");

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', handleLoad)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})



async function handleLoad() {
  let jsonFile = new URLSearchParams(window.location.search).get("json");
  console.log(jsonFile);
  let response = await fetch(jsonFile);
  let json = await response.json();
  data = json;

  startGame(data);
}

function startGame(_data) {
  startButton.classList.add('hide')
  shuffledQuestions = _data.sort(() => Math.random() - .5)
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