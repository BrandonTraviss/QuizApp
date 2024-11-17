//Questions (Edit this to change quetsions)
const questions = [
  {
    question:
      "Inside which HTML element do we put the reference to our .js file",
    answers: [
      { text: "<js>", correct: false },
      { text: "<scripting>", correct: false },
      { text: "<script>", correct: true },
      { text: "<javascript>", correct: false },
    ],
  },
  {
    question: `What is the correct JavaScript syntax to change the content of the HTML element <br> &ltp id="demo">This is a demonstration.&lt/p>?`,
    answers: [
      {
        text: `document.GetElement("p").innterHTML = "Hello World!";`,
        correct: false,
      },
      {
        text: `document.GetElementById("demo").innterHTML = "Hello World!";`,
        correct: true,
      },
      {
        text: `document.GetElementByName("p").innterHTML = "Hello World!";`,
        correct: false,
      },
      {
        text: `#demo.innerHTML = "Hello World!";`,
        correct: false,
      },
    ],
  },
  {
    question: `What is the correct syntax for referring to an external script called "xxx.js"?`,
    answers: [
      {
        text: `<script name="xxx.js"></script>`,
        correct: false,
      },
      {
        text: `<script href="xxx.js></script>`,
        correct: false,
      },
      {
        text: `<script src="xxx.js"></script>`,
        correct: true,
      },
      {
        text: `None of the Above`,
        correct: false,
      },
    ],
  },
  {
    question: `The external JavaScript file must contain the &ltscript> tag.`,
    answers: [
      {
        text: `True`,
        correct: false,
      },
      {
        text: `False`,
        correct: true,
      },
    ],
  },
  {
    question: `How do you write "Hello World" in an alert box?`,
    answers: [
      {
        text: `msgBox("Hello World);`,
        correct: false,
      },
      {
        text: `alert("Hello World");`,
        correct: true,
      },
      {
        text: `alertBox("Hello World");`,
        correct: false,
      },
      {
        text: `msg("Hello World);`,
        correct: false,
      },
    ],
  },
  {
    question: `How do you create a function in JavaScript?`,
    answers: [
      {
        text: `function myFunction(){}`,
        correct: false,
      },
      {
        text: `const function = (params) => {}`,
        correct: false,
      },
      {
        text: `Both are correct.`,
        correct: true,
      },
    ],
  },
  {
    question: `How do you call a function named "myFunction"?`,
    answers: [
      {
        text: `myFunction()`,
        correct: true,
      },
      {
        text: `call function myFunction()`,
        correct: false,
      },
      {
        text: `call myFunction()`,
        correct: false,
      },
    ],
  },
  {
    question: `How to write an IF statement in JavaScript?`,
    answers: [
      {
        text: `if (i === 5) {}`,
        correct: true,
      },
      {
        text: `if i = 5 then`,
        correct: false,
      },
      {
        text: `if (i == 5) then`,
        correct: false,
      },
      {
        text: `if (i == 5) then {}`,
        correct: false,
      },
    ],
  },
  {
    question: `How to write an IF statement for executing some code if "i" is NOT equal to 5?`,
    answers: [
      {
        text: `if (i != 5) {}`,
        correct: true,
      },
      {
        text: `if i != 5 then`,
        correct: false,
      },
      {
        text: `if (i !== 5) then`,
        correct: false,
      },
      {
        text: `if (i !=== 5) then {}`,
        correct: false,
      },
    ],
  },
  {
    question: `How does a WHILE loop start?`,
    answers: [
      {
        text: `while (i<=10) {}`,
        correct: true,
      },
      {
        text: `while (i <=10; i++) {}`,
        correct: false,
      },
      {
        text: `while (i=10) do {}`,
        correct: false,
      },
    ],
  },
  {
    question: `How does a FOR loop start?`,
    answers: [
      {
        text: `for(let i=10; i<=5) {}`,
        correct: false,
      },
      {
        text: `for (let i=10, i++) {}`,
        correct: false,
      },
      {
        text: `for(let i=0; i < 5; i++) {}`,
        correct: true,
      },
    ],
  },
];
//DOM element constants
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

//Start Quiz functtion
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
//showQuestion function, changes DOM
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", (e) => {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";
      if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
      } else {
        selectedBtn.classList.add("incorrect");
      }
      Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });
      nextButton.style.display = "block";
    });
  });
}

function showScore() {
  resetState();
  questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerText = `Restart`;
  nextButton.style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    nextQuestion();
  } else {
    startQuiz();
  }
});

startQuiz();
