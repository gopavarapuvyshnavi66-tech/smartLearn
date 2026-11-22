
/* =====================================================
   SMARTLEARN ASSESSMENT
===================================================== */


/* =====================================================
   AUTHENTICATION
===================================================== */

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


if (!currentUser || currentUser.role !== "student") {

    window.location.href = "index.html";

}


/* =====================================================
   QUESTIONS
===================================================== */

const questions = [

    {
        topic: "Arrays",

        question:
            "What is the time complexity of accessing an element in an array using its index?",

        options: [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n²)"
        ],

        answer: 0
    },


    {
        topic: "Arrays",

        question:
            "Which technique is commonly used to find two numbers whose sum equals a target in a sorted array?",

        options: [
            "Recursion",
            "Two Pointers",
            "DFS",
            "Backtracking"
        ],

        answer: 1
    },


    {
        topic: "Strings",

        question:
            "Which data type is commonly used in Java to store a sequence of characters?",

        options: [
            "String",
            "Character",
            "Boolean",
            "Integer"
        ],

        answer: 0
    },


    {
        topic: "Strings",

        question:
            "What is the main purpose of StringBuilder in Java?",

        options: [
            "Store integers",
            "Create immutable strings",
            "Modify strings efficiently",
            "Sort strings"
        ],

        answer: 2
    },


    {
        topic: "Linked Lists",

        question:
            "Which pointer is commonly used to traverse a linked list?",

        options: [
            "Head pointer",
            "Tail pointer only",
            "Root pointer",
            "Index pointer"
        ],

        answer: 0
    },


    {
        topic: "Linked Lists",

        question:
            "What is the time complexity of inserting a node at the beginning of a linked list when the head is known?",

        options: [
            "O(n)",
            "O(log n)",
            "O(1)",
            "O(n²)"
        ],

        answer: 2
    },


    {
        topic: "Trees",

        question:
            "Which traversal visits nodes in the order Root → Left → Right?",

        options: [
            "Inorder",
            "Postorder",
            "Preorder",
            "Level Order"
        ],

        answer: 2
    },


    {
        topic: "Trees",

        question:
            "Which data structure is commonly used for Level Order Traversal of a tree?",

        options: [
            "Stack",
            "Queue",
            "Array only",
            "Set"
        ],

        answer: 1
    },


    {
        topic: "Graphs",

        question:
            "Which algorithm uses a queue for traversal of a graph?",

        options: [
            "DFS",
            "BFS",
            "Binary Search",
            "Merge Sort"
        ],

        answer: 1
    },


    {
        topic: "Graphs",

        question:
            "Which data structure is commonly used to implement DFS iteratively?",

        options: [
            "Queue",
            "Stack",
            "Heap",
            "HashMap"
        ],

        answer: 1
    }

];


/* =====================================================
   VARIABLES
===================================================== */

let currentQuestion = 0;

let userAnswers =
    new Array(questions.length).fill(null);


/* =====================================================
   START ASSESSMENT
===================================================== */

function startAssessment() {

    document
        .getElementById("introSection")
        .classList.add("hidden");


    document
        .getElementById("assessmentSection")
        .classList.remove("hidden");


    currentQuestion = 0;

    userAnswers =
        new Array(questions.length).fill(null);


    displayQuestion();

}


/* =====================================================
   DISPLAY QUESTION
===================================================== */

