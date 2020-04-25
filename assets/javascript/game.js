const start = document.getElementById("start");
const heading = document.getElementById("heading");
const message = document.getElementById("message");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const btimeGauge = document.getElementById("btimeGauge");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const correct = document.getElementById("correct");
const incorrect = document.getElementById("incorrect");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {
        question: "1. A piece of ice is dropped in a vesel containing kerosene. When ice melts, the level of kerosene will",
        imgSrc: "assets/image/ice.png",
        choiceA: "A. Rise",
        choiceB: "B.Fall",
        choiceC: "C.Remain Same",
        correct: "B"
    }, {
        question: "2. Young's modulus is the property of",
        imgSrc: "assets/image/young.png",
        choiceA: "A.Liquid only",
        choiceB: "B.Gas only",
        choiceC: "C.Solid only",
        correct: "C"
    }, {
        question: "3. Joule is the unit of:",
        imgSrc: "assets/image/joule.png",
        choiceA: "A.Temperature",
        choiceB: "B.Pressure",
        choiceC: "C.Energy",
        correct: "C"
    }, {
        question: "4. What is the scale used for measuring the intensity of the earthquake?",
        imgSrc: "assets/image/earthquake.png",
        choiceA: "A.Metric Scale",
        choiceB: "B.Richter Scale",
        choiceC: "C.Quake Scale",
        correct: "B"
    }

];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
let wrong = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    message.style.display = "none";

    renderQuestion();
    quiz.style.display = "block";
    heading.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// greeting message
var today = new Date()
var curHr = today.getHours()

if (curHr >= 0 && curHr < 6) {
    message.innerHTML = 'What are you doing that early?';
} else if (curHr >= 6 && curHr <= 12) {
    message.innerHTML = 'Good Morning';
} else if (curHr >= 12 && curHr < 17) {
    message.innerHTML = 'Good Afternoon';
} else {
    message.innerHTML = 'Good Evening';
}
// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        wrong++
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    correct.textContent = "correct :" + score;

}

// answer is Wrong
function answerIsWrong() {
    incorrect.textContent = "incorrect :" + wrong;
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";
    quiz.style.display = "none";
    heading.textContent = "Result";


    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "assets/image/5.png" :
        (scorePerCent >= 60) ? "assets/image/4.png" :
            (scorePerCent >= 40) ? "assets/image/3.png" :
                (scorePerCent >= 20) ? "assets/image/2.png" :
                    "assets/image/1.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";

}
// change the baclground color 

document.body.style.backgroundColor = `lightgrey`;
