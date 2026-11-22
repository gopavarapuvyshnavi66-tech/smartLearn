
/* =====================================
   SMARTLEARN - PROGRESS TRACKING
===================================== */


/* =====================================
   1. SAFE LOCAL STORAGE READER
===================================== */

function readStorage(key, fallback = null) {

    try {

        const stored = localStorage.getItem(key);

        return stored ? JSON.parse(stored) : fallback;

    } catch (error) {

        console.error("Storage error:", error);

        return fallback;

    }

}


/* =====================================
   2. STUDENT AUTHENTICATION
===================================== */

const currentUser = readStorage("currentUser", null);

if (!currentUser || currentUser.role !== "student") {

    window.location.href = "index.html";

}


/* =====================================
   3. DISPLAY STUDENT INFORMATION
===================================== */

function loadStudentInfo() {

    const studentName = currentUser?.name || "Student";

    const sidebarName =
        document.getElementById("sidebarStudentName");

    const profileName =
        document.getElementById("profileName");

    const profileAvatar =
        document.getElementById("profileAvatar");

    if (sidebarName) {
        sidebarName.textContent = studentName;
    }

    if (profileName) {
        profileName.textContent = studentName;
    }

    if (profileAvatar) {
        profileAvatar.textContent =
            studentName.charAt(0).toUpperCase();
    }

}


/* =====================================
   4. GET ASSESSMENT DATA
===================================== */

function getAssessmentData() {

    const assessment = readStorage("latestAssessment", null);

    if (!assessment) {
        return [];
    }

    if (Array.isArray(assessment)) {
        return assessment;
    }

    return [assessment];

}


/* =====================================
   5. CALCULATE ASSESSMENT SCORE
===================================== */

function getScore(assessment) {

    if (
        typeof assessment.score === "number" &&
        Number.isFinite(assessment.score)
    ) {

        return Math.max(0, Math.min(100, assessment.score));

    }

    const correct = Number(assessment.correct);
    const total = Number(assessment.total);

    if (
        Number.isFinite(correct) &&
        Number.isFinite(total) &&
        total > 0
    ) {

        return Math.round((correct / total) * 100);

    }

    return null;

}


/* =====================================
   6. UPDATE SUMMARY CARDS
===================================== */

function updateSummary() {

    const assessments = getAssessmentData();

    const totalAssessments = assessments.length;

    const validScores = assessments
        .map(getScore)
        .filter(score => score !== null);

    let averageScore = 0;

    if (validScores.length > 0) {

        averageScore = Math.round(
            validScores.reduce((sum, score) => sum + score, 0)
            / validScores.length
        );

    }

    const totalElement =
        document.getElementById("totalAssessments");

    const averageElement =
        document.getElementById("averageScore");

    const progressElement =
        document.getElementById("overallProgress");

    const accuracyElement =
        document.getElementById("practiceAccuracy");

    if (totalElement) {
        totalElement.textContent = totalAssessments;
    }

    if (averageElement) {
        averageElement.textContent = averageScore + "%";
    }

    // Will be connected with Learn module.

    if (progressElement) {
        progressElement.textContent = "0%";
    }

    // Will be connected with Practice module.

    if (accuracyElement) {
        accuracyElement.textContent = "0%";
    }

}


/* =====================================
   7. TOPIC-WISE PROGRESS
===================================== */

function updateTopicProgress() {

    const container =
        document.getElementById("topicProgressList");

    if (!container) return;

    const assessments = getAssessmentData();

    container.innerHTML = "";

    if (assessments.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                Complete an assessment to see your topic progress.
            </p>
        `;

        return;

    }

    const topicScores = {};

    assessments.forEach(assessment => {

        const topics = assessment.topics;

        if (!topics || typeof topics !== "object") {
            return;
        }

        Object.entries(topics).forEach(([topicName, result]) => {

            let percentage = null;

            if (typeof result === "number") {

                percentage = result;

            } else if (result && typeof result === "object") {

                if (typeof result.percentage === "number") {

                    percentage = result.percentage;

                } else if (
                    typeof result.correct === "number" &&
                    typeof result.total === "number" &&
                    result.total > 0
                ) {

                    percentage = Math.round(
                        (result.correct / result.total) * 100
                    );

                } else if (
                    typeof result.score === "number"
                ) {

                    percentage = result.score;

                }

            }

            if (
                percentage === null ||
                !Number.isFinite(percentage)
            ) {
                return;
            }

            percentage = Math.max(0, Math.min(100, percentage));

            if (!topicScores[topicName]) {

                topicScores[topicName] = {
                    total: 0,
                    count: 0
                };

            }

            topicScores[topicName].total += percentage;
            topicScores[topicName].count++;

        });

    });


    if (Object.keys(topicScores).length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                Topic-wise results are not available yet.
            </p>
        `;

        return;

    }


    Object.entries(topicScores).forEach(([topic, data]) => {

        const percentage = Math.round(
            data.total / data.count
        );

        const item = document.createElement("div");

        item.className = "topic-item";

        const info = document.createElement("div");

        info.className = "topic-info";

        const heading = document.createElement("h4");

        heading.textContent = topic;

        const score = document.createElement("span");

        score.textContent = percentage + "%";

        info.append(heading, score);

        const track = document.createElement("div");

        track.className = "progress-track";

        const fill = document.createElement("div");

        fill.className = "progress-fill";

        fill.style.width = percentage + "%";

        track.appendChild(fill);

        item.append(info, track);

        container.appendChild(item);

    });

}


