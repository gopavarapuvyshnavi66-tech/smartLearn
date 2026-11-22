
/* =====================================================
   SMARTLEARN - STUDENT DASHBOARD JAVASCRIPT
===================================================== */


/* =====================================================
   LOAD STUDENT DATA
===================================================== */

function loadStudentData() {

    const storedUser =
        localStorage.getItem("studentUser");

    /*
        If there is no registered student,
        return to the login page.
    */

    if (!storedUser) {

        window.location.href = "index.html";
        return;

    }

    try {

        const user = JSON.parse(storedUser);

        const studentName = user.name || "Student";

        /*
            Display registered student's name
        */

        document.getElementById(
            "sidebarStudentName"
        ).textContent = studentName;

        document.getElementById(
            "topStudentName"
        ).textContent = studentName;

        document.getElementById(
            "welcomeName"
        ).textContent = studentName;

    } catch (error) {

        console.error(
            "Error loading student information:",
            error
        );

    }

}


/* =====================================================
   SHOW SECTION
===================================================== */

function showSection(sectionName, clickedItem) {

    /*
        Hide all sections
    */

    const sections =
        document.querySelectorAll(".page-section");

    sections.forEach(section => {
        section.classList.remove("active-section");
    });

    /*
        Show selected section
    */

    const selectedSection =
        document.getElementById(sectionName + "Section");

    if (selectedSection) {
        selectedSection.classList.add("active-section");
    }

    /*
        Remove active navigation
    */

    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        item.classList.remove("active");
    });

    /*
        Activate clicked navigation
    */

    if (clickedItem) {
        clickedItem.classList.add("active");
    }

    /*
        Change top heading
    */

    updatePageTitle(sectionName);

    /*
        Close mobile sidebar
    */

    const sidebar = document.getElementById("sidebar");

    if (sidebar) {
        sidebar.classList.remove("mobile-open");
    }

    /*
        Scroll to top
    */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   SHOW SECTION FROM BUTTON
===================================================== */

function showSectionById(sectionName) {

    const sections =
        document.querySelectorAll(".page-section");

    sections.forEach(section => {
        section.classList.remove("active-section");
    });

    const selectedSection =
        document.getElementById(sectionName + "Section");

    if (selectedSection) {
        selectedSection.classList.add("active-section");
    }

    /*
        Update sidebar
    */

    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        item.classList.remove("active");
    });

    /*
        Match section with navigation
    */

    navItems.forEach(item => {

        const action = item.getAttribute("onclick");

        if (
            action &&
            action.includes(
                "showSection('" + sectionName + "'"
            )
        ) {
            item.classList.add("active");
        }

    });

    updatePageTitle(sectionName);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   UPDATE PAGE TITLE
===================================================== */

function updatePageTitle(sectionName) {

    const title =
        document.getElementById("currentPageTitle");

    const titles = {

        dashboard: "Dashboard",
        assessment: "Assessment",
        learn: "Learn",
        practice: "Practice",
        analysis: "AI Analysis",
        progress: "My Progress",
        recommendations: "My Learning"

    };

    if (title) {
        title.textContent =
            titles[sectionName] || "Dashboard";
    }

}


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

function toggleSidebar() {

    const sidebar = document.getElementById("sidebar");

    if (sidebar) {
        sidebar.classList.toggle("mobile-open");
    }

}


/* =====================================================
   PRACTICE
===================================================== */

function startPractice(topic) {

    showToast(
        "Starting " + topic + " practice..."
    );

    /*
        Later, connect this to the actual practice page.
    */

}


/* =====================================================
   OPEN ASSESSMENT
===================================================== */

function openAssessment() {

    window.location.href = "assessment.html";

}


/* =====================================================
   OPEN PERSONALIZED LEARNING
===================================================== */

function openPersonalizedLearning() {

    window.location.href = "./personalized-learning.html";

}


/* =====================================================
   LOGOUT
===================================================== */

function logoutStudent() {

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
        return;
    }

    /*
        Clear temporary session
    */

    sessionStorage.removeItem("smartLearnLoggedIn");

    showToast("Logged out successfully.");

    setTimeout(() => {

        window.location.href = "index.html";

    }, 800);

}


/* =====================================================
   TOAST MESSAGE
===================================================== */

function showToast(message) {

    const toast =
        document.getElementById("dashboardToast");

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.dashboardToastTimer);

    window.dashboardToastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    loadStudentData();

    /*
        Connect My Learning to the separate page.
        This does not affect other dashboard navigation.
    */

    const myLearningLink = document.querySelector(
        '.sidebar-nav a[href="personalized-learning.html"]'
    );

    if (myLearningLink) {

        myLearningLink.addEventListener("click", function (event) {

            event.preventDefault();

            openPersonalizedLearning();

        });

    }

});
