function loadTheme() {
    // Temporarily disable CSS transitions
    document.body.classList.add("no-transition");

    var img = document.querySelectorAll("img");

    if (localStorage.getItem("theme") == "dark") {
        for (var i = 0; i < img.length; i++) {
            var src = img[i].getAttribute("src");
            var newSrc = src.replace("/light-mode/", "/dark-mode/");
            img[i].setAttribute("src", newSrc);
        }

        // Check if browser support CSS variables and provide fallback
        if (supportsCssVars) {
            document.documentElement.setAttribute("data-theme", "dark");
            document.querySelector("meta[name='theme-color']").setAttribute("content", "#2e3233");
        } else {
            // Load separate dark mode CSS file
            var css = document.createElement("link");
            css.id = "dark-mode";
            css.setAttribute("rel", "stylesheet");
            css.setAttribute("href", "/assets/css/dark-mode.css");
            document.head.appendChild(css);

            // Call CSS variables ponyfill
            cssVars();
        }
    }

    else {
        for (var i = 0; i < img.length; i++) {
            var src = img[i].getAttribute("src");
            var newSrc = src.replace("/dark-mode/", "/light-mode/");
            img[i].setAttribute("src", newSrc);
        }

        // Check if browser support CSS variables and provide fallback
        if (supportsCssVars) {
            document.documentElement.removeAttribute("data-theme");
            document.querySelector("meta[name='theme-color']").setAttribute("content", "#ffffff");
        } else {
            // Remove separate dark mode CSS file
            var css = document.getElementById("dark-mode");
            if (css) {
                document.head.removeChild(css);
            }

            // Call CSS variables ponyfill
            cssVars();
        }
    }

    // Re-enable CSS transitions
    setTimeout(function () {
        document.body.classList.remove("no-transition");
    }, 200);
}

// Toggle dark mode on/off
function toggleDarkMode() {
    if (localStorage.getItem("theme") == "dark") {
        localStorage.setItem("theme", "light");
    }

    else {
        localStorage.setItem("theme", "dark");
    }

    loadTheme();
}

// Open/close a modal by passing element ID and true/false
function showModal(modalId, show) {
    if (show) {
        document.getElementById(modalId).classList.remove("modal-hidden");
    }

    else {
        document.getElementById(modalId).classList.add("modal-hidden");
    }
}

function newList() {
    window.location = "/new";
}

function openList() {
    var id = document.getElementById("open-list-modal-input").value.toLowerCase();

    if (id) {
        window.location = "/list/?id=" + id;
    }
}

// Check theme preference on load
loadTheme();

// Disables CSS hover effects on touch devices
function watchForHover() {
    var hasHoverClass = false;
    var lastTouchTime = 0;

    function enableHover() {

        // Discard emulated mouseMove events coming from touch events
        if (!hasHoverClass && new Date() - lastTouchTime >= 500) {
            document.body.classList.add("no-touch");
            hasHoverClass = true;
        }
    }

    function disableHover() {
        if (hasHoverClass) {
            document.body.classList.remove("no-touch");
            hasHoverClass = false;
        }
    }

    function updateLastTouchTime() {
        lastTouchTime = new Date();
    }

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
    document.getElementById("open-list-modal").classList.remove("modal-hidden");
}

);

document.getElementById("open-list-modal-open-button").addEventListener("click", openList);

document.getElementById("open-list-modal-input").addEventListener("keypress", function (e) {

    // Runs function if enter is pressed
    if (e.keyCode == 13) {
        openList();
    }
}

);

// Code for closing any modal
var modals = document.getElementsByClassName("modal");

for (var i = 0; i < modals.length; i++) {

    // Close when clicking outside modal
    modals[i].addEventListener("click", function () {
        if (event.target.classList.contains("modal")) {
            showModal(this.id, false);
        }
    }

    );

    // Close when clicking button
    var closeButton = modals[i].getElementsByClassName("close-modal")[0];

    closeButton.addEventListener("click", function () {
        showModal(this.parentElement.parentElement.parentElement.parentElement.id, false);
    }

    );
}