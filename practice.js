
/* =====================================================
   SMARTLEARN - PRACTICE MODULE JAVASCRIPT
===================================================== */


/* =====================================================
   QUESTION BANK
===================================================== */

const questionBank = {

    DSA: [
        {
            type: "mcq",
            topic: "Arrays",
            question: "Which data structure stores elements in contiguous memory locations?",
            options: ["Linked List", "Array", "Tree", "Graph"],
            answer: 1,
            explanation: "Arrays store elements in contiguous memory locations, allowing direct access using an index."
        },
        {
            type: "fill",
            topic: "Stack",
            question: "A stack follows the ______ principle.",
            answer: ["lifo", "last in first out", "last-in-first-out"],
            explanation: "LIFO means Last In, First Out. The last inserted element is removed first."
        },
        {
            type: "code",
            topic: "Algorithms",
            question: "In Java, which keyword is used to create a new object?",
            answer: ["new"],
            explanation: "The new keyword allocates memory for an object and invokes its constructor."
        },
        {
            type: "mcq",
            topic: "Searching",
            question: "What is the time complexity of binary search in a sorted array?",
            options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
            answer: 2,
            explanation: "Binary search repeatedly divides the search space into half, giving O(log n) time complexity."
        },
        {
            type: "fill",
            topic: "Queue",
            question: "A queue follows the ______ principle.",
            answer: ["fifo", "first in first out", "first-in-first-out"],
            explanation: "FIFO means First In, First Out. The first inserted element is removed first."
        },
        {
            type: "code",
            topic: "Java Basics",
            question: "Write the Java keyword used to inherit a class.",
            answer: ["extends"],
            explanation: "Java uses the extends keyword when one class inherits another class."
        }
    ],

    DBMS: [
        {
            type: "mcq",
            topic: "SQL",
            question: "Which SQL command retrieves data from a table?",
            options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
            answer: 2,
            explanation: "SELECT is used to retrieve records from one or more database tables."
        },
        {
            type: "fill",
            topic: "Keys",
            question: "A ______ key uniquely identifies each record in a table.",
            answer: ["primary key", "primary"],
            explanation: "A primary key uniquely identifies every row in a table and cannot contain NULL values."
        },
        {
            type: "code",
            topic: "SQL",
            question: "Write the SQL command used to remove a table completely.",
            answer: ["drop table"],
            explanation: "DROP TABLE removes the table structure and its stored data."
        },
        {
            type: "mcq",
            topic: "Normalization",
            question: "Which normal form eliminates partial dependency?",
            options: ["1NF", "2NF", "3NF", "BCNF"],
            answer: 1,
            explanation: "Second Normal Form eliminates partial dependency on a candidate key."
        },
        {
            type: "fill",
            topic: "SQL",
            question: "The SQL clause used to filter grouped records is ______.",
            answer: ["having"],
            explanation: "HAVING filters groups after GROUP BY has been applied."
        },
        {
            type: "code",
            topic: "SQL",
            question: "Write the SQL keyword used to combine rows from two tables based on a related column.",
            answer: ["join"],
            explanation: "JOIN combines rows from two or more tables using a related column."
        }
    ],

    OS: [
        {
            type: "mcq",
            topic: "Process Management",
            question: "Which of the following is responsible for process scheduling?",
            options: ["Compiler", "Operating System", "Browser", "Database"],
            answer: 1,
            explanation: "The operating system scheduler selects processes for execution by the CPU."
        },
        {
            type: "fill",
            topic: "Memory Management",
            question: "The process of moving data between RAM and secondary storage in fixed-size blocks is called ______.",
            answer: ["paging"],
            explanation: "Paging divides memory into fixed-size pages and frames."
        },
        {
            type: "code",
            topic: "Linux",
            question: "Which Linux command lists files and directories?",
            answer: ["ls"],
            explanation: "The ls command displays files and directories in the current location."
        },
        {
            type: "mcq",
            topic: "Deadlock",
            question: "How many necessary conditions are there for deadlock?",
            options: ["2", "3", "4", "5"],
            answer: 2,
            explanation: "The four conditions are mutual exclusion, hold and wait, no preemption, and circular wait."
        },
        {
            type: "fill",
            topic: "Process Management",
            question: "A program in execution is called a ______.",
            answer: ["process"],
            explanation: "A process is an instance of a program that is currently executing."
        },
        {
            type: "code",
            topic: "Linux",
            question: "Which Linux command displays the current working directory?",
            answer: ["pwd"],
            explanation: "The pwd command prints the present working directory."
        }
    ],

    CN: [
        {
            type: "mcq",
            topic: "Networking",
            question: "How many layers are present in the OSI model?",
            options: ["4", "5", "7", "8"],
            answer: 2,
            explanation: "The OSI reference model consists of seven layers."
        },
        {
            type: "fill",
            topic: "Protocols",
            question: "HTTP stands for Hypertext ______ Protocol.",
            answer: ["transfer"],
            explanation: "HTTP stands for Hypertext Transfer Protocol."
        },
        {
            type: "code",
            topic: "Networking Commands",
            question: "Which command is commonly used to test network connectivity?",
            answer: ["ping"],
            explanation: "The ping command tests whether a destination host is reachable over a network."
        },
        {
            type: "mcq",
            topic: "Transport Layer",
            question: "Which protocol provides reliable, connection-oriented communication?",
            options: ["UDP", "TCP", "IP", "ARP"],
            answer: 1,
            explanation: "TCP provides reliable, connection-oriented communication using acknowledgements and retransmissions."
        },
        {
            type: "fill",
            topic: "Protocols",
            question: "DNS stands for Domain Name ______.",
            answer: ["system"],
            explanation: "DNS stands for Domain Name System. It translates domain names into IP addresses."
        },
        {
            type: "code",
            topic: "IP Addressing",
            question: "How many bits are there in an IPv4 address?",
            answer: ["32", "32 bits"],
            explanation: "An IPv4 address contains 32 bits, usually represented in four decimal octets."
        }
    ],

    OOP: [
        {
            type: "mcq",
            topic: "Inheritance",
            question: "Which OOP concept allows one class to acquire properties of another class?",
            options: ["Encapsulation", "Inheritance", "Abstraction", "Polymorphism"],
            answer: 1,
            explanation: "Inheritance allows a class to acquire properties and methods from another class."
        },
        {
            type: "fill",
            topic: "Polymorphism",
            question: "The ability of an object to take many forms is called ______.",
            answer: ["polymorphism"],
            explanation: "Polymorphism means one interface or concept can have multiple implementations or forms."
        },
        {
            type: "code",
            topic: "Java",
            question: "Which keyword prevents a Java class from being inherited?",
            answer: ["final"],
            explanation: "A class declared with the final keyword cannot be extended."
        },
        {
            type: "mcq",
            topic: "Encapsulation",
            question: "Which access modifier restricts access to within the same class?",
            options: ["public", "protected", "private", "default"],
            answer: 2,
            explanation: "The private modifier restricts direct access to members within their declaring class."
        },
        {
            type: "fill",
            topic: "Abstraction",
            question: "In Java, an abstract class is declared using the ______ keyword.",
            answer: ["abstract"],
            explanation: "The abstract keyword is used to declare an abstract class or method."
        },
        {
            type: "code",
            topic: "Java",
            question: "Which keyword refers to the current object in Java?",
            answer: ["this"],
            explanation: "The this keyword refers to the current object of the class."
        }
    ],

    SE: [
        {
            type: "mcq",
            topic: "Software Development",
            question: "Which SDLC model follows a sequential development approach?",
            options: ["Agile", "Spiral", "Waterfall", "Prototype"],
            answer: 2,
            explanation: "The Waterfall model follows sequential phases such as requirements, design, implementation, testing and maintenance."
        },
        {
            type: "fill",
            topic: "Testing",
            question: "Testing individual software components is called ______ testing.",
            answer: ["unit"],
            explanation: "Unit testing checks individual functions, methods or components."
        },
        {
            type: "code",
            topic: "Software Testing",
            question: "What is the short form of User Acceptance Testing?",
            answer: ["uat"],
            explanation: "UAT stands for User Acceptance Testing."
        },
        {
            type: "mcq",
            topic: "Agile",
            question: "Which Agile framework uses sprints?",
            options: ["Waterfall", "Scrum", "V-Model", "Big Bang"],
            answer: 1,
            explanation: "Scrum organizes work into time-boxed iterations called sprints."
        },
        {
            type: "fill",
            topic: "Requirements",
            question: "SRS stands for Software Requirements ______.",
            answer: ["specification"],
            explanation: "SRS is a document that describes the functional and non-functional requirements of software."
        },
        {
            type: "code",
            topic: "Software Development",
            question: "Which version control system is commonly used to track source code changes?",
            answer: ["git"],
            explanation: "Git is a distributed version control system used to track code changes."
        }
    ]

};


