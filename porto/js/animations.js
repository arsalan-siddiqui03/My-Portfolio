/* ============================================================
   PORTFOLIO — ANIMATIONS.JS
   PART 1 / 2
   SCROLL REVEAL + SKILL ANIMATIONS + SECTION OBSERVER
   ============================================================ */

"use strict";

/* ============================================================
   01. DOM READY
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initSkillAnimations();
  initSectionAnimations();
});

/* ============================================================
   02. REDUCED MOTION CHECK
   ============================================================ */

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ============================================================
   03. GENERIC INTERSECTION OBSERVER
   ============================================================ */

function createRevealObserver(elements, options = {}) {
  if (!elements.length) return null;

  const defaultOptions = {
    threshold: 0.12,

    rootMargin: "0px 0px -70px 0px",
  };

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");

        /*
         * Stop observing after the element
         * has been revealed.
         */
        observerInstance.unobserve(entry.target);
      });
    },

    {
      ...defaultOptions,
      ...options,
    },
  );

  elements.forEach((element) => {
    observer.observe(element);
  });

  return observer;
}

/* ============================================================
   04. SCROLL REVEAL
   ============================================================ */

function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".project-card, " +
      ".skills-heading, " +
      ".skills-list, " +
      ".skills-statement, " +
      ".expertise-list, " +
      ".contact-heading, " +
      ".contact-qr, " +
      ".contact-details",
  );

  if (!revealElements.length) {
    return;
  }

  /*
   * If user prefers reduced motion,
   * show everything immediately.
   */
  if (prefersReducedMotion()) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  createRevealObserver(revealElements, {
    threshold: 0.1,
    rootMargin: "0px 0px -60px 0px",
  });
}

/* ============================================================
   05. PROJECT STAGGER
   ============================================================ */

function initProjectStagger() {
  const projectGrid = document.querySelector(".projects-grid");

  if (!projectGrid) return;

  const cards = projectGrid.querySelectorAll(".project-card");

  if (!cards.length) return;

  cards.forEach((card, index) => {
    card.style.setProperty("--reveal-index", index);
  });
}

/* ============================================================
   06. SKILL BAR ANIMATION
   ============================================================ */

function initSkillAnimations() {
  const skillItems = document.querySelectorAll(".skill-item");

  if (!skillItems.length) return;

  /*
   * Reduced motion:
   * show the final percentage immediately.
   */
  if (prefersReducedMotion()) {
    skillItems.forEach((item) => {
      const progress = item.querySelector(".skill-progress");

      if (!progress) return;

      const value = Number(progress.dataset.progress) || 0;

      progress.style.setProperty("--progress", value);

      progress.style.width = `${value}%`;

      item.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const item = entry.target;

        const progress = item.querySelector(".skill-progress");

        if (!progress) return;

        const value = Math.min(
          100,
          Math.max(0, Number(progress.dataset.progress) || 0),
        );

        /*
         * CSS uses this custom property
         * for the animated final width.
         */
        progress.style.setProperty("--progress", value);

        item.classList.add("is-visible");

        animateSkillCounter(item, value);

        observerInstance.unobserve(item);
      });
    },

    {
      threshold: 0.4,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  skillItems.forEach((item) => {
    observer.observe(item);
  });
}

/* ============================================================
   07. SKILL COUNTER
   ============================================================ */

function animateSkillCounter(skillItem, targetValue) {
  const percentage = skillItem.querySelector(".skill-percentage");

  if (!percentage) return;

  /*
   * Preserve the original value in case
   * the animation needs to be re-used.
   */
  percentage.dataset.target = targetValue;

  if (prefersReducedMotion()) {
    percentage.textContent = `${targetValue}%`;

    return;
  }

  const duration = 1000;

  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;

    const progress = Math.min(elapsed / duration, 1);

    /*
     * Ease-out cubic.
     */
    const eased = 1 - Math.pow(1 - progress, 3);

    const currentValue = Math.round(targetValue * eased);

    percentage.textContent = `${currentValue}%`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      percentage.textContent = `${targetValue}%`;
    }
  }

  requestAnimationFrame(updateCounter);
}

/* ============================================================
   08. SECTION DIVIDER REVEALS
   ============================================================ */

