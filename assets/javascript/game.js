// call all id's form html file
const start = document.getElementById("start");
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
const restart = document.getElementById("restart");



// question add using array in array i used odjects
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


//Empty variables to store values later
let runningQuestion = 0;
let TIMER;


//Counter Variables
let count = 0;
let score = 0;
let wrong = 0;
// give 10sec to each question
const questionTime = 10;
// assign the width of guage
const gaugeWidth = 150; // 150px



// defined last question index value
const lastQuestion = questions.length - 1;
//gaugeunit value
const gaugeUnit = gaugeWidth / questionTime;



//assign the value of question
function renderQuestion() {
    let q = questions[runningQuestion];
    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
};


// greeting message
var today = new Date()
var curHr = today.getHours()
// greeting  message changed with time
if (curHr >= 0 && curHr < 6) {
    message.innerHTML = 'What are you doing that early?';
} else if (curHr >= 6 && curHr <= 12) {
    message.innerHTML = 'Good Morning';
} else if (curHr >= 12 && curHr < 17) {
    message.innerHTML = 'Good Afternoon';
} else {
    message.innerHTML = 'Good Evening';
}



// start quiz
start.addEventListener("click", startQuiz);
function startQuiz() {
    // when start button click it changed the property of start and message to invisible
    start.style.display = "none";
    message.style.display = "none";
    renderQuestion();
    //change quiz and heading to visible
    quiz.style.display = "block";
    heading.style.display = "block";
    renderProgress();
    timeCounter();
    // set time one second is equal to 1000ms
    TIMER = setInterval(timeCounter, 1000);
};



//  progress function
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
};



// counter start here
function timeCounter() {
    // if count less than or equal to question time then we add text in counter and increase the width of guage
    if (count <= questionTime) {
        counter.textContent = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }
    // if count =0 then
    else {
        count = 0;
        // call awser is wrong function
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score board
            clearInterval(TIMER);
            scoreRender();
        }
    }
};



// checkAnwer is coorect or not by comparing with correct in question array's objects

function checkAnswer(answer) {
    // answer is correct
    if (answer == questions[runningQuestion].correct) {
        // add 1 to score 
        score++;
        answerIsCorrect();
    }
    // answer is wrong
    else {
        // add 1 to wrong 
        wrong++
        answerIsWrong();
    }
    // after checking anwser is correct or not then we assign count zero 
    count = 0;
    // if it isn't last question then run next question
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
};



// answer is correct
function answerIsCorrect() {
    // add text content in correct
    correct.textContent = "correct :" + score;
}


// answer is Wrong
function answerIsWrong() {
    // add text content in incorrect
    incorrect.textContent = "incorrect :" + wrong + " ";
}



// score board
function scoreRender() {
    // block score to display the borad visible
    scoreDiv.style.display = "block";
    quiz.style.display = "none";
    heading.textContent = "Result";
    //use prompt used to enter the name
    var name = prompt("write your full name");


    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "assets/image/5.png" :
        (scorePerCent >= 60) ? "assets/image/4.png" :
            (scorePerCent >= 40) ? "assets/image/3.png" :
                (scorePerCent >= 20) ? "assets/image/2.png" :
                    "assets/image/1.png";
    // add some inner html in scoreDiv which is display on the score board 
    scoreDiv.innerHTML += "<img src=" + img + ">";
    scoreDiv.innerHTML += "<header>" + name + "</header > ";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}



// add background image on body
document.body.style.backgroundImage = "url('assets/image/bg.png')";
// add text color of mesage, heading and start button
message.style.color = "white";
heading.style.color = "white";
start.style.color = "red";

