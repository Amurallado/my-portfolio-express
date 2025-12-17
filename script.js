// Todas las secciones tienen un diseño aleatorio
const modeLight = document.querySelector(".random__button");
modeLight.addEventListener("click", () =>
  document.querySelector("#darkmode").classList.toggle("darkmode")
);

// Cambia la foto del persona y su trabajo
const playeroptions = document.querySelectorAll(".hero__option");
playeroptions.forEach((element) => {
  element.addEventListener("click", (e) => {
    document.querySelector(".hero__title").textContent = e.target.alt;
    document.querySelector(".hero__mypicture").src = e.target.src;
  });
});

// FAQ Acordeones
const questionsAcordeon = document.querySelectorAll(".questions__acordeon");
questionsAcordeon.forEach((questionGroup) => {
  questionGroup.addEventListener("click", () => {
    const questionsAnswer = questionGroup.children[1];
    questionsAnswer.classList.toggle("questions--hidden");
  });
});

// Desbloquear elementos bloqueados
const lockedSections = document.querySelectorAll(".locked");
lockedSections.forEach((lockedElement) => {
  let temporizador;
  lockedElement.addEventListener("mousedown", () => {
    temporizador = setTimeout(() => {
      lockedElement.classList.remove("locked");
    }, 2000); // 2 segundos
  });

  lockedElement.addEventListener("mouseup", () => {
    clearTimeout(temporizador); // Cancela si se suelta antes
  });

  lockedElement.addEventListener("mouseleave", () => {
    clearTimeout(temporizador); // Cancela si se sale del área
  });
});

// Burger Menu
document.querySelector(".header__burger").addEventListener("click", () => {
  document.querySelector(".header__menu").classList.toggle("collapsed");
});

// Menu Links collapse Parent
document.querySelectorAll(".header__link").forEach((menulink) => {
  menulink.addEventListener("click", () => {
    document.querySelector(".header__menu").classList.toggle("collapsed");
  });
});

// Random Design Botones
// document.querySelector(".random__button").addEventListener("click", () => {
//   design();
// });
// const modeLight = document.querySelector(".darkmode");
// function design() {
//   const styleRandom = () => {
//     return Math.floor(Math.random() * 2);
//   };
//   sections.forEach((section) => {
//     if (styleRandom() === 1) {
//       section.classList.toggle("darkmode");
//     }
//   });
// }