/* =====================================================
   ELEMENT REFERENCES
===================================================== */

const $ = id => document.getElementById(id);

const STORAGE_KEY = "smartLearnPracticeHistory";

let currentQuestions = [];
let currentQuestionIndex = 0;
let currentSubject = "DSA";
let currentType = "all";

let answers = {};
let submitted = {};

let lastSession = null;


/* =====================================================
   STORAGE FUNCTIONS
===================================================== */

function readStorage(key, fallback) {

    try {

        const stored = localStorage.getItem(key);

        return stored ? JSON.parse(stored) : fallback;

    } catch (error) {

        console.error("Storage error:", error);

        return fallback;

    }

}


function saveStorage(key, value) {

    try {

        localStorage.setItem(key, JSON.stringify(value));

    } catch (error) {

        console.error("Unable to save data:", error);

        showToast("Unable to save practice history.");

    }

}


/* =====================================================
   LOAD STUDENT
===================================================== */

function loadStudent() {

    const storedUser = localStorage.getItem("studentUser");

    let name = "Student";

    if (storedUser) {

        try {

            const user = JSON.parse(storedUser);

            name = user.name || user.username || "Student";

        } catch (error) {

            console.error("Student data error:", error);

        }

    }

    if ($("sidebarStudentName")) {
        $("sidebarStudentName").textContent = name;
    }

    if ($("topStudentName")) {
        $("topStudentName").textContent = name;
    }

}


