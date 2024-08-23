// Ensure all dropdowns are initially closed
document.querySelectorAll(".dropdown-menu").forEach((menu) => {
    menu.style.display = "none"; // Oculta todos os menus dropdown
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
                otherMenu.style.display = "none"; // Fecha dropdowns abertos
                otherMenu.parentElement.classList.remove("active"); // Remove a classe 'active'
                otherMenu.previousElementSibling.querySelector(
                    "i"
                ).style.transform = "rotate(0deg)"; // Restaura a posição do ícone
            }
        });

        // Toggle the current dropdown
        if (menu.style.display === "none") {
            menu.style.display = "flex"; // Exibe o menu dropdown
            parentDropdown.classList.add("active"); // Adiciona a classe 'active' ao dropdown
            this.querySelector("i").style.transform = "rotate(180deg)"; // Gira o ícone para baixo
        } else {
            menu.style.display = "none"; // Oculta o menu dropdown
            parentDropdown.classList.remove("active"); // Remove a classe 'active'
            this.querySelector("i").style.transform = "rotate(0deg)"; // Gira o ícone para a posição original
        }
    });
});

// Toggle Fullscreen
const fullscreenToggle = document.getElementById("fullscreenToggle");

fullscreenToggle.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen(); // Ativa o modo fullscreen
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen(); // Sai do modo fullscreen
        }
    }
});

// Initialize SortableJS
const container = document.getElementById("sortableContainer");
const sortable = Sortable.create(container, {
    animation: 150, // Define a duração da animação ao arrastar
    handle: ".drag-handle", // Define que apenas o elemento com essa classe pode ser arrastado
    onEnd: function (evt) {
        const order = sortable.toArray(); // Captura a nova ordem dos elementos
        localStorage.setItem("dashboardOrder", JSON.stringify(order)); // Salva a ordem no localStorage
    },
});

// Restore order from localStorage
const savedOrder = JSON.parse(localStorage.getItem("dashboardOrder"));
if (savedOrder) {
    savedOrder.forEach((id) => {
        const element = document.querySelector(`[data-id='${id}']`);
        container.appendChild(element); // Reordena os elementos conforme o salvo no localStorage
    });
}

// Script para atualizar o relógio
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;
}

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);
updateClock(); // Atualiza imediatamente o relógio

// Preloader Script
document.addEventListener("DOMContentLoaded", function () {
    // Simular busca de dados com setTimeout
    setTimeout(() => {
        document.getElementById("preloader").style.display = "none"; // Remove o preloader após 2 segundos
        document.body.classList.add("content-loaded"); // Adiciona classe para mostrar o conteúdo suavemente
    }, 2000);
});

// Theme Toggle Script
document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const body = document.body;

    // Load the saved theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        body.classList.add("dark-theme"); // Ativa o tema escuro
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-theme"); // Alterna entre tema claro e escuro

        if (body.classList.contains("dark-theme")) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
            localStorage.setItem("theme", "dark"); // Salva o tema escuro no localStorage
        } else {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
            localStorage.setItem("theme", "light"); // Salva o tema claro no localStorage
        }
    });
});

// Letter by Letter Loader Animation
document.addEventListener("DOMContentLoaded", function () {
    const loaderText = document.getElementById("loaderText");
    const text = loaderText.innerText;
    loaderText.innerHTML = ''; // Limpa o texto original

    // Cria spans para cada letra e aplica a animação
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.innerText = text[i];
        span.style.animationDelay = `${i * 0.2}s`; // Define o delay entre as letras
        loaderText.appendChild(span);
    }

    loaderText.style.opacity = 1; // Exibe o texto
});
