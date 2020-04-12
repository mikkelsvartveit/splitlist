// Load ponyfill if browser does not support CSS variables
var supportsCssVars = true;
if (!(window.CSS && CSS.supports("color", "var(--test-var)"))) {
    console.log("Browser does not support CSS variables, using ponyfill...");

    var scriptEl = document.createElement("script");
    scriptEl.src = "/assets/js/css-vars-ponyfill.js";
    document.head.appendChild(scriptEl);

    var supportsCssVars = false;
}

// Sets the theme before the body loads to reduce white "flashing"
if (localStorage.getItem("theme") == "dark") {
    if (supportsCssVars) {
        document.documentElement.setAttribute("data-theme", "dark");
        document.querySelector("meta[name='theme-color']").setAttribute("content", "#2e3233");
    }
}