/* =====================================================
   TOPIC FROM URL
===================================================== */

function selectTopicFromURL() {

    const params = new URLSearchParams(window.location.search);

    const requestedTopic = (params.get("topic") || "").toLowerCase();

    const topicMap = {
        "dsa": "DSA",
        "data structures": "DSA",
        "data structures and algorithms": "DSA",
        "dbms": "DBMS",
        "database": "DBMS",
        "database management systems": "DBMS",
        "os": "OS",
        "operating systems": "OS",
        "cn": "CN",
        "computer networks": "CN",
        "oop": "OOP",
        "object oriented programming": "OOP",
        "software engineering": "SE",
        "se": "SE"
    };

    if (topicMap[requestedTopic]) {

        $("subjectSelect").value = topicMap[requestedTopic];

    }

}


/* =====================================================
   START PRACTICE
===================================================== */

function startPractice() {

    currentSubject = $("subjectSelect").value;
    currentType = $("typeSelect").value;

    currentQuestions = questionBank[currentSubject].filter(question => {

        return currentType === "all" || question.type === currentType;

    });

    if (currentQuestions.length === 0) {

        showToast("No questions available for this selection.");

        return;

    }

    currentQuestionIndex = 0;
    answers = {};
    submitted = {};

    $("quizTitle").textContent =
        currentSubject + " Practice";

    $("questionCategory").textContent =
        getSubjectName(currentSubject).toUpperCase();

    $("quizSection").hidden = false;
    $("resultSection").hidden = true;

    $("quizSection").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    renderQuestion();

}


