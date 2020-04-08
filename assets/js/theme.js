// Sets the theme before the body loads to reduce white "flashing"
if (localStorage.getItem("theme") == "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    document.querySelector("meta[name='theme-color']").setAttribute("content", "#2e3233");
}