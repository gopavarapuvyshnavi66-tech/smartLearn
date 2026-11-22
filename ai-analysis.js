/* =========================================================
   SMARTLEARN - AI ANALYSIS
   ========================================================= */


/* ================= AUTHENTICATION ================= */

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "student") {
    window.location.href = "index.html";
}


/* ================= LOAD ASSESSMENT ================= */

document.addEventListener("DOMContentLoaded", function () {

    const assessmentData =
        JSON.parse(localStorage.getItem("latestAssessment"));

    if (!assessmentData) {
        showNoAssessment();
        return;
    }

    analyzeAssessment(assessmentData);

});


/* ================= MAIN ANALYSIS ================= */

function analyzeAssessment(data) {

    const percentage = data.score;
    const correct = data.correct;
    const total = data.total;

    const topics = data.topics || {};

    document.getElementById("overallScore").textContent =
        percentage + "%";

    document.getElementById("correctAnswers").textContent =
        correct;

    document.getElementById("totalQuestions").textContent =
        total;

    document.getElementById("topicsAnalyzed").textContent =
        Object.keys(topics).length;


    updateScoreCircle(percentage);

    updatePerformanceMessage(percentage);

    displayTopicAnalysis(topics);

    generateAIInsight(topics, percentage);

    generateRecommendations(topics);

    generateLearningPath(topics);
}


/* ================= SCORE CIRCLE ================= */

function updateScoreCircle(score) {

    const circle =
        document.getElementById("scoreCircle");

    const degrees = score * 3.6;

    circle.style.background =
        `conic-gradient(
            #2563eb ${degrees}deg,
            #eff6ff ${degrees}deg
        )`;
}


/* ================= PERFORMANCE ================= */

function updatePerformanceMessage(score) {

    const title =
        document.getElementById("performanceTitle");

    const message =
        document.getElementById("performanceMessage");


    if (score >= 80) {

        title.textContent =
            "Excellent Performance";

        message.textContent =
            "You have demonstrated strong understanding across the assessed topics. Keep challenging yourself with higher-level problems.";

    }

    else if (score >= 60) {

        title.textContent =
            "Good Progress";

        message.textContent =
            "You have a good foundation, but a few topics need additional practice before moving to advanced concepts.";

    }

    else if (score >= 40) {

        title.textContent =
            "More Practice Needed";

        message.textContent =
            "You understand some fundamentals, but strengthening the weaker topics will help improve your overall performance.";

    }

    else {

        title.textContent =
            "Let's Build Your Foundation";

        message.textContent =
            "Your results suggest that revisiting the fundamentals and practicing step-by-step will help you improve.";

    }
}


/* ================= TOPIC ANALYSIS ================= */

function displayTopicAnalysis(topics) {

    const container =
        document.getElementById("topicAnalysis");

    container.innerHTML = "";


    const topicEntries =
        Object.entries(topics);


    if (topicEntries.length === 0) {

        container.innerHTML =
            `<p style="color:#64748b;">
                No topic analysis is available yet.
             </p>`;

        return;
    }


    topicEntries.forEach(([topic, score]) => {

        const row =
            document.createElement("div");

        row.className = "topic-row";


        let level = "";

        if (score >= 80) {
            level = "Strong";
        }
        else if (score >= 60) {
            level = "Good";
        }
        else if (score >= 40) {
            level = "Needs Practice";
        }
        else {
            level = "Needs Attention";
        }


        row.innerHTML = `

            <div class="topic-name">
                ${topic}
            </div>

            <div class="topic-progress">
                <span style="width:${score}%"></span>
            </div>

            <div class="topic-score">
                ${score}%
            </div>

        `;

        container.appendChild(row);

    });
}


/* ================= AI INSIGHT ================= */

function generateAIInsight(topics, overallScore) {

    const insight =
        document.getElementById("aiInsight");


    const entries =
        Object.entries(topics);


    if (entries.length === 0) {

        insight.textContent =
            "Complete an assessment to receive personalized AI learning insights.";

        return;
    }


    const strongest =
        [...entries].sort(
            (a, b) => b[1] - a[1]
        )[0];


    const weakest =
        [...entries].sort(
            (a, b) => a[1] - b[1]
        )[0];


    if (overallScore >= 80) {

        insight.textContent =
            `Your overall performance is strong. ${strongest[0]} is currently one of your strongest areas with ${strongest[1]}%. Continue practicing advanced concepts while maintaining your fundamentals.`;

    }

    else if (overallScore >= 60) {

        insight.textContent =
            `You have a solid foundation. ${strongest[0]} is currently your strongest area at ${strongest[1]}%. Your main opportunity for improvement is ${weakest[0]}, where your current score is ${weakest[1]}%.`;

    }

    else {

        insight.textContent =
            `Your assessment shows that you would benefit from strengthening your fundamentals. ${weakest[0]} currently needs the most attention with a score of ${weakest[1]}%. SmartLearn recommends focusing on this topic before moving to more advanced concepts.`;

    }
}


