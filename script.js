const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Machine Language",
            "None of the above"
        ],
        correct: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        correct: 2
    },
    {
        question: "Which language is used for web interactivity?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz-container");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;
    optionsEl.innerHTML = "";

    current.options.forEach((option, index) => {
        const div = document.createElement("div");
        div.classList.add("option");

        div.innerHTML = `
            <input type="radio" name="option" value="${index}">
            ${option}
        `;
        optionsEl.appendChild(div);
    });
}

function getSelectedAnswer() {
    const options = document.getElementsByName("option");
    for (let option of options) {
        if (option.checked) {
            return parseInt(option.value);
        }
    }
    return null;
}

nextBtn.addEventListener("click", () => {
    const selected = getSelectedAnswer();

    if (selected === null) {
        alert("Please select an answer!");
        return;
    }

    if (selected === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;

    if (score === quizData.length) {
        messageEl.textContent = "Excellent!";
    } else if (score >= quizData.length / 2) {
        messageEl.textContent = "Good Job!";
    } else {
        messageEl.textContent = "Try Again!";
    }
}

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    loadQuestion();
});

// Initialize quiz
loadQuestion();