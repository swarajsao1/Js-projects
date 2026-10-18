let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questions = [
  {
    text: "What is the capital of France?",
    options: ["London", "Paris", "Rome", "Berlin"],
    correctAnswer: "Paris"
  },
  {
    text: "What is 5 + 3?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8"
  },
  {
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    correctAnswer: "Mars"
  }
];

let elapsedSeconds = 0;
let timerInterval;

function startTimer() {
  clearInterval(timerInterval);

  elapsedSeconds = 0;
  document.getElementById("timer").textContent =
    `Time: ${elapsedSeconds} seconds`;

  timerInterval = setInterval(function () {
    elapsedSeconds++;

    document.getElementById("timer").textContent =
      `Time: ${elapsedSeconds} seconds`;
  }, 1000);
}


const questionElement = document.getElementById("question-text");

const answerButtons = document.getElementById("answer-buttons");

const feedbackText = document.getElementById("feedback");

const progressElement = document.getElementById("progress");

const nextButton = document.getElementById("next-button");

function showQuestion (){
  const current = questions[currentQuestion];


  progressElement.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionElement.textContent = current.text;
  feedbackText.textContent = "";
  answerButtons.replaceChildren();
  feedbackText.classList.remove(
  "feedback-correct",
  "feedback-incorrect");

  current.options.forEach(function (option) {
    const button = document.createElement("button");

    button.textContent = option;
    answerButtons.appendChild(button);

    button.addEventListener("click", function () {

      if (option === questions[currentQuestion].correctAnswer) {
        feedbackText.textContent = "Correct!";
        score = score + 1;
        feedbackText.classList.add("feedback-correct");
      } else {
          feedbackText.textContent =
             `Incorrect! The correct answer is ${current.correctAnswer}.`;
        feedbackText.classList.add("feedback-incorrect");
      }

      const buttons = answerButtons.querySelectorAll("button");
      buttons.forEach(function (answerButtons) {
        answerButtons.disabled = true;
      });
      button.classList.add("selected");

      console.log(score);
      nextButton.disabled = false;
    });
  });
}


nextButton.addEventListener("click", function () {
  if (currentQuestion < questions.length - 1) {
    currentQuestion = currentQuestion + 1;
    showQuestion();
  } else {
    showResult();
  }
});

const resultElement = document.getElementById("result");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");


function showResult () {
  clearInterval(timerInterval);
  progressElement.hidden = true;
  document.getElementById("question-text").hidden = true;
  answerButtons.hidden = true;
  feedbackText.hidden = true;
  nextButton.hidden = true;
  submitButton.hidden = true;
  startButton.hidden = true;

  const percentage = Math.round(
  (score / questions.length) * 100
  );

  finalScore.textContent =
  `You scored ${score} out of ${questions.length} (${percentage}%).`;
  resultElement.hidden = false;

  let performanceMessage;

  if (percentage === 100) {
    performanceMessage = "Perfect score! Excellent work!";
  } else if (percentage >= 60) {
    performanceMessage = "Good job! Keep practising.";
  } else {
    performanceMessage = "Keep learning. Try again!";
  }

  finalScore.textContent += `${performanceMessage}`;
}

restartButton.addEventListener("click", function () {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;

  clearInterval(timerInterval);
  elapsedSeconds = 0;

  document.getElementById("timer").textContent =
    "Time: 0 seconds";

  resultElement.hidden = true;
  progressElement.hidden = true;
  questionElement.hidden = true;
  answerButtons.hidden = true;
  feedbackText.hidden = true;
  nextButton.hidden = true;
  submitButton.hidden = true;

  startButton.hidden = false;
});


const submitButton = document.getElementById("submit-button");
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", function () {
  startButton.hidden = true;
  submitButton.hidden = false;
  nextButton.hidden = false;

  showQuestion();
  startTimer();
});

submitButton.addEventListener("click", function () {
  clearInterval(timerInterval);
  answerButtons.replaceChildren();
  showResult();
});





