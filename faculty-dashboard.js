/* =========================================================
   SMARTLEARN - FACULTY DASHBOARD JAVASCRIPT
   ========================================================= */


/* =========================================================
   CURRENT USER
   ========================================================= */

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


/* =========================================================
   AUTHENTICATION CHECK
   ========================================================= */

if (!currentUser || currentUser.role !== "faculty") {

    window.location.href = "index.html";

}


/* =========================================================
   DOM LOADED
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       FACULTY INFORMATION
       ========================= */

    const facultyName =
        document.getElementById("facultyName");

    const facultyEmail =
        document.getElementById("facultyEmail");

    const profileFacultyName =
        document.getElementById("profileFacultyName");

    const profileFacultyEmail =
        document.getElementById("profileFacultyEmail");


    const name =
        currentUser?.name || "Faculty";

    const email =
        currentUser?.email || "Faculty Account";


    if (facultyName) {
        facultyName.textContent = name;
    }


    if (facultyEmail) {
        facultyEmail.textContent = email;
    }


    if (profileFacultyName) {
        profileFacultyName.textContent = name;
    }


    if (profileFacultyEmail) {
        profileFacultyEmail.textContent = email;
    }


    /* =========================
       NAVIGATION
       ========================= */

    const navItems =
        document.querySelectorAll(".nav-item[data-section]");

    const sections =
        document.querySelectorAll(".dashboard-section");


    navItems.forEach(item => {

        item.addEventListener("click", event => {

            event.preventDefault();

            const target =
                item.getAttribute("data-section");

            navigateToSection(target);

        });

    });


    /* =========================
       STUDENT SEARCH
       ========================= */

    const searchInput =
        document.getElementById("studentSearch");


    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const searchValue =
                searchInput.value.toLowerCase().trim();


            const studentRows =
                document.querySelectorAll(".student-row");


            studentRows.forEach(row => {

                const rowText =
                    row.textContent.toLowerCase();


                if (rowText.includes(searchValue)) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        });

    }


    /* =========================
       MOBILE SIDEBAR
       ========================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const sidebar =
        document.getElementById("sidebar");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");


    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            sidebar.classList.toggle("open");

            sidebarOverlay.classList.toggle("show");

        });

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener("click", () => {

            sidebar.classList.remove("open");

            sidebarOverlay.classList.remove("show");

        });

    }

});


/* =========================================================
   NAVIGATE TO SECTION
   ========================================================= */

function navigateToSection(sectionId) {

    const sections =
        document.querySelectorAll(".dashboard-section");


    const navItems =
        document.querySelectorAll(".nav-item[data-section]");


    sections.forEach(section => {

        section.classList.remove("active");

    });


    navItems.forEach(item => {

        item.classList.remove("active");

    });


    const targetSection =
        document.getElementById(sectionId);


    const targetNav =
        document.querySelector(
            `.nav-item[data-section="${sectionId}"]`
        );


    if (targetSection) {

        targetSection.classList.add("active");

    }


    if (targetNav) {

        targetNav.classList.add("active");

    }


    /* Update URL */

    history.replaceState(
        null,
        "",
        "#" + sectionId
    );


    /* Close mobile sidebar */

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("sidebarOverlay");


    if (sidebar) {
        sidebar.classList.remove("open");
    }


    if (overlay) {
        overlay.classList.remove("show");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logoutUser(event) {

    if (event) {
        event.preventDefault();
    }


    localStorage.removeItem("currentUser");


    window.location.href = "index.html";

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(
    message,
    type = "success"
) {

    const toast =
        document.getElementById("toast");


    if (!toast) {
        return;
    }


    toast.textContent = message;


    toast.className =
        "toast show " + type;


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================================
   VIEW STUDENT
   ========================================================= */

function viewStudent(studentName) {

    showToast(
        "Opening " + studentName + "'s profile..."
    );

}


/* =========================================================
   GENERATE REPORT
   ========================================================= */

function generateReport() {

    showToast(
        "Generating progress report..."
    );

}


/* =========================================================
   EXPORT DATA
   ========================================================= */

function exportData() {

    showToast(
        "Student data export started..."
    );

}


/* =========================================================
   OPEN SECTION FROM URL
   ========================================================= */

window.addEventListener("DOMContentLoaded", () => {

    const sectionFromUrl =
        window.location.hash.replace("#", "");


    if (sectionFromUrl) {

        const section =
            document.getElementById(sectionFromUrl);


        if (section) {

            navigateToSection(sectionFromUrl);

        }

    }

});