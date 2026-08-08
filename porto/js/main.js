/* ============================================================
   PORTFOLIO — MAIN.JS
   PART 1 / 2
   CORE INTERACTIONS + HERO + CURSOR
   ============================================================ */

"use strict";

/* ============================================================
   01. DOM READY
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initHero();
  initCursor();
  initSmoothLinks();
  initBackToTop();
  initCurrentYear();
});

/* ============================================================
   02. HERO INITIALIZATION
   ============================================================ */

function initHero() {
  const hero = document.querySelector(".hero-section");

  if (!hero) return;

  /*
   * Small delay allows the browser to render the initial
   * layout before triggering the entrance animation.
   */
  requestAnimationFrame(() => {
    setTimeout(() => {
      hero.classList.add("is-loaded");
    }, 100);
  });
}

/* ============================================================
   03. CUSTOM CURSOR
   ============================================================ */

function initCursor() {
  /*
   * Disable custom cursor for touch devices.
   */
  const isTouchDevice = window.matchMedia(
    "(hover: none) and (pointer: coarse)",
  ).matches;

  if (isTouchDevice) return;

  const cursor = document.querySelector(".custom-cursor");

  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let cursorX = mouseX;
  let cursorY = mouseY;

  /*
   * Mouse position
   */
  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    document.body.classList.add("cursor-active");
  });

  /*
   * Smooth cursor movement using requestAnimationFrame.
   */
  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(updateCursor);
  }

  updateCursor();

  /*
   * Interactive elements
   */
  const interactiveElements = document.querySelectorAll(
    "a, button, .project-image-link, .expertise-item, .contact-item",
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });

    element.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
    });
  });

  /*
   * Hide cursor when leaving viewport.
   */
  document.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-active");
    document.body.classList.remove("cursor-hover");
  });

  document.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-active");
  });
}

/* ============================================================
   04. SMOOTH INTERNAL LINKS
   ============================================================ */

function initSmoothLinks() {
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId) return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerOffset = 20;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
}

/* ============================================================
   05. BACK TO TOP
   ============================================================ */

function initBackToTop() {
  const button = document.querySelector(".back-to-top");

  if (!button) return;

  button.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* ============================================================
   06. CURRENT YEAR
   ============================================================ */

function initCurrentYear() {
  const yearElement = document.getElementById("current-year");

  if (!yearElement) return;

  yearElement.textContent = new Date().getFullYear();
}

/* ============================================================
   07. PROJECT CARD INTERACTION
   ============================================================ */

function initProjectCards() {
  const projectCards = document.querySelectorAll(".project-card");

  if (!projectCards.length) return;

  projectCards.forEach((card) => {
    const image = card.querySelector(".project-image");

    if (!image) return;

    /*
     * Desktop-only subtle image movement.
     */
    card.addEventListener("mousemove", (event) => {
      const isTouchDevice = window.matchMedia(
        "(hover: none) and (pointer: coarse)",
      ).matches;

      if (isTouchDevice) return;

      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;

      const y = (event.clientY - rect.top) / rect.height;

      const moveX = (x - 0.5) * 8;

      const moveY = (y - 0.5) * 8;

      image.style.transform = `scale(1.08) translate(${moveX}px, ${moveY}px)`;
    });

    card.addEventListener("mouseleave", () => {
      image.style.transform = "scale(1) translate(0, 0)";
    });
  });
}

/* ============================================================
   08. PROJECT IMAGE TILT
   ============================================================ */

function initProjectTilt() {
  const cards = document.querySelectorAll(".project-card");

  if (!cards.length) return;

  const isTouchDevice = window.matchMedia(
    "(hover: none) and (pointer: coarse)",
  ).matches;

  if (isTouchDevice) return;

  cards.forEach((card) => {
    const imageWrapper = card.querySelector(".project-image-wrapper");

    if (!imageWrapper) return;

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      const rotateY = (x / rect.width - 0.5) * 2;

      const rotateX = (y / rect.height - 0.5) * -2;

      imageWrapper.style.transform = `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      imageWrapper.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

/* ============================================================
   09. EXPERTISE ITEM INTERACTION
   ============================================================ */

function initExpertiseInteractions() {
  const items = document.querySelectorAll(".expertise-item");

  if (!items.length) return;

  items.forEach((item) => {
    const icon = item.querySelector(".expertise-icon");

    if (!icon) return;

    item.addEventListener("mouseenter", () => {
      icon.style.transform = "rotate(8deg) scale(1.05)";
    });

    item.addEventListener("mouseleave", () => {
      icon.style.transform = "";
    });
  });
}

/* ============================================================
   10. CONTACT LINK INTERACTION
   ============================================================ */

function initContactInteractions() {
  const contactItems = document.querySelectorAll(".contact-item");

  if (!contactItems.length) return;

  contactItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("contact-hover");
    });

    item.addEventListener("mouseleave", () => {
      item.classList.remove("contact-hover");
    });
  });
}

/* ============================================================
   11. INITIALIZE INTERACTIONS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initProjectCards();
  initProjectTilt();
  initExpertiseInteractions();
  initContactInteractions();
});
/* ============================================================
   PORTFOLIO — MAIN.JS
   PART 2 / 2
   PARALLAX + MAGNETIC EFFECTS + IMAGE HANDLING + PERFORMANCE
   ============================================================ */

"use strict";


/* ============================================================
   12. HERO PARALLAX
   ============================================================ */

function initHeroParallax() {

    const hero = document.querySelector(".hero-section");
    const visual = document.querySelector(".hero-visual");
    const circle = document.querySelector(".hero-circle");
    const image = document.querySelector(".hero-image-wrapper");
    const badge = document.querySelector(".project-badge");

    if (!hero || !visual) return;

    const isTouchDevice =
        window.matchMedia(
            "(hover: none) and (pointer: coarse)"
        ).matches;

    if (isTouchDevice) return;


    let ticking = false;


    function updateParallax() {

        const rect = hero.getBoundingClientRect();

        const viewportHeight = window.innerHeight;

        /*
         * Only calculate while the hero is reasonably close
         * to the viewport.
         */
        if (
            rect.bottom < -100 ||
            rect.top > viewportHeight + 100
        ) {
            ticking = false;
            return;
        }


        const progress =
            (viewportHeight - rect.top) /
            (viewportHeight + rect.height);


        const movement =
            (progress - 0.5) * 30;


        if (circle) {

            circle.style.transform =
                `translateY(${movement * 0.35}px)`;

        }


        if (image) {

            image.style.transform =
                `translateY(${movement * 0.18}px)`;

        }


        if (badge) {

            badge.style.marginTop =
                `${movement * 0.15}px`;

        }


        ticking = false;

    }


    window.addEventListener("scroll", () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateParallax
            );

            ticking = true;

        }

    }, { passive: true });

}


/* ============================================================
   13. MOUSE PARALLAX FOR HERO
   ============================================================ */

function initHeroMouseEffect() {

    const visual =
        document.querySelector(".hero-visual");

    const circle =
        document.querySelector(".hero-circle");

    const image =
        document.querySelector(".hero-image-wrapper");

    const badge =
        document.querySelector(".project-badge");


    if (!visual) return;


    const isTouchDevice =
        window.matchMedia(
            "(hover: none) and (pointer: coarse)"
        ).matches;

    if (isTouchDevice) return;


    visual.addEventListener("mousemove", (event) => {

        const rect =
            visual.getBoundingClientRect();


        const x =
            (event.clientX - rect.left) /
            rect.width;


        const y =
            (event.clientY - rect.top) /
            rect.height;


        const moveX =
            (x - 0.5) * 18;


        const moveY =
            (y - 0.5) * 18;


        if (circle) {

            circle.style.marginLeft =
                `${moveX * 0.35}px`;

            circle.style.marginTop =
                `${moveY * 0.35}px`;

        }


        if (image) {

            image.style.marginLeft =
                `${moveX * 0.2}px`;

            image.style.marginTop =
                `${moveY * 0.2}px`;

        }


        if (badge) {

            badge.style.marginLeft =
                `${moveX * 0.65}px`;

            badge.style.marginTop =
                `${moveY * 0.65}px`;

        }

    });


    visual.addEventListener("mouseleave", () => {

        if (circle) {

            circle.style.marginLeft = "";
            circle.style.marginTop = "";

        }


        if (image) {

            image.style.marginLeft = "";
            image.style.marginTop = "";

        }


        if (badge) {

            badge.style.marginLeft = "";
            badge.style.marginTop = "";

        }

    });

}


/* ============================================================
   14. MAGNETIC LINKS
   ============================================================ */

function initMagneticLinks() {

    const elements =
        document.querySelectorAll(
            ".text-link, .footer-availability, .back-to-top"
        );


    if (!elements.length) return;


    const isTouchDevice =
        window.matchMedia(
            "(hover: none) and (pointer: coarse)"
        ).matches;

    if (isTouchDevice) return;


    elements.forEach((element) => {

        element.addEventListener("mousemove", (event) => {

            const rect =
                element.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left -
                rect.width / 2;


            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            const strength = 0.18;


            element.style.transform =
                `translate(
                    ${x * strength}px,
                    ${y * strength}px
                )`;

        });


        element.addEventListener("mouseleave", () => {

            element.style.transform =
                "";

        });

    });

}


/* ============================================================
   15. IMAGE LOAD HANDLING
   ============================================================ */

function initImageLoading() {

    const images =
        document.querySelectorAll("img");


    if (!images.length) return;


    images.forEach((image) => {

        if (image.complete) {

            image.classList.add("image-loaded");

            return;

        }


        image.addEventListener("load", () => {

            image.classList.add("image-loaded");

        });


        image.addEventListener("error", () => {

            image.classList.add("image-error");

        });

    });

}


/* ============================================================
   16. PROJECT IMAGE FALLBACK
   ============================================================ */

function initImageFallbacks() {

    const images =
        document.querySelectorAll(".project-image");


    images.forEach((image) => {

        image.addEventListener("error", () => {

            /*
             * Prevent infinite error loops.
             */
            if (
                image.dataset.fallbackApplied === "true"
            ) {
                return;
            }


            image.dataset.fallbackApplied = "true";


            /*
             * Keep the layout intact if a project image
             * has not been added yet.
             */
            image.style.display = "none";


            const wrapper =
                image.closest(
                    ".project-image-wrapper"
                );


            if (!wrapper) return;


            wrapper.classList.add(
                "project-image-missing"
            );

        });

    });

}


/* ============================================================
   17. VIEWPORT RESIZE HANDLING
   ============================================================ */

function initResizeHandler() {

    let resizeTimer;


    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);


        resizeTimer = setTimeout(() => {

            /*
             * Remove desktop cursor state when moving
             * to a touch breakpoint.
             */
            const isTouchDevice =
                window.matchMedia(
                    "(hover: none) and (pointer: coarse)"
                ).matches;


            if (isTouchDevice) {

                document.body.classList.remove(
                    "cursor-active"
                );

                document.body.classList.remove(
                    "cursor-hover"
                );

            }

        }, 150);

    });

}


/* ============================================================
   18. VISIBILITY CHANGE
   ============================================================ */

function initVisibilityHandling() {

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                document.body.classList.remove(
                    "cursor-hover"
                );

            }

        }
    );

}


/* ============================================================
   19. ESCAPE KEY
   ============================================================ */

function initKeyboardControls() {

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                document.body.classList.remove(
                    "cursor-hover"
                );

            }

        }
    );

}


/* ============================================================
   20. PAGE LOAD PERFORMANCE
   ============================================================ */

function initPerformance() {

    /*
     * Add a class after the initial page has completely
     * loaded. Useful for any future loading-state styling.
     */

    window.addEventListener("load", () => {

        document.documentElement.classList.add(
            "page-ready"
        );

    });

}


/* ============================================================
   21. INITIALIZE PART 2
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initHeroParallax();
    initHeroMouseEffect();
    initMagneticLinks();

    initImageLoading();
    initImageFallbacks();

    initResizeHandler();
    initVisibilityHandling();
    initKeyboardControls();

    initPerformance();

});