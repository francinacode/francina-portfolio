/**********************
 ✨ CURSOR STARS
**********************/

document.addEventListener("mousemove", (e) => {
  createStar(e.clientX, e.clientY);
});

function createStar(x, y) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.innerHTML = "*";

  const offsetX = (Math.random() - 0.5) * 40;
  const offsetY = (Math.random() - 0.5) * 40;

  star.style.left = x + offsetX + "px";
  star.style.top = y + offsetY + "px";

  document.body.appendChild(star);

  setTimeout(() => {
    star.style.opacity = 0;
    star.style.transform = "translateY(20px) scale(0.5)";
  }, 50);

  setTimeout(() => {
    star.remove();
  }, 200);
}


const toggle = document.getElementById("langToggle");
const options = document.getElementById("langOptions");

toggle.addEventListener("click", () => {
  options.classList.toggle("active");
});

document.querySelectorAll("[data-lang]").forEach(button => {
  button.addEventListener("click", () => {
    const selectedLang = button.getAttribute("data-lang");
    localStorage.setItem("language", selectedLang);
    options.classList.remove("active");

    // Después acá vamos a ejecutar la función de traducción
    console.log("Idioma seleccionado:", selectedLang);
  });
});

// Cerrar si se hace click afuera
document.addEventListener("click", (e) => {
  if (!e.target.closest(".language-selector")) {
    options.classList.remove("active");
  }
});





