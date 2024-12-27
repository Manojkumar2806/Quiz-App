let para = document.getElementById('para');
let startBtn = document.getElementById("startBtn");


let quizArray = [{
        id: 1,
        question: "1. What is the keyword used to define a function in Python?",
        options: ["function", "def", "func", "lambda"],
        answer: "def"
    },
    {
        id: 2,
        question: "2. True or False: Python is an interpreted language.",
        options: ["True", "False"],
        answer: "True"
    },
    {
        id: 3,
        question: "3. Which symbol is used to comment a single line in Python?",
        options: ["//", "#", "/*", "--"],
        answer: "#"
    },
    {
        id: 4,
        question: "4. Which of these data types is immutable in Python?",
        options: ["List", "Dictionary", "Tuple", "Set"],
        answer: "Tuple"
    },
    {
        id: 5,
        question: "5. What is the output of `len([1, 2, 3])`?",
        options: ["2", "3", "4", "Error"],
        answer: "3"
    },
    {
        id: 6,
        question: "6. Which method is used to add an item to a list in Python?",
        options: ["append()", "add()", "push()", "insert()"],
        answer: "append()"
    },
    {
        id: 7,
        question: "7. True or False: Python allows multiple inheritance.",
        options: ["True", "False"],
        answer: "True"
    },
    {
        id: 8,
        question: "8. Which keyword is used to handle exceptions in Python?",
        options: ["try", "except", "catch", "finally"],
        answer: "except"
    },
    {
        id: 9,
        question: "9. What does `type(42)` return?",
        options: ["int", "float", "str", "bool"],
        answer: "int"
    },
    {
        id: 10,
        question: "10. True or False: Python is case-sensitive.",
        options: ["True", "False"],
        answer: "True"
    }
];


let quiz_questions_container = document.getElementById("quiz-questions-container");
let nextBtn = document.getElementById("nextBtn");
let currentQuestionIndex = 0;
let score = document.getElementById("score");
let errorpara = document.getElementById("error");
let timerbtn = document.getElementById("timer");
let skiperror = document.getElementById("skippara");
let correct = 0;
let unattempted = 0;

function skipparaError() {
    skiperror.textContent = "Time Up move to next Question";
    skiperror.classList.add("text-danger", "mb-5", "text-bold");
    skiperror.style.fontSize = "20px";
}

function removeskipparaError() {
    skiperror.textContent = "";
}

function showquestion(index) {
    removeskipparaError();
    quiz_questions_container.innerHTML = "";
    let quizblock = quizArray[index];
    let question = quizblock.question;
    let options = quizblock.options;
    let answer = quizblock.answer;
    let optionsContainerId = "optionsContainer" + quizblock.id;

    let quizQuestion = document.createElement("div");
    quiz_questions_container.appendChild(quizQuestion);

    let heading = document.createElement("h4");
    heading.textContent = question;
    quizQuestion.appendChild(heading);

    let optionsContainer = document.createElement("div");
    optionsContainer.class = "optionsContainerId2";
    optionsContainer.id = optionsContainerId;
    quiz_questions_container.appendChild(optionsContainer);

    for (let i = 0; i < options.length; i++) {
        let inputid = "options-" + quizblock.id + "-" + (i + 1);
        let nameGroup = "question-" + quizblock.id;

        let input = document.createElement("input");
        input.classList.add("mr-3");
        input.type = "radio";
        input.id = inputid;
        input.name = nameGroup;
        input.value = options[i];
        optionsContainer.appendChild(input);

        let label = document.createElement("label");
        label.setAttribute("for", inputid);
        label.textContent = options[i];
        optionsContainer.appendChild(label);

        let breakel = document.createElement("br");
        optionsContainer.appendChild(breakel);

    }
    errorpara.textContent = "";
}

let c = 0;

function increaseScore() {
    c += 5;
    score.textContent = c;
}

let widths = 0;

function increaseLine() {
    para.style.backgroundColor = "blue";
    para.style.padding = "3px";
    widths += 10;
    para.style.width = widths + "%";
}



let arr = [];
let unique;


function handleTime() {
    let currentQuizblock = quizArray[currentQuestionIndex];
    let selectedOption = document.querySelector(`input[name="question-${currentQuizblock.id}"]:checked`);

    if (!selectedOption && currentQuestionIndex < quizArray.length - 1) {
        arr.push(quizArray[currentQuestionIndex]);
        currentQuestionIndex++;
        showquestion(currentQuestionIndex);
        startTimer();
        increaseLine();
        unattempted += 1;
    }
    if (currentQuestionIndex === quizArray.length - 1) {
        errorpara.textContent = "";
        quiz_questions_container.innerHTML = `
            <h5 class="text-center">Quiz is finished! Your score is <strong style="color:blue">${c}</strong></h5>
            <div class="dashboard-container">
                <div class="timercontainer1 correct">
                    <h5>Correct</h5>
                    <h6><strong>${correct}</strong></h6>
                </div>
                <div class="timercontainer1 incorrect">
                    <h5>Incorrect</h5>
                    <h6><strong>${10 - correct}</strong></h6>
                </div>
                <div class="timercontainer1 attempted">
                    <h5>Attempted</h5>
                    <h6><strong>${10 - unattempted}</strong></h6>
                </div>
                <div class="timercontainer1 unattempted">
                    <h5>Unattempted</h5>
                    <h6><strong>${unattempted}</strong></h6>
                </div>
            </div>
        `;
        if (correct !== 10 || unattempted !== 0) {
            let showAnsBtn = document.createElement("p");
            showAnsBtn.textContent = "Show Wrong answers >";
            showAnsBtn.classList.add("mb-4", "mt-4", "text-danger");
            showAnsBtn.addEventListener('click', answersfun);
            quiz_questions_container.appendChild(showAnsBtn);
        }

        let restartBtn = document.createElement("button");
        restartBtn.textContent = "Restart Quiz";
        restartBtn.classList.add("btn", "btn-primary", "mt-3", "ms-3");
        restartBtn.addEventListener("click", restartQuiz);
        quiz_questions_container.appendChild(restartBtn);

        restartBtn = document.createElement("button");
        restartBtn.textContent = "Restart Quiz";
        restartBtn.classList.add("btn", "btn-primary", "mt-3", "ms-3", "text-end");
        restartBtn.addEventListener("click", restartQuiz);
        quiz_questions_container.appendChild(restartBtn);

        clearInterval(unique);
        nextBtn.style.display = "none";
        timerbtn.style.display = "none";
        para.style.display = "none";
    }
}

function startTimer() {
    let timer = 20;
    timerbtn.textContent = timer;
    clearInterval(unique);
    unique = setInterval(() => {
        timer -= 1;
        timerbtn.textContent = timer;
        if (timer === 1) {
            skipparaError();
        }
        if (timer === 0) {
            skipparaError();
            removeskipparaError();
            clearInterval(unique);
            handleTime();
        }
    }, 1000);
}
startTimer();

let answersVisible = false;


function answersfun() {
    const container = document.getElementById("answers-container");

    if (answersVisible) {
        container.style.display = "none";
        answersVisible = false;
    } else {

        if (!container) {
            let answersContainer = document.createElement("div");
            answersContainer.classList.add("mt-3", "mb-3");
            answersContainer.id = "answers-container";
            quiz_questions_container.appendChild(answersContainer);

            for (let i of arr) {
                let question = i.question;
                let options = i.options;
                let answer = i.answer;

                let quizQuestions = document.createElement("div");
                answersContainer.appendChild(quizQuestions);

                let heading = document.createElement("h4");
                heading.textContent = question;
                quizQuestions.appendChild(heading);

                let optionsContainer = document.createElement("div");
                optionsContainer.classList.add("optionsContainerId2");
                answersContainer.appendChild(optionsContainer);

                for (let j = 0; j < options.length; j++) {
                    let option = document.createElement("p");
                    option.textContent = options[j];
                    option.style.marginLeft = "20px";


                    if (options[j] === answer) {
                        option.style.color = "green";
                        option.style.fontWeight = "bold";
                    } else {
                        option.style.color = "red";
                    }

                    optionsContainer.appendChild(option);
                }
            }
        } else {
            container.style.display = "block";
        }
        answersVisible = true;
    }
}



function handleNextQuestion() {
    let currentQuizblock = quizArray[currentQuestionIndex];
    let selectedOption = document.querySelector(`input[name="question-${currentQuizblock.id}"]:checked`);

    if (!selectedOption) {
        errorpara.textContent = "Please select the option";
        errorpara.classList.add("text-danger", "mb-3");
        return;
    } else {
        if (selectedOption.value === currentQuizblock.answer) {
            increaseScore();
            correct += 1;
        } else {
            arr.push(quizArray[currentQuestionIndex]);
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < quizArray.length) {
            showquestion(currentQuestionIndex);
            increaseLine();
            startTimer();
        } else {
            clearInterval(unique);
            errorpara.textContent = "";
            quiz_questions_container.innerHTML = `
            <h5 class="text-center">Quiz is finished! Your score is <strong style="color:blue">${c}</strong></h5>
            <div class="dashboard-container">
                <div class="timercontainer1 correct">
                    <h5>Correct</h5>
                    <h6><strong>${correct}</strong></h6>
                </div>
                <div class="timercontainer1 incorrect">
                    <h5>Incorrect</h5>
                    <h6><strong>${10 - correct}</strong></h6>
                </div>
                <div class="timercontainer1 attempted">
                    <h5>Attempted</h5>
                    <h6><strong>${10 - unattempted}</strong></h6>
                </div>
                <div class="timercontainer1 unattempted">
                    <h5>Unattempted</h5>
                    <h6><strong>${unattempted}</strong></h6>
                </div>
            </div>
        `;
            if (correct !== 10 || unattempted !== 0) {
                let showAnsBtn = document.createElement("p");
                showAnsBtn.textContent = "Show Wrong answers >"
                showAnsBtn.classList.add("mb-4", "mt-4", "text-danger")
                showAnsBtn.addEventListener('click', answersfun);
                quiz_questions_container.appendChild(showAnsBtn);
            }

            let restartBtn = document.createElement("button");
            restartBtn.textContent = "Restart Quiz";
            restartBtn.classList.add("btn", "btn-primary", "mt-3", "ms-3", "text-end");
            restartBtn.addEventListener("click", restartQuiz);
            quiz_questions_container.appendChild(restartBtn);

            nextBtn.style.display = "none";
            para.style.display = "none";
            timerbtn.style.display = "none";

        }
    }
}

function restartQuiz() {

    currentQuestionIndex = 0;
    correct = 0;
    unattempted = 0;
    arr = [];
    c = 0;


    quiz_questions_container.innerHTML = "";


    showquestion(currentQuestionIndex);
    increaseLine();
    startTimer();


    nextBtn.style.display = "inline-block";
    para.style.display = "block";
    timerbtn.style.display = "block";


    errorpara.textContent = "";
}


nextBtn.addEventListener('click', handleNextQuestion);
showquestion(currentQuestionIndex);