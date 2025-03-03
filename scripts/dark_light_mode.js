document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const root = document.documentElement;
    const body = document.body;

    const savedTheme = localStorage.getItem("theme") || "light";

    if (savedTheme === "dark") {
        setDarkMode();
    } else {
        setLightMode();
    }

    themeToggle.addEventListener("click", () => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "light") {
            setDarkMode();
            localStorage.setItem("theme", "dark");
        } else {
            setLightMode();
            localStorage.setItem("theme", "light");
        }
    });

    function setDarkMode() {
        root.style.setProperty('--bg-color', 'rgb(20, 20, 20)');
        root.style.setProperty('--primary-color', '#5e7a92');
        root.style.setProperty('--alt-primary-color', '#3a4b35');
        root.style.setProperty('--secondary-color', '#c0c2c8');
        root.style.setProperty('--tertiary-color', '#f0f0f0');

        body.style.backgroundColor = 'rgb(20, 20, 20)';
        body.style.color = '#f0f0f0';
    }

    function setLightMode() {
        root.style.setProperty('--bg-color', 'rgb(255, 255, 255)');
        root.style.setProperty('--primary-color', '#95b8d1');
        root.style.setProperty('--alt-primary-color', '#c5dca0');
        root.style.setProperty('--secondary-color', '#666a86');
        root.style.setProperty('--tertiary-color', '#333333');

        body.style.backgroundColor = 'rgb(255, 255, 255)';
        body.style.color = '#333333'; 
    }
});