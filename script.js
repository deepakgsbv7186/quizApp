import data from "./quizData.js";
// console.log(data);
const quizScreen = document.querySelector(".quiz");
const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const submit = document.querySelector(".submit");
const scoreScreen = document.querySelector(".score");
const play = document.querySelector(".playagain");

let qIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let selectedAnswer;

// reset game
const resetQuiz = () => {
  qIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  showQuestion(qIndex);
};
// reset event listen
play.addEventListener("click", () => {
  resetQuiz();
  scoreScreen.style.display = "none";
  quizScreen.style.display = "block";
});

// display result
const showResult = () => {
  scoreScreen.style.display = "block";
  quizScreen.style.display = "none";
  scoreScreen.querySelector(
    ".correct"
  ).textContent = `Correct Answers: ${correctCount}`;
  scoreScreen.querySelector(
    ".wrong"
  ).textContent = `Wrong Answers: ${wrongCount}`;
  scoreScreen.querySelector(".totalScore").textContent = `Score : ${
    (correctCount - wrongCount) * 10
  }`;
};
// display question
const showQuestion = (qNumber) => {
  if (qIndex === data.length) return showResult();
  selectedAnswer = null;
  question.textContent = data[qNumber].question;
  answersContainer.innerHTML = data[qNumber].answers
    .map(
      (item, index) =>
        `
        <div class="answer">
            <input name="answer" type="radio" id="${index}" value="${item.isCorrect}"/>
            <label for="${index}">${item.answer}</label>
        </div>
    `
    )
    .join("");
  selectAnswer();
};

const selectAnswer = () => {
  answersContainer.querySelectorAll("input").forEach((el) => {
    el.addEventListener("click", (e) => {
      selectedAnswer = e.target.value;
    });
  });
};

const submitAnswer = () => {
  submit.addEventListener("click", () => {
    if (selectedAnswer !== null) {
      selectedAnswer === "true" ? correctCount++ : wrongCount++;
      qIndex++;
      showQuestion(qIndex);
    } else {
      alert("please select answer first then submit...");
      return;
    }
  });
};

showQuestion(qIndex);
submitAnswer();
