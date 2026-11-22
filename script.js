/* =====================================================
   SMARTLEARN AUTHENTICATION
===================================================== */


/* Current selected role */

let selectedRole = "student";


/* =====================================================
   SELECT ROLE
===================================================== */

function selectRole(role) {

    selectedRole = role;


    // Hide landing page

    document
        .getElementById("landingPage")
        .classList.add("hidden");


    // Show authentication page

    document
        .getElementById("authPage")
        .classList.remove("hidden");


    // Change Student / Faculty information

    updateAuthPage();


    // Open login by default

    showLogin();

}


/* =====================================================
   UPDATE AUTH PAGE
===================================================== */

function updateAuthPage() {

    const authWelcome =
        document.getElementById("authWelcome");


    const authDescription =
        document.getElementById("authDescription");


    const authRoleIcon =
        document.getElementById("authRoleIcon");


    const loginTitle =
        document.getElementById("loginTitle");


    const registerTitle =
        document.getElementById("registerTitle");


    /* ================= STUDENT ================= */

    if (selectedRole === "student") {

        authWelcome.textContent =
            "Welcome, Student!";


        authDescription.textContent =
            "Start your personalized learning journey with SmartLearn.";


        authRoleIcon.innerHTML =
            '<i class="fa-solid fa-user-graduate"></i>';


        loginTitle.textContent =
            "Student Login";


        registerTitle.textContent =
            "Create Student Account";

    }


    /* ================= FACULTY ================= */

    else {

        authWelcome.textContent =
            "Welcome, Faculty!";


        authDescription.textContent =
            "Empower your students with smarter learning insights.";


        authRoleIcon.innerHTML =
            '<i class="fa-solid fa-chalkboard-user"></i>';


        loginTitle.textContent =
            "Faculty Login";


        registerTitle.textContent =
            "Create Faculty Account";

    }

}


/* =====================================================
   SHOW LOGIN
===================================================== */

function showLogin() {

    document
        .getElementById("loginForm")
        .classList.remove("hidden");


    document
        .getElementById("registerForm")
        .classList.add("hidden");


    document
        .getElementById("forgotForm")
        .classList.add("hidden");

}


/* =====================================================
   SHOW REGISTER
===================================================== */

function showRegister() {

    document
        .getElementById("loginForm")
        .classList.add("hidden");


    document
        .getElementById("registerForm")
        .classList.remove("hidden");


    document
        .getElementById("forgotForm")
        .classList.add("hidden");

}


/* =====================================================
   SHOW FORGOT PASSWORD
===================================================== */

function showForgot() {

    document
        .getElementById("loginForm")
        .classList.add("hidden");


    document
        .getElementById("registerForm")
        .classList.add("hidden");


    document
        .getElementById("forgotForm")
        .classList.remove("hidden");

}


/* =====================================================
   GO BACK TO HOME
===================================================== */

function goHome() {

    document
        .getElementById("authPage")
        .classList.add("hidden");


    document
        .getElementById("landingPage")
        .classList.remove("hidden");


    // Reset to student role

    selectedRole = "student";

}


/* =====================================================
   SHOW / HIDE PASSWORD
===================================================== */

function togglePassword(inputId, icon) {

    const input =
        document.getElementById(inputId);


    if (input.type === "password") {

        input.type = "text";


        icon.classList.remove("fa-eye");


        icon.classList.add("fa-eye-slash");

    }

    else {

        input.type = "password";


        icon.classList.remove("fa-eye-slash");


        icon.classList.add("fa-eye");

    }

}


/* =====================================================
   REGISTER USER
===================================================== */

function registerUser(event) {

    event.preventDefault();


    /* Get values */

    const name =
        document
            .getElementById("registerName")
            .value
            .trim();


    const email =
        document
            .getElementById("registerEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("registerPassword")
            .value;


    const confirmPassword =
        document
            .getElementById("confirmPassword")
            .value;


    /* Password length */

    if (password.length < 6) {

        showToast(
            "Password must contain at least 6 characters."
        );

        return;

    }


    /* Password match */

    if (password !== confirmPassword) {

        showToast(
            "Passwords do not match."
        );

        return;

    }


    /* Check whether account already exists */

    const existingUser =
        localStorage.getItem(
            selectedRole + "User"
        );


    if (existingUser) {

        const user =
            JSON.parse(existingUser);


        if (user.email === email) {

            showToast(
                "An account with this email already exists."
            );

            return;

        }

    }


    /* Create user object */

    const user = {

        name: name,

        email: email,

        password: password,

        role: selectedRole

    };


    /* Save account */

    localStorage.setItem(

        selectedRole + "User",

        JSON.stringify(user)

    );


    /* Success message */

    showToast(

        selectedRole === "student"

            ? "Student account created successfully!"

            : "Faculty account created successfully!"

    );


    /* Clear form */

    document
        .getElementById("registerForm")
        .querySelector("form")
        .reset();


    /* Move to login */

    setTimeout(() => {

        showLogin();


        document
            .getElementById("loginEmail")
            .value = email;

    }, 1200);

}


/* =====================================================
   LOGIN
===================================================== */

function loginUser(event) {

    event.preventDefault();


    /* Get values */

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    /* Get stored account */

    const storedUser =
        localStorage.getItem(
            selectedRole + "User"
        );


    /* Account doesn't exist */

    if (!storedUser) {

        showToast(
            "No account found. Please register first."
        );

        return;

    }


    const user =
        JSON.parse(storedUser);


    /* Verify login */

    if (
        user.email === email &&
        user.password === password
    ) {

        /* =========================================
           IMPORTANT:
           Save currently logged-in user
        ========================================= */

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );


        /* Success message */

        showToast(
            selectedRole === "student"
                ? "Student login successful!"
                : "Faculty login successful!"
        );


        /* =========================================
           REDIRECT TO CORRECT DASHBOARD
        ========================================= */

        setTimeout(() => {

            if (selectedRole === "student") {

                window.location.href =
                    "student-dashboard.html";

            }

            else {

                window.location.href =
                    "faculty-dashboard.html";

            }

        }, 1000);

    }


    else {

        showToast(
            "Invalid email or password."
        );

    }

}


/* =====================================================
   FORGOT PASSWORD
===================================================== */

function resetPassword(event) {

    event.preventDefault();


    const email =
        document
            .getElementById("forgotEmail")
            .value
            .trim()
            .toLowerCase();


    /* Find account */

    const storedUser =
        localStorage.getItem(
            selectedRole + "User"
        );


    if (!storedUser) {

        showToast(
            "No account found for this role."
        );

        return;

    }


    const user =
        JSON.parse(storedUser);


    /* Check email */

    if (user.email !== email) {

        showToast(
            "Email does not match our records."
        );

        return;

    }


    /*
        Prototype only.

        Later this will connect
        to the backend and send
        a real password reset email.
    */

    showToast(
        "Password reset link sent successfully!"
    );


    document
        .getElementById("forgotEmail")
        .value = "";


    setTimeout(() => {

        showLogin();

    }, 1500);

}


/* =====================================================
   TOAST MESSAGE
===================================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent = message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}