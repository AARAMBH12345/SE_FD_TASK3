const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "What is 2 + 2 * 2?",
    options: ["6", "8", "4", "10"],
    answer: "6"
  },
  {
    question: "What language runs in the browser?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Transfer Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "None"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which is used to style websites?",
    options: ["HTML", "CSS", "Python", "Java"],
    answer: "CSS"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const introScreen = document.getElementById('intro-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const questionNumber = document.getElementById('question-number');
const timerDisplay = document.getElementById('timer');

const scoreDisplay = document.getElementById('score');
const totalDisplay = document.getElementById('total');

startBtn.onclick = () => {
  introScreen.classList.remove('active');
  quizScreen.classList.add('active');
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
};

nextBtn.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
};

restartBtn.onclick = () => {
  resultScreen.classList.remove('active');
  introScreen.classList.add('active');
};

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  nextBtn.disabled = true;

  const current = questions[currentQuestionIndex];
  questionText.textContent = current.question;
  questionNumber.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
  optionsList.innerHTML = '';

  current.options.forEach(opt => {
    const li = document.createElement('li');
    li.textContent = opt;
    li.classList.add('option');
    li.onclick = () => selectOption(li, current.answer);
    optionsList.appendChild(li);
  });

  timerDisplay.textContent = `${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      lockOptions();
      nextBtn.disabled = false;
    }
  }, 1000);
}

function selectOption(selected, correctAnswer) {
  clearInterval(timer);
  const options = document.querySelectorAll('.option');
  options.forEach(opt => opt.style.pointerEvents = 'none');

  if (selected.textContent === correctAnswer) {
    selected.classList.add('correct');
    score++;
  } else {
    selected.classList.add('wrong');
    options.forEach(opt => {
      if (opt.textContent === correctAnswer) {
        opt.classList.add('correct');
      }
    });
  }

  nextBtn.disabled = false;
}

function lockOptions() {
  const options = document.querySelectorAll('.option');
  options.forEach(opt => {
    opt.style.pointerEvents = 'none';
  });
}

function showResults() {
  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');
  scoreDisplay.textContent = score;
  totalDisplay.textContent = questions.length;
}