function displayQuestion() {

    const question =
        questions[currentQuestion];


    /* Question number */

    document.getElementById(
        "questionNumber"
    ).textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    /* Progress */

    const percentage =
        Math.round(
            ((currentQuestion + 1) / questions.length) * 100
        );


    document.getElementById(
        "progressPercentage"
    ).textContent =
        `${percentage}%`;


    document.getElementById(
        "progressFill"
    ).style.width =
        `${percentage}%`;


    /* Topic */

    document.getElementById(
        "questionTopic"
    ).textContent =
        question.topic;


    /* Question */

    document.getElementById(
        "questionText"
    ).textContent =
        question.question;


    /* Options */

    const optionsContainer =
        document.getElementById(
            "optionsContainer"
        );


    optionsContainer.innerHTML = "";


    question.options.forEach(
        (option, index) => {

            const optionElement =
                document.createElement("div");


            optionElement.className =
                "option";


            if (
                userAnswers[currentQuestion] ===
                index
            ) {

                optionElement.classList.add(
                    "selected"
                );

            }


            optionElement.innerHTML = `

                <div class="option-letter">
                    ${String.fromCharCode(65 + index)}
                </div>

                <div class="option-text">
                    ${option}
                </div>

            `;


            optionElement.addEventListener(
                "click",
                () => selectAnswer(index)
            );


            optionsContainer.appendChild(
                optionElement
            );

        }
    );


    /* Previous button */

    const previousBtn =
        document.getElementById(
            "previousBtn"
        );


    previousBtn.disabled =
        currentQuestion === 0;


    previousBtn.style.opacity =
        currentQuestion === 0 ? "0.5" : "1";


    /* Next / Submit */

    const nextBtn =
        document.getElementById(
            "nextBtn"
        );


    const submitBtn =
        document.getElementById(
            "submitBtn"
        );


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextBtn.classList.add("hidden");

        submitBtn.classList.remove("hidden");

    }

    else {

        nextBtn.classList.remove("hidden");

        submitBtn.classList.add("hidden");

    }

}


/* =====================================================
   SELECT ANSWER
===================================================== */

function selectAnswer(index) {

    userAnswers[currentQuestion] =
        index;


    displayQuestion();

}


/* =====================================================
   NEXT QUESTION
===================================================== */

function nextQuestion() {

    if (
        userAnswers[currentQuestion] ===
        null
    ) {

        showToast(
            "Please select an answer before continuing."
        );

        return;

    }


    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        displayQuestion();

    }

}


/* =====================================================
   PREVIOUS QUESTION
===================================================== */

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        displayQuestion();

    }

}


/* =====================================================
   SUBMIT ASSESSMENT
===================================================== */

function submitAssessment() {

    const unanswered =
        userAnswers.filter(
            answer => answer === null
        ).length;


    if (unanswered > 0) {

        showToast(
            `Please answer all questions. ${unanswered} question(s) remaining.`
        );

        return;

    }


    calculateResults();

}


/* =====================================================
   CALCULATE RESULTS
===================================================== */

function calculateResults() {

    let correctAnswers = 0;


    const topicResults = {};


    /* ---------------------------------------------
       Calculate correct answers for every topic
    --------------------------------------------- */

    questions.forEach(
        (question, index) => {

            const topic =
                question.topic;


            if (!topicResults[topic]) {

                topicResults[topic] = {

                    correct: 0,

                    total: 0

                };

            }


            topicResults[topic].total++;


            if (
                userAnswers[index] ===
                question.answer
            ) {

                correctAnswers++;

                topicResults[topic].correct++;

            }

        }
    );


    /* ---------------------------------------------
       Calculate overall percentage
    --------------------------------------------- */

    const percentage =
        Math.round(
            (correctAnswers / questions.length) * 100
        );


    /* ---------------------------------------------
       Convert topic objects into percentages

       BEFORE:
       Arrays: {correct: 2, total: 2}

       AFTER:
       Arrays: 100
    --------------------------------------------- */

    const topicPercentages = {};


    Object.keys(topicResults).forEach(
        topic => {

            const result =
                topicResults[topic];


            topicPercentages[topic] =
                Math.round(
                    (result.correct / result.total) * 100
                );

        }
    );


    /* ---------------------------------------------
       Save result
    --------------------------------------------- */

    const result = {

        score: percentage,

        correct: correctAnswers,

        total: questions.length,

        topics: topicPercentages,

        date: new Date().toLocaleString()

    };


    localStorage.setItem(
        "latestAssessment",
        JSON.stringify(result)
    );


    /* ---------------------------------------------
       Open AI Analysis automatically
    --------------------------------------------- */

    window.location.href =
        "ai-analysis.html";

}


/* =====================================================
   SHOW RESULTS
===================================================== */

function showResults(
    percentage,
    correctAnswers,
    topicResults
) {

    document
        .getElementById("assessmentSection")
        .classList.add("hidden");


    document
        .getElementById("resultSection")
        .classList.remove("hidden");


    /* Score */

    document.getElementById(
        "scorePercentage"
    ).textContent =
        `${percentage}%`;


    document.getElementById(
        "scoreText"
    ).textContent =
        `You answered ${correctAnswers} out of ${questions.length} questions correctly.`;


    /* Result message */

    let message;


    if (percentage >= 80) {

        message =
            "Excellent performance!";

    }

    else if (percentage >= 60) {

        message =
            "Good performance! Keep improving.";

    }

    else if (percentage >= 40) {

        message =
            "You have a good foundation. More practice will help.";

    }

    else {

        message =
            "Let's strengthen your fundamentals.";

    }


    document.getElementById(
        "resultMessage"
    ).textContent =
        message;


    /* Topic analysis */

    const topicAnalysis =
        document.getElementById(
            "topicAnalysis"
        );


    topicAnalysis.innerHTML = "";


    Object.keys(topicResults).forEach(
        topic => {

            const result =
                topicResults[topic];


            const topicPercentage =
                Math.round(
                    (result.correct / result.total) * 100
                );


            const row =
                document.createElement("div");


            row.className =
                "topic-row";


            row.innerHTML = `

                <div class="topic-name">
                    ${topic}
                </div>

                <div class="topic-progress">

                    <div
                        class="topic-progress-fill"
                        style="width: ${topicPercentage}%"
                    ></div>

                </div>

                <div class="topic-score">
                    ${topicPercentage}%
                </div>

            `;


            topicAnalysis.appendChild(row);

        }
    );


    generateRecommendations(topicResults);

}


/* =====================================================
   RECOMMENDATIONS
===================================================== */

function generateRecommendations(
    topicResults
) {

    const container =
        document.getElementById(
            "recommendations"
        );


    container.innerHTML = "";


    Object.keys(topicResults).forEach(
        topic => {

            const result =
                topicResults[topic];


            const percentage =
                Math.round(
                    (result.correct / result.total) * 100
                );


            if (percentage < 50) {

                addRecommendation(

                    topic,

                    "This is an area that needs more practice. Start with the fundamentals and solve easy problems first."

                );

            }

            else if (percentage < 75) {

                addRecommendation(

                    topic,

                    "You have a basic understanding. Practice more questions to improve your confidence."

                );

            }

        }
    );


    /* If everything is strong */

    if (
        container.children.length === 0
    ) {

        addRecommendation(

            "Great job!",

            "You performed well across all topics. Try more challenging questions to continue improving."

        );

    }

}


/* =====================================================
   ADD RECOMMENDATION
===================================================== */

function addRecommendation(
    topic,
    message
) {

    const container =
        document.getElementById(
            "recommendations"
        );


    const item =
        document.createElement("div");


    item.className =
        "recommendation-item";


    item.innerHTML = `

        <i class="fa-solid fa-lightbulb"></i>

        <div>

            <strong>
                ${topic}
            </strong>

            <p>
                ${message}
            </p>

        </div>

    `;


    container.appendChild(item);

}


/* =====================================================
   RETAKE ASSESSMENT
===================================================== */

function retakeAssessment() {

    document
        .getElementById("resultSection")
        .classList.add("hidden");


    document
        .getElementById("assessmentSection")
        .classList.remove("hidden");


    currentQuestion = 0;


    userAnswers =
        new Array(questions.length).fill(null);


    displayQuestion();

}


/* =====================================================
   GO TO STUDENT DASHBOARD
===================================================== */

function goToDashboard() {

    window.location.href =
        "student-dashboard.html";

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}