/* =====================================
   8. PERFORMANCE CHART
===================================== */

let performanceChart = null;

function updatePerformanceChart() {

    const canvas =
        document.getElementById("performanceChart");

    if (!canvas || typeof Chart === "undefined") {

        console.warn("Chart.js is not available.");

        return;

    }

    const assessments = getAssessmentData();

    const validResults = assessments
        .map((assessment, index) => ({
            assessment,
            score: getScore(assessment),
            index
        }))
        .filter(item => item.score !== null);

    const labels = validResults.map((item, index) => {

        return item.assessment.date || "Assessment " + (index + 1);

    });

    const scores = validResults.map(item => item.score);

    if (performanceChart) {

        performanceChart.destroy();

    }

    performanceChart = new Chart(canvas, {

        type: "line",

        data: {

            labels: labels,

            datasets: [{

                label: "Assessment Score",

                data: scores,

                borderColor: "#635bff",

                backgroundColor: "rgba(99, 91, 255, 0.12)",

                borderWidth: 3,

                fill: true,

                tension: 0.4,

                pointBackgroundColor: "#635bff",

                pointRadius: 5,

                pointHoverRadius: 7

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: true,
                    position: "top"
                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    max: 100,

                    ticks: {

                        callback: value => value + "%"

                    }

                },

                x: {

                    grid: {
                        display: false
                    }

                }

            }

        }

    });

}


/* =====================================
   9. LEARNING ACTIVITY
===================================== */

function updateLearningActivity() {

    const container =
        document.getElementById("learningActivity");

    if (!container) return;

    const assessments = getAssessmentData();

    container.innerHTML = "";

    if (assessments.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                Your learning activities will appear here
                after completing an assessment.
            </p>
        `;

        return;

    }

    // Latest assessment first.

    assessments.slice().reverse().forEach(assessment => {

        const item = document.createElement("div");

        item.className = "activity-item";

        const icon = document.createElement("div");

        icon.className = "activity-icon";

        const iconElement = document.createElement("i");

        iconElement.className = "fa-solid fa-clipboard-check";

        icon.appendChild(iconElement);

        const details = document.createElement("div");

        details.className = "activity-details";

        const heading = document.createElement("h4");

        heading.textContent = "Assessment Completed";

        const description = document.createElement("p");

        description.textContent =
            assessment.date
                ? "Date: " + assessment.date
                : "Assessment result recorded";

        details.append(heading, description);

        const score = document.createElement("div");

        score.className = "activity-score";

        const percentage = getScore(assessment);

        score.textContent =
            percentage === null
                ? "Score unavailable"
                : percentage + "%";

        item.append(icon, details, score);

        container.appendChild(item);

    });

}


/* =====================================
   10. ACHIEVEMENTS
===================================== */

function updateAchievements() {

    const container =
        document.getElementById("achievementsList");

    if (!container) return;

    const assessments = getAssessmentData();

    const validScores = assessments
        .map(getScore)
        .filter(score => score !== null);

    const total = assessments.length;

    const average = validScores.length
        ? Math.round(
            validScores.reduce((sum, score) => sum + score, 0)
            / validScores.length
        )
        : 0;

    const highest = validScores.length
        ? Math.max(...validScores)
        : 0;

    const achievements = [

        {
            title: "First Assessment",
            description: "Complete your first assessment",
            icon: "fa-flag-checkered",
            unlocked: total >= 1
        },

        {
            title: "Consistent Learner",
            description: "Complete 5 assessments",
            icon: "fa-book-open",
            unlocked: total >= 5
        },

        {
            title: "High Achiever",
            description: "Score 80% or above in an assessment",
            icon: "fa-trophy",
            unlocked: highest >= 80
        },

        {
            title: "Excellent Performance",
            description: "Maintain an average score of 90%",
            icon: "fa-medal",
            unlocked: validScores.length > 0 && average >= 90
        }

    ];

    container.innerHTML = "";

    achievements.forEach(achievement => {

        const item = document.createElement("div");

        item.className = "achievement-item";

        if (!achievement.unlocked) {

            item.classList.add("locked");

        }

        const icon = document.createElement("div");

        icon.className = "achievement-icon";

        const iconElement = document.createElement("i");

        iconElement.className = achievement.unlocked
            ? "fa-solid " + achievement.icon
            : "fa-solid fa-lock";

        icon.appendChild(iconElement);

        const heading = document.createElement("h4");

        heading.textContent = achievement.title;

        const description = document.createElement("p");

        description.textContent = achievement.description;

        item.append(icon, heading, description);

        container.appendChild(item);

    });

}


/* =====================================
   11. SIDEBAR
===================================== */

function toggleSidebar() {

    const sidebar = document.getElementById("sidebar");

    if (sidebar) {

        sidebar.classList.toggle("open");

    }

}


/* =====================================
   12. STUDENT LOGOUT
===================================== */

function logoutStudent() {

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    sessionStorage.removeItem("smartLearnLoggedIn");

    localStorage.removeItem("currentUser");

    localStorage.removeItem("studentUser");

    window.location.replace("index.html");

}


/* =====================================
   13. INITIALIZE PROGRESS TRACKING
===================================== */

function initializeProgressTracking() {

    if (!currentUser || currentUser.role !== "student") {
        return;
    }

    loadStudentInfo();

    updateSummary();

    updateTopicProgress();

    updatePerformanceChart();

    updateLearningActivity();

    updateAchievements();

}


// Start Progress Tracking.

initializeProgressTracking();