/* =====================================================
   SUBJECT NAME
===================================================== */

function getSubjectName(subject) {

    const names = {
        DSA: "Data Structures & Algorithms",
        DBMS: "Database Management Systems",
        OS: "Operating Systems",
        CN: "Computer Networks",
        OOP: "Object Oriented Programming",
        SE: "Software Engineering"
    };

    return names[subject] || subject;

}


/* =====================================================
   RENDER QUESTION
===================================================== */

function renderQuestion() {

    const question = currentQuestions[currentQuestionIndex];

    const total = currentQuestions.length;

    const questionNumber = currentQuestionIndex + 1;

    const progress = (questionNumber / total) * 100;

    $("questionNumber").textContent =
        "Question " + questionNumber + " of " + total;

    $("progressPercentage").textContent =
        Math.round(progress) + "%";

    $("quizProgress").style.width = progress + "%";

    $("questionText").textContent = question.question;

    $("questionTypeLabel").textContent =
        getTypeName(question.type);

    $("answerArea").innerHTML = "";

    $("feedbackBox").hidden = true;

    $("previousBtn").disabled = currentQuestionIndex === 0;

    const alreadySubmitted = submitted[currentQuestionIndex];

    if (question.type === "mcq") {

        renderMCQ(question);

    } else {

        renderTextAnswer(question);

    }

    if (alreadySubmitted) {

        showFeedback(question);

    }

    $("submitAnswerBtn").hidden = Boolean(alreadySubmitted);

    $("nextBtn").hidden = !alreadySubmitted;

    $("nextBtn").textContent =
        currentQuestionIndex === total - 1
            ? "View Results"
            : "Next Question";

}


/* =====================================================
   QUESTION TYPE NAME
===================================================== */

function getTypeName(type) {

    const names = {
        mcq: "MULTIPLE CHOICE",
        fill: "FILL IN THE BLANKS",
        code: "CODING QUESTION"
    };

    return names[type] || "QUESTION";

}


/* =====================================================
   RENDER MCQ
===================================================== */

function renderMCQ(question) {

    const container = document.createElement("div");

    container.className = "options-list";

    question.options.forEach((option, index) => {

        const label = document.createElement("label");

        label.className = "option-item";

        const radio = document.createElement("input");

        radio.type = "radio";
        radio.name = "practiceAnswer";
        radio.value = index;

        radio.checked = answers[currentQuestionIndex] === index;

        radio.disabled = Boolean(submitted[currentQuestionIndex]);

        const text = document.createElement("span");

        text.textContent = option;

        label.append(radio, text);

        container.appendChild(label);

        radio.addEventListener("change", () => {

            answers[currentQuestionIndex] = index;

        });

    });

    $("answerArea").appendChild(container);

}


/* =====================================================
   RENDER TEXT ANSWER
===================================================== */

function renderTextAnswer(question) {

    const input = document.createElement("textarea");

    input.className = "text-answer";

    input.id = "textAnswer";

    input.placeholder = question.type === "code"
        ? "Type your answer or code here..."
        : "Enter your answer here...";

    input.value = answers[currentQuestionIndex] || "";

    input.disabled = Boolean(submitted[currentQuestionIndex]);

    input.addEventListener("input", () => {

        answers[currentQuestionIndex] = input.value;

    });

    $("answerArea").appendChild(input);

}


/* =====================================================
   CHECK ANSWER
===================================================== */

