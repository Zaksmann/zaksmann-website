// Topics and quizzes for each topic
const topics = [
  { name: "Mathematics", quiz: [
    { question: "What is 2 + 2?", options: [4, 3, 5], correct: 4 },
    { question: "What is 5 * 3?", options: [15, 10, 20], correct: 15 }
  ]},
  { name: "Science", quiz: [
    { question: "What planet is known as the Red Planet?", options: ["Mars", "Earth", "Jupiter"], correct: "Mars" },
    { question: "What is H2O commonly known as?", options: ["Water", "Hydrogen", "Oxygen"], correct: "Water" }
  ]},
];

// Variables to track current topic and question
let currentTopic = null;
let currentQuestionIndex = 0;

// Load topics on the Topics Page
const topicsList = document.getElementById("topics");
topics.forEach((topic, index) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<button onclick="startQuiz(${index})">${topic.name}</button>`;
  topicsList.appendChild(listItem);
});

// Start quiz for the selected topic
function startQuiz(topicIndex) {
  currentTopic = topics[topicIndex];
  currentQuestionIndex = 0;
  document.getElementById("quiz-topic").textContent = `Quiz: ${currentTopic.name}`;
  document.getElementById("topic-list").classList.add("hidden");
  document.getElementById("quiz-section").classList.remove("hidden");
  loadQuestion();
}

// Load a question and options
function loadQuestion() {
  const questionData = currentTopic.quiz[currentQuestionIndex];
  document.getElementById("question").textContent = questionData.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  questionData.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(button);
  });

  document.getElementById("feedback").textContent = "";
  document.getElementById("next-btn").classList.add("hidden");
}

// Check the user's answer and give feedback
function checkAnswer(selectedAnswer) {
  const correctAnswer = currentTopic.quiz[currentQuestionIndex].correct;
  const feedbackDiv = document.getElementById("feedback");

  if (selectedAnswer === correctAnswer) {
    feedbackDiv.textContent = "Correct!";
    feedbackDiv.className = "feedback correct";
  } else {
    feedbackDiv.textContent = "Incorrect. Try again!";
    feedbackDiv.className = "feedback incorrect";
  }

  // Show "Next Question" button after answer
  document.getElementById("next-btn").classList.remove("hidden");
}

// Move to the next question or finish quiz
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentTopic.quiz.length) {
    loadQuestion();
  } else {
    alert("Quiz complete! Returning to Topics.");
    returnToTopics();
  }
}

// Return to the Topics Page
function returnToTopics() {
  document.getElementById("topic-list").classList.remove("hidden");
  document.getElementById("quiz-section").classList.add("hidden");
}
