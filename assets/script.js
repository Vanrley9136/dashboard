// Ensure all dropdowns are initially closed
document.querySelectorAll(".dropdown-menu").forEach((menu) => {
    menu.style.display = "none";
});

// Toggle Dropdowns on click
document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
        e.preventDefault();
        const parentDropdown = this.parentElement;
        const menu = parentDropdown.querySelector(".dropdown-menu");

        // Close any open dropdowns
        document.querySelectorAll(".dropdown-menu").forEach((otherMenu) => {
            if (otherMenu !== menu) {
                otherMenu.style.display = "none";
                otherMenu.parentElement.classList.remove("active");
                otherMenu.previousElementSibling.querySelector(
                    "i"
                ).style.transform = "rotate(0deg)";
            }
        });

        // Toggle the current dropdown
        if (menu.style.display === "none") {
            menu.style.display = "flex";
            parentDropdown.classList.add("active");
            this.querySelector("i").style.transform = "rotate(180deg)";
        } else {
            menu.style.display = "none";
            parentDropdown.classList.remove("active");
            this.querySelector("i").style.transform = "rotate(0deg)";
        }
    });
});

// Toggle Fullscreen
const fullscreenToggle = document.getElementById("fullscreenToggle");

fullscreenToggle.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

// Initialize SortableJS
const container = document.getElementById("sortableContainer");
const sortable = Sortable.create(container, {
    animation: 150,
    handle: ".drag-handle", // Define que apenas o elemento com essa classe pode ser arrastado
    onEnd: function (evt) {
        const order = sortable.toArray();
        localStorage.setItem("dashboardOrder", JSON.stringify(order));
    },
});

// Restore order from localStorage
const savedOrder = JSON.parse(localStorage.getItem("dashboardOrder"));
if (savedOrder) {
    savedOrder.forEach((id) => {
        const element = document.querySelector(`[data-id='${id}']`);
        container.appendChild(element);
    });
}

// Script para atualizar o relógio
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    document.getElementById(
        "clock"
    ).textContent = `${hours}:${minutes}:${seconds}`;
}

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);
updateClock(); // Chama para atualizar imediatamente

document.addEventListener("DOMContentLoaded", function () {
    // Simular busca de dados com setTimeout
    setTimeout(() => {
        // Remover o preloader após 2 segundos (simulação)
        document.getElementById("preloader").style.display = "none";

        // Adicionar classe para mostrar o conteúdo suavemente
        document.body.classList.add("content-loaded");
    }, 2000);
});

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const body = document.body;

    // Load the saved theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        body.classList.add("dark-theme");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-theme");

        if (body.classList.contains("dark-theme")) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
            localStorage.setItem("theme", "dark");
        } else {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
            localStorage.setItem("theme", "light");
        }
    });
});