function checkAnswer(question, userAnswer) {

    if (question.type === "mcq") {

        return Number(userAnswer) === question.answer;

    }

    const normalizedAnswer =
        String(userAnswer || "").trim().toLowerCase();

    if (!normalizedAnswer) {
        return false;
    }

    return question.answer.some(expected => {

        return normalizedAnswer === expected.toLowerCase();

    });

}


/* =====================================================
   SUBMIT ANSWER
===================================================== */

function submitAnswer() {

    const question = currentQuestions[currentQuestionIndex];

    let userAnswer = answers[currentQuestionIndex];

    if (question.type === "mcq") {

        const selected = document.querySelector(
            'input[name="practiceAnswer"]:checked'
        );

        if (!selected) {

            showToast("Please select an option first.");

            return;

        }

        userAnswer = Number(selected.value);

    } else {

        userAnswer = $("textAnswer").value.trim();

        if (!userAnswer) {

            showToast("Please enter your answer.");

            return;

        }

    }

    answers[currentQuestionIndex] = userAnswer;

    const isCorrect = checkAnswer(question, userAnswer);

    submitted[currentQuestionIndex] = {
        userAnswer,
        isCorrect
    };

    showFeedback(question);

    $("submitAnswerBtn").hidden = true;
    $("nextBtn").hidden = false;

    $("nextBtn").textContent =
        currentQuestionIndex === currentQuestions.length - 1
            ? "View Results"
            : "Next Question";

    $("previousBtn").disabled = false;

}


/* =====================================================
   SHOW FEEDBACK
===================================================== */

function showFeedback(question) {

    const result = submitted[currentQuestionIndex];

    if (!result) return;

    $("feedbackBox").hidden = false;

    $("feedbackTitle").textContent =
        result.isCorrect ? "Correct Answer!" : "Incorrect Answer";

    $("feedbackTitle").style.color =
        result.isCorrect ? "var(--green)" : "var(--red)";

    $("feedbackText").textContent =
        question.explanation;

    const labels = document.querySelectorAll(".option-item");

    labels.forEach((label, index) => {

        label.classList.remove("correct", "incorrect");

        if (question.type === "mcq") {

            if (index === question.answer) {

                label.classList.add("correct");

            } else if (
                index === result.userAnswer &&
                !result.isCorrect
            ) {

                label.classList.add("incorrect");

            }

        }

    });

}


/* =====================================================
   NEXT QUESTION
===================================================== */

function nextQuestion() {

    if (!submitted[currentQuestionIndex]) {

        return;

    }

    if (currentQuestionIndex < currentQuestions.length - 1) {

        currentQuestionIndex++;

        renderQuestion();

    } else {

        finishPractice();

    }

}


/* =====================================================
   PREVIOUS QUESTION
===================================================== */

function previousQuestion() {

    if (currentQuestionIndex > 0) {

        currentQuestionIndex--;

        renderQuestion();

    }

}


/* =====================================================
   FINISH PRACTICE
===================================================== */

function finishPractice() {

    const correctQuestions = currentQuestions.filter(
        (question, index) => submitted[index]?.isCorrect
    );

    const correct = correctQuestions.length;

    const total = currentQuestions.length;

    const incorrect = total - correct;

    const accuracy = Math.round((correct / total) * 100);

    const weakTopics = {};

    currentQuestions.forEach((question, index) => {

        if (!submitted[index]?.isCorrect) {

            weakTopics[question.topic] =
                (weakTopics[question.topic] || 0) + 1;

        }

    });

    $("quizSection").hidden = true;
    $("resultSection").hidden = false;

    $("finalScore").textContent = correct + "/" + total;

    $("finalCorrect").textContent = correct;

    $("finalIncorrect").textContent = incorrect;

    $("finalAccuracy").textContent = accuracy + "%";

    $("resultMessage").textContent =
        accuracy >= 80
            ? "Excellent work! You have a strong understanding."
            : accuracy >= 50
                ? "Good effort! Keep practicing to improve."
                : "Don't give up! Review the explanations and try again.";

    const weakTopicNames = Object.keys(weakTopics);

    $("weakTopics").textContent =
        weakTopicNames.length
            ? weakTopicNames.join(", ")
            : "Excellent! You answered every question correctly.";

    lastSession = {
        subject: currentSubject,
        subjectName: getSubjectName(currentSubject),
        total,
        correct,
        incorrect,
        accuracy,
        weakTopics: weakTopicNames,
        date: new Date().toISOString()
    };

    savePracticeSession(lastSession);

    updateStats();

    renderHistory();

    $("resultSection").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =====================================================
   SAVE PRACTICE HISTORY
===================================================== */

function savePracticeSession(session) {

    const history = readStorage(STORAGE_KEY, []);

    history.unshift(session);

    saveStorage(STORAGE_KEY, history.slice(0, 50));

}


/* =====================================================
   UPDATE STATISTICS
===================================================== */

function updateStats() {

    const history = readStorage(STORAGE_KEY, []);

    const attempted = history.reduce(
        (sum, item) => sum + Number(item.total || 0), 0
    );

    const correct = history.reduce(
        (sum, item) => sum + Number(item.correct || 0), 0
    );

    const accuracy = attempted
        ? Math.round((correct / attempted) * 100)
        : 0;

    $("attemptedCount").textContent = attempted;

    $("correctCount").textContent = correct;

    $("accuracyCount").textContent = accuracy + "%";

}


/* =====================================================
   RENDER HISTORY
===================================================== */

function renderHistory() {

    const history = readStorage(STORAGE_KEY, []);

    const container = $("historyList");

    container.innerHTML = "";

    if (!history.length) {

        container.innerHTML = `
            <div class="empty-history">
                <i class="fa-solid fa-book-open"></i>
                <p>No practice sessions yet.</p>
                <span>Complete your first practice session to see it here.</span>
            </div>
        `;

        return;

    }

    history.slice(0, 5).forEach(session => {

        const item = document.createElement("div");

        item.className = "history-item";

        const details = document.createElement("div");

        const heading = document.createElement("h4");

        heading.textContent = session.subjectName;

        const description = document.createElement("p");

        const date = new Date(session.date).toLocaleDateString();

        description.textContent =
            `${session.correct}/${session.total} correct answers • ${date}`;

        details.append(heading, description);

        const score = document.createElement("div");

        score.className = "history-score";

        score.textContent = session.accuracy + "%";

        item.append(details, score);

        container.appendChild(item);

    });

}


/* =====================================================
   RETRY PRACTICE
===================================================== */

function retryPractice() {

    $("resultSection").hidden = true;

    $("quizSection").hidden = true;

    startPractice();

}


/* =====================================================
   EXIT PRACTICE
===================================================== */

function exitPractice() {

    $("quizSection").hidden = true;

    $("resultSection").hidden = true;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   SIDEBAR
===================================================== */

function toggleSidebar() {

    $("sidebar").classList.toggle("mobile-open");

}


/* =====================================================
   LOGOUT
===================================================== */

function logoutStudent() {

    if (!confirm("Are you sure you want to logout?")) {
        return;
    }

    sessionStorage.removeItem("smartLearnLoggedIn");

    window.location.href = "index.html";

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    const toast = $("practiceToast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.practiceToastTimer);

    window.practiceToastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    loadStudent();

    selectTopicFromURL();

    updateStats();

    renderHistory();

    $("startPracticeBtn").addEventListener(
        "click",
        startPractice
    );

    $("submitAnswerBtn").addEventListener(
        "click",
        submitAnswer
    );

    $("nextBtn").addEventListener(
        "click",
        nextQuestion
    );

    $("previousBtn").addEventListener(
        "click",
        previousQuestion
    );

    $("retryBtn").addEventListener(
        "click",
        retryPractice
    );

    $("exitPracticeBtn").addEventListener(
        "click",
        exitPractice
    );

});
