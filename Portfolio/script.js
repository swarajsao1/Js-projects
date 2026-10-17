const themeToggle = document.getElementById("theme-toggle");



themeToggle.addEventListener("click", function () {
    const isLight = document.body.classList.toggle("light-theme");

    if (isLight) {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "Switch to dark theme";
    } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "Switch to light theme";
    }
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

themeToggle.textContent =
    document.body.classList.contains("light-theme")
        ? "Switch to dark theme"
        : "Switch to light theme";

