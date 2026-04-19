/**********************
 🎬 SCROLL SYSTEM + FIXED TEXT
**********************/

const fixedText = document.getElementById("fixedText");
let currentActiveProject = null;

window.addEventListener("scroll", () => {

  const windowH = window.innerHeight;
  const projects = document.querySelectorAll(".project");

  let closestProject = null;
  let closestDistance = Infinity;

  projects.forEach((project) => {

    const rect = project.getBoundingClientRect();
    const offset = rect.top / windowH;
    const progress = 1 - Math.min(Math.max(offset, 0), 1);

    // 🎯 BASE SCALE (TU SISTEMA ORIGINAL)
    let scale = 1 - 0.2 * progress;
    const translateY = progress * -40;

    const distanceToCenter = Math.abs(
      rect.top + rect.height / 2 - windowH / 2
    );

    // 🔥 ACTIVE SCALE BOOST (TU SISTEMA ORIGINAL)
    const activeProgress = Math.max(0, 1 - distanceToCenter / 300);
    scale += activeProgress * 0.4;

    project.style.transform = `
      translateY(${translateY}px)
      scale(${scale})
    `;

    project.style.zIndex = Math.floor(1000 - distanceToCenter);

    // Detectar el proyecto más cercano al centro
    if (distanceToCenter < closestDistance) {
      closestDistance = distanceToCenter;
      closestProject = project;
    }

    // 🎬 VIDEO CONTROL (INTACTO)
    const video = project.querySelector(".video-hover");

    if (video) {
      if (distanceToCenter < 150) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }

  });

  // 🎯 ACTIVACIÓN DE TEXTO (Opción 1: cuando entra al centro)
  if (closestProject && closestDistance < 120) {

    if (currentActiveProject !== closestProject) {

      const newText = closestProject.querySelector(".project-text");

      if (newText) {

        currentActiveProject = closestProject;

        // Animación salida
        fixedText.style.opacity = 0;
        fixedText.style.filter = "blur(20px)";

        setTimeout(() => {
          fixedText.innerHTML = newText.innerHTML;

          // Animación entrada
          fixedText.style.opacity = 1;
          fixedText.style.filter = "blur(0px)";
        }, 180);

      }
    }

  } else {

    fixedText.style.opacity = 0;
    fixedText.style.filter = "blur(20px)";
    currentActiveProject = null;

  }

});



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