function initSectionAnimations() {
  const sections = document.querySelectorAll(
    ".projects-section, " + ".skills-section, " + ".contact-section",
  );

  if (!sections.length) return;

  if (prefersReducedMotion()) {
    sections.forEach((section) => {
      section.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");

        observerInstance.unobserve(entry.target);
      });
    },

    {
      threshold: 0.05,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

/* ============================================================
   09. INITIALIZE PROJECT STAGGER
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initProjectStagger();
});
/* ============================================================
   PORTFOLIO — ANIMATIONS.JS
   PART 2 / 2
   TEXT REVEALS + PARALLAX + MICRO INTERACTIONS
   ============================================================ */

"use strict";


/* ============================================================
   10. TEXT REVEAL
   ============================================================ */

function initTextReveal() {

    const elements = document.querySelectorAll(
        ".hero-greeting, " +
        ".hero-name, " +
        ".hero-role, " +
        ".hero-description, " +
        ".section-eyebrow, " +
        ".section-title, " +
        ".contact-title"
    );

    if (!elements.length) return;

    if (prefersReducedMotion()) {
        elements.forEach((element) => {
            element.classList.add("text-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("text-visible");

                observerInstance.unobserve(entry.target);

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });
}


/* ============================================================
   11. PROJECT IMAGE PARALLAX
   ============================================================ */

function initProjectParallax() {

    const cards = document.querySelectorAll(
        ".project-card"
    );

    if (!cards.length) return;

    if (
        prefersReducedMotion() ||
        window.matchMedia(
            "(hover: none) and (pointer: coarse)"
        ).matches
    ) {
        return;
    }

    cards.forEach((card) => {

        const image = card.querySelector(
            ".project-image"
        );

        if (!image) return;

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width;

                const y =
                    (event.clientY - rect.top) /
                    rect.height;

                const moveX =
                    (x - 0.5) * 12;

                const moveY =
                    (y - 0.5) * 12;

                image.style.transform =
                    `scale(1.08)
                     translate(${moveX}px, ${moveY}px)`;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "scale(1) translate(0, 0)";

            }
        );

    });
}


/* ============================================================
   12. EXPERTISE STAGGER
   ============================================================ */

function initExpertiseStagger() {

    const list = document.querySelector(
        ".expertise-list"
    );

    if (!list) return;

    const items = list.querySelectorAll(
        ".expertise-item"
    );

    if (!items.length) return;

    items.forEach((item, index) => {

        item.style.transitionDelay =
            `${index * 80}ms`;

    });

}


/* ============================================================
   13. CONTACT ITEM REVEAL
   ============================================================ */

function initContactItemReveal() {

    const items = document.querySelectorAll(
        ".contact-item"
    );

    if (!items.length) return;

    if (prefersReducedMotion()) {
        items.forEach((item) => {
            item.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add(
                    "is-visible"
                );

                observerInstance.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.25,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    items.forEach((item) => {
        observer.observe(item);
    });
}


/* ============================================================
   14. FOOTER REVEAL
   ============================================================ */

function initFooterReveal() {

    const footer = document.querySelector(
        ".site-footer"
    );

    if (!footer) return;

    if (prefersReducedMotion()) {
        footer.classList.add("is-visible");
        return;
    }

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add(
                    "is-visible"
                );

                observerInstance.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.1
        }
    );

    observer.observe(footer);
}


/* ============================================================
   15. SCROLL PROGRESS
   ============================================================ */

function initScrollProgress() {

    const progressBar =
        document.createElement("div");

    progressBar.className =
        "scroll-progress";

    document.body.appendChild(
        progressBar
    );


    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) return;

        const progress =
            (scrollTop / documentHeight) * 100;

        progressBar.style.width =
            `${progress}%`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

    updateProgress();
}


/* ============================================================
   16. HERO MOUSE MOVEMENT
   ============================================================ */

function initHeroMouseMovement() {

    const visual =
        document.querySelector(
            ".hero-visual"
        );

    if (!visual) return;

    if (
        prefersReducedMotion() ||
        window.matchMedia(
            "(hover: none) and (pointer: coarse)"
        ).matches
    ) {
        return;
    }

    const circle =
        document.querySelector(
            ".hero-circle"
        );

    const image =
        document.querySelector(
            ".hero-image-wrapper"
        );

    const badge =
        document.querySelector(
            ".project-badge"
        );


    visual.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                visual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;


            const moveX =
                (x - 0.5) * 20;

            const moveY =
                (y - 0.5) * 20;


            if (circle) {

                circle.style.marginLeft =
                    `${moveX * 0.3}px`;

                circle.style.marginTop =
                    `${moveY * 0.3}px`;

            }


            if (image) {

                image.style.marginLeft =
                    `${moveX * 0.18}px`;

                image.style.marginTop =
                    `${moveY * 0.18}px`;

            }


            if (badge) {

                badge.style.marginLeft =
                    `${moveX * 0.55}px`;

                badge.style.marginTop =
                    `${moveY * 0.55}px`;

            }

        }
    );


    visual.addEventListener(
        "mouseleave",
        () => {

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

        }
    );
}


/* ============================================================
   17. HOVER IMAGE CURSOR TEXT
   ============================================================ */

function initProjectCursorText() {

    const projectLinks =
        document.querySelectorAll(
            ".project-image-link"
        );

    if (!projectLinks.length) return;

    if (
        prefersReducedMotion() ||
        window.matchMedia(
            "(hover: none) and (pointer: coarse)"
        ).matches
    ) {
        return;
    }


    projectLinks.forEach((link) => {

        link.addEventListener(
            "mouseenter",
            () => {

                document.body.classList.add(
                    "project-cursor-active"
                );

            }
        );


        link.addEventListener(
            "mouseleave",
            () => {

                document.body.classList.remove(
                    "project-cursor-active"
                );

            }
        );

    });
}


/* ============================================================
   18. BADGE PAUSE ON HOVER
   ============================================================ */

function initBadgeInteraction() {

    const badge =
        document.querySelector(
            ".project-badge"
        );

    if (!badge) return;


    badge.addEventListener(
        "mouseenter",
        () => {

            if (
                prefersReducedMotion()
            ) {
                return;
            }

            const ring =
                badge.querySelector(
                    ".badge-ring"
                );

            if (ring) {
                ring.style.animationPlayState =
                    "paused";
            }

        }
    );


    badge.addEventListener(
        "mouseleave",
        () => {

            const ring =
                badge.querySelector(
                    ".badge-ring"
                );

            if (ring) {
                ring.style.animationPlayState =
                    "running";
            }

        }
    );
}


/* ============================================================
   19. PAGE LOAD STATE
   ============================================================ */

function initPageAnimationState() {

    if (prefersReducedMotion()) {

        document.documentElement.classList.add(
            "animations-disabled"
        );

        return;
    }


    window.addEventListener(
        "load",
        () => {

            document.documentElement.classList.add(
                "animations-ready"
            );

        }
    );
}


/* ============================================================
   20. INITIALIZE PART 2
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initTextReveal();
        initProjectParallax();
        initExpertiseStagger();

        initContactItemReveal();
        initFooterReveal();

        initScrollProgress();

        initHeroMouseMovement();
        initProjectCursorText();

        initBadgeInteraction();

        initPageAnimationState();

    }
);