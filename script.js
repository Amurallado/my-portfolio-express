// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initHeroSelector();
  initFAQAccordions();
  initLockedSections();
  initMobileMenu();
  initTaskbarClock();
  initThemeToggle();
  initSmoothScrolling();
  initWindowEffects();
});

// ==========================================
// LOADER
// ==========================================
function initLoader() {
  const loader = document.querySelector(".loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
      loader.style.pointerEvents = "none";
    }, 2000);
  }
}

// ==========================================
// HERO CHARACTER SELECTOR
// ==========================================
function initHeroSelector() {
  const playerOptions = document.querySelectorAll(".hero__option");
  const heroTitle = document.querySelector(".hero__title");
  const heroPicture = document.querySelector(".hero__picture");

  playerOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      // Update main image and title
      heroTitle.textContent = e.target.alt;
      heroPicture.src = e.target.src;
    });
  });
}

// ==========================================
// FAQ ACCORDIONS
// ==========================================
function initFAQAccordions() {
  const accordions = document.querySelectorAll(".questions__item");

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
      const answer = accordion.querySelector(".questions__answer");
      if (!answer) return;

      const isOpen = !answer.classList.contains("questions__answer--hidden");

      // Close all other accordions
      accordions.forEach((acc) => {
        const ans = acc.querySelector(".questions__answer");
        if (ans) {
          ans.classList.add("questions__answer--hidden");
        }
      });

      // Toggle current accordion
      if (!isOpen) {
        answer.classList.remove("questions__answer--hidden");
      }
    });
  });
}

// ==========================================
// LOCKED SECTIONS
// ==========================================
function initLockedSections() {
  const lockedSections = document.querySelectorAll(".locked");

  // Exit early if no locked sections exist
  if (lockedSections.length === 0) return;

  lockedSections.forEach((lockedElement) => {
    let timer;

    lockedElement.addEventListener("mousedown", () => {
      timer = setTimeout(() => {
        lockedElement.classList.remove("locked");
        lockedElement.style.maxHeight = "none";
      }, 2000);
    });

    lockedElement.addEventListener("mouseup", () => {
      clearTimeout(timer);
    });

    lockedElement.addEventListener("mouseleave", () => {
      clearTimeout(timer);
    });

    // Touch support
    lockedElement.addEventListener("touchstart", () => {
      timer = setTimeout(() => {
        lockedElement.classList.remove("locked");
        lockedElement.style.maxHeight = "none";
      }, 2000);
    });

    lockedElement.addEventListener("touchend", () => {
      clearTimeout(timer);
    });
  });
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".header__menu");
  const links = document.querySelectorAll(".header__link");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      menu.classList.toggle("header__menu--collapsed");
    });

    // Close menu when clicking a link
    links.forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.add("header__menu--collapsed");
      });
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        !menu.classList.contains("header__menu--collapsed")
      ) {
        menu.classList.add("header__menu--collapsed");
      }
    });
  }
}

// ==========================================
// TASKBAR CLOCK
// ==========================================
function initTaskbarClock() {
  const timeElement = document.getElementById("taskbar-time");
  const dateElement = document.getElementById("taskbar-date");

  function updateClock() {
    const now = new Date();

    // Format time
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    if (timeElement) {
      timeElement.textContent = `${hours}:${minutes}`;
    }

    // Format date
    if (dateElement) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      dateElement.textContent = now.toLocaleDateString("es-ES", options);
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// ==========================================
// THEME TOGGLE
// ==========================================
function initThemeToggle() {
  const toggleButton = document.querySelector(".taskbar__theme-toggle");
  const body = document.getElementById("darkmode");

  if (toggleButton && body) {
    toggleButton.addEventListener("click", () => {
      body.classList.toggle("body--darkmode");
    });
  }
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================
function initSmoothScrolling() {
  // Update active taskbar item on scroll
  const sections = document.querySelectorAll("section[id]");
  const taskbarItems = document.querySelectorAll(".taskbar__item");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    taskbarItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });
}

// ==========================================
// WINDOW EFFECTS
// ==========================================
function initWindowEffects() {
  // Window control button effects
  const closeButtons = document.querySelectorAll(".window__btn--close");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const windowparent = e.currentTarget.closest(".window");
      if (windowparent) {
        windowparent.remove();
      }
    });
  });

  // Minimize button effect
  const minimizeButtons = document.querySelectorAll(".window__btn--minimize");
  minimizeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const windowcontent = e.currentTarget.closest(".window").children[1];
      if (windowcontent) {
        windowcontent.classList.add("minimize");
      }
    });
  });
}

// Maximize button effect
const maximizeButtons = document.querySelectorAll(".window__btn--maximize");
maximizeButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const windowcontent = e.currentTarget.closest(".window").children[1];
    if (windowcontent) {
      windowcontent.classList.remove("minimize");
    }
  });
});

// ==========================================
// PARALLAX EFFECT FOR HERO
// ==========================================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");

  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.7;
  }
});
