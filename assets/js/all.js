function loadTheme() {
    // Temporarily disable CSS transitions for 200ms
    document.body.classList.add("no-transition");
    setTimeout(() => document.body.classList.remove("no-transition"), 200);

    const imgs = document.querySelectorAll("img");

    if (localStorage.getItem("theme") === "dark") {
        // Set all icons to dark mode versions
        imgs.forEach(img => img.src = img.src.replace("/light-mode/", "/dark-mode/"));

        document.documentElement.setAttribute("data-theme", "dark");
        document.querySelector("meta[name='theme-color']").setAttribute("content", "#2e3233");
    }

    else {
        // Set all icons to light mode versions
        imgs.forEach(img => img.src = img.src.replace("/dark-mode/", "/light-mode/"));

        document.documentElement.setAttribute("data-theme", "light");
        document.querySelector("meta[name='theme-color']").setAttribute("content", "#ffffff");
    }
}

function toggleDarkMode() {
    if (localStorage.getItem("theme") === "dark") {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }

    loadTheme();
}

// Open/close a modal by passing element ID and true/false
function showModal(modalId, show) {
    if (show) {
        document.getElementById(modalId).classList.remove("modal-hidden");
    } else {
        document.getElementById(modalId).classList.add("modal-hidden");
    }
}

let wait;
function showSnackbar(snackbarId) {
    // Clears interval if a snackbar is already displayed
    if (wait) {
        clearInterval(wait);
    }

    // Shows snackbar for 5 seconds
    const el = document.getElementById(snackbarId);
    el.classList.add("snackbar-show");
    wait = setTimeout(() => el.classList.remove("snackbar-show"), 5000);
}

function newList() {
    window.location = "/new";
}

function openList() {
    const input = document.getElementById("open-list-modal-input").value.toLowerCase().split("=");
    const id = input[input.length - 1];

    if (id) {
        window.location = "/list/?id=" + id;
    }
}

// Check theme preference on load
loadTheme();

// Disables CSS hover effects on touch devices
function watchForHover() {
    let hasHoverClass = false;
    let lastTouchTime = 0;

    const enableHover = () => {
        // Discard emulated mouseMove events coming from touch events
        if (!hasHoverClass && new Date() - lastTouchTime >= 500) {
            document.body.classList.add("no-touch");
            hasHoverClass = true;
        }
    };

    const disableHover = () => {
        if (hasHoverClass) {
            document.body.classList.remove("no-touch");
            hasHoverClass = false;
        }
    };

    const updateLastTouchTime = () => {
        lastTouchTime = new Date();
    };

    document.addEventListener('touchstart', updateLastTouchTime, true);
    document.addEventListener('touchstart', disableHover, true);
    document.addEventListener('mousemove', enableHover, true);

    enableHover();
}
watchForHover();


// EVENT LISTENERS:

document.getElementById("dark-mode-button").addEventListener("click", toggleDarkMode);

document.getElementById("nav-new-list-button").addEventListener("click", newList);

document.getElementById("nav-open-list-button").addEventListener("click", function () {
    showModal("open-list-modal", true);

    // Set cursor to input field
    setTimeout(() => {
        document.getElementById("open-list-modal-input").focus();
        document.getElementById("open-list-modal-input").select();
    }, 100);
});

document.getElementById("open-list-modal-open-button").addEventListener("click", openList);

document.getElementById("open-list-modal-input").addEventListener("keypress", function (e) {
    // Runs function if enter is pressed
    if (e.keyCode === 13) {
        openList();
    }
});

// Code for closing any modal
const modals = document.getElementsByClassName("modal");
for (const modal of modals) {
    // Close when clicking outside modal
    modal.addEventListener("click", function () {
        if (event.target.classList.contains("modal")) {
            showModal(this.id, false);
        }
    });

    // Close when clicking button
    const closeButton = modal.querySelector(".close-modal");
    closeButton.addEventListener("click", function () {
        showModal(this.parentElement.parentElement.parentElement.parentElement.id, false);
    });
}