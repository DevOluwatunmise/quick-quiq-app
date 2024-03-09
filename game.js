// Get Element with DOM --> create an array of question.
const question = document.getElementById("question");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const game = document.getElementById("game");
const loader = document.getElementById("loader");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [];

fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then((res) => {
    return res.json();
  })
  .then((loadingQuestions) => {
    // questions = loadingQuestions
    questions = loadingQuestions.results.map((loadingQuestion) => {
      const formattedQuestion = {
        question: loadingQuestion.question,
      };

      const answerChoices = [...loadingQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.question - 1,
        0,
        loadingQuestion.correct_answer
      );

      answerChoices.forEach((choice, i) => {
        formattedQuestion["choice" + (i + 1)] = choice;
      });

      return formattedQuestion;
    });

    startGame();
  })
  .catch((err) => {
    console.log(err);
  });

const CORRECT_BONUS = 10;
const MAX_QUESTION = 7;

//START QUIZ

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestion = [...questions];
  // console.log(availableQuestion);
  

  game.classList.remove("hidden");
  loader.classList.add("hidden");
  getNewQuestion();
};

const getNewQuestion = () => {
  if (availableQuestion.length === 0 || questionCounter >= MAX_QUESTION) {
    localStorage.setItem("mostRecentScore", score); // moseRecentScore will be the key and score will be the value
    return window.location.assign("./end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTION} `;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestion.length);
  currentQuestion = availableQuestion[questionIndex];
  question.innerText = currentQuestion.question;
  // console.log(currentQuestion);

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestion.splice(questionIndex, 1);
  acceptingAnswer = true;
};

// always use preventdefault anytime u add addEventListener,
// cos if it is clicked anytime u add addevent it wil reload the page
// so preventdefault wont all the page to be reloaded when clicked

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    // to add event to the choices so thst when click it will go to the nect question
    e.preventDefault();

    if (!acceptingAnswer) return;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "inCorrect";

    if (classToApply == "correct") {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

// startGame();
