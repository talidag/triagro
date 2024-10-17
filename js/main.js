// Navbar

document.querySelectorAll(".navbar ul > li").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    const submenu = this.querySelector(".submenu");
    if (submenu) submenu.style.display = "block";
  });

  item.addEventListener("mouseleave", function () {
    const submenu = this.querySelector(".submenu");
    if (submenu) submenu.style.display = "none";
  });
});

// Parteneri scroller animation

const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

// Intrebari
const intrebariCards = document.querySelectorAll(".intrebari__card");

intrebariCards.forEach((card) => {
  const rightArrowQ = card.querySelector(".arrow-right-q");

  const downArrowQ = card.querySelector(".arrow-down-q");
  const intrebariAnswer = card.querySelector(".intrebari-answer");

  rightArrowQ.addEventListener("click", () => {
    toggleArrows(rightArrowQ, downArrowQ, intrebariAnswer);
  });

  downArrowQ.addEventListener("click", () => {
    toggleArrows(rightArrowQ, downArrowQ, intrebariAnswer);
  });
});

const toggleArrows = (rightArrow, downArrow, intrebariAnswer) => {
  rightArrow.classList.toggle("invisible");
  downArrow.classList.toggle("invisible");
  intrebariAnswer.classList.toggle("invisible");
};

// Mobile version

const hamburgerMenuIcon = document.querySelector(".hamburger-menu-icon");
const closeMenuIcon = document.querySelector(".close-menu-icon");
const navLinksList = document.querySelector(".nav__links__list");
const navLinks = document.querySelectorAll(".nav__links__list a");
const logoEl = document.querySelector(".nav-logo-container");
const headerTop = document.querySelector(".navbar");
const headerBot = document.querySelector(".header-bot");

document.addEventListener("DOMContentLoaded", function () {
  hamburgerMenuIcon.addEventListener("click", function () {
    hamburgerMenuIcon.style.display = "none";
    closeMenuIcon.style.display = "block";
    headerTop.style.display = "flex";
    headerBot.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  closeMenuIcon.addEventListener("click", function () {
    hamburgerMenuIcon.style.display = "block";
    closeMenuIcon.style.display = "none";
    headerTop.style.display = "none";
    headerBot.style.display = "none";
    document.body.style.overflow = "visible";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  logoEl.addEventListener("click", closeMenu);

  const navbarHeight = 125;

  function scrollToElement(elementId) {
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
      let offsetTop = targetElement.offsetTop - navbarHeight;
      if (targetElement.id === "despre" && window.innerWidth < 1100) {
        offsetTop = targetElement.offsetTop - navbarHeight + 120;
      }

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  const navLinksA = document.querySelectorAll(".nav__links__list > li > a");
  const footerLinksA = document.querySelectorAll(".footer-links li a");

  if (document.location.pathname == "/index.html") {
    navLinksA.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        scrollToElement(targetId);
      });
    });

    footerLinksA.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        scrollToElement(targetId);
      });
    });
  }

  // TEST

  function scrollToSection(targetId) {
    window.location.href = `index.html#${targetId}`;
  }

  function handleLinkClick(event) {
    const targetId = this.getAttribute("href").substring(1);

    if (document.location.pathname !== "/index.html") {
      event.preventDefault();
      scrollToSection(targetId);
    } else {
      scrollToElement(targetId, 125);
    }
  }

  function scrollToElement(elementId, offset) {
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - offset;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  navLinksA.forEach((link) => {
    link.addEventListener("click", handleLinkClick);
  });

  footerLinksA.forEach((link) => {
    link.addEventListener("click", handleLinkClick);
  });

  if (document.location.pathname === "/index.html") {
    const hash = window.location.hash.substring(1);

    if (hash) {
      window.onload = function () {
        scrollToElement(hash, 125);
      };
    }
  }
});

function closeMenu() {
  if (window.innerWidth < 1100) {
    hamburgerMenuIcon.style.display = "block";
    closeMenuIcon.style.display = "none";
    document.body.style.overflow = "visible";
    headerTop.style.display = "none";
    headerBot.style.display = "none";
  }
}

// Arrows

const arrow = document.querySelectorAll(".arrow");

if (window.innerWidth > 1200) {
  arrow.forEach((arr) => (arr.innerHTML = " ▸"));
} else {
  arrow.forEach((arr) => (arr.innerHTML = " ▾"));
}