/* ================= RECOMMENDATIONS ================= */

function generateRecommendations(topics) {

    const container =
        document.getElementById("recommendations");

    container.innerHTML = "";


    const entries =
        Object.entries(topics)
        .sort((a, b) => a[1] - b[1]);


    entries.slice(0, 4).forEach(
        ([topic, score]) => {

            let message = "";


            if (score < 40) {

                message =
                    `Start with the fundamentals of ${topic} and solve beginner-level problems.`;

            }

            else if (score < 60) {

                message =
                    `Review important ${topic} concepts and practice more basic-to-medium problems.`;

            }

            else if (score < 80) {

                message =
                    `Strengthen your ${topic} skills by solving medium-level problems consistently.`;

            }

            else {

                message =
                    `You are performing well in ${topic}. Try advanced problems to challenge yourself.`;

            }


            const card =
                document.createElement("div");

            card.className =
                "recommendation";


            card.innerHTML = `

                <div class="recommendation-icon">
                    <i class="fa-solid fa-lightbulb"></i>
                </div>

                <div>
                    <h4>${topic}</h4>
                    <p>${message}</p>
                </div>

            `;


            container.appendChild(card);

        }
    );
}


/* ================= LEARNING PATH ================= */

function generateLearningPath(topics) {

    const container =
        document.getElementById("learningPath");

    container.innerHTML = "";


    const weakTopics =
        Object.entries(topics)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 3);


    if (weakTopics.length === 0) {

        container.innerHTML =
            `<p style="color:#64748b;">
                Complete an assessment to generate your learning path.
             </p>`;

        return;
    }


    weakTopics.forEach(
        ([topic, score], index) => {

            const step =
                document.createElement("div");

            step.className =
                "path-step";


            step.innerHTML = `

                <div class="path-number">
                    ${index + 1}
                </div>

                <h4>${topic}</h4>

                <p>
                    ${score < 60
                        ? "Learn fundamentals"
                        : "Strengthen skills"}
                </p>

            `;


            container.appendChild(step);


            if (index < weakTopics.length - 1) {

                const arrow =
                    document.createElement("div");

                arrow.className =
                    "path-arrow";

                arrow.innerHTML =
                    `<i class="fa-solid fa-arrow-right"></i>`;

                container.appendChild(arrow);
            }

        }
    );
}


/* ================= NO ASSESSMENT ================= */

function showNoAssessment() {

    document.getElementById("overallScore")
        .textContent = "--%";

    document.getElementById("performanceTitle")
        .textContent = "No Assessment Found";

    document.getElementById("performanceMessage")
        .textContent =
        "Complete an assessment first to generate your personalized AI analysis.";

    document.getElementById("correctAnswers")
        .textContent = "--";

    document.getElementById("totalQuestions")
        .textContent = "--";

    document.getElementById("topicsAnalyzed")
        .textContent = "--";


    document.getElementById("topicAnalysis")
        .innerHTML = `
            <p style="color:#64748b;">
                No assessment data is available.
            </p>
        `;


    document.getElementById("aiInsight")
        .textContent =
        "Complete your assessment to unlock SmartLearn AI insights.";

    document.getElementById("recommendations")
        .innerHTML = `
            <div class="recommendation">

                <div class="recommendation-icon">
                    <i class="fa-solid fa-clipboard-check"></i>
                </div>

                <div>
                    <h4>Take an Assessment</h4>

                    <p>
                        Complete the assessment so SmartLearn
                        can identify your learning strengths
                        and weak areas.
                    </p>
                </div>

            </div>
        `;

    document.getElementById("learningPath")
        .innerHTML = `
            <p style="color:#64748b;">
                Your personalized learning path will appear
                after completing an assessment.
            </p>
        `;
}


/* ================= NAVIGATION ================= */

function goToDashboard() {

    window.location.href =
        "student-dashboard.html";
}


function goToPractice() {

    /*
       Practice module will be connected
       when we build the Practice section.
    */

    window.location.href =
        "student-dashboard.html#practice";
}