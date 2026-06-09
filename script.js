"use strict";

/* ---------- Page Loader ---------- */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("page-loader").classList.add("done");
  }, 1600);
});

/* ---------- Header scroll state ---------- */
const header = document.getElementById("site-header");
window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  },
  { passive: true },
);

/* ---------- Mobile Nav Toggle ---------- */
const navToggle = document.getElementById("nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");
let menuOpen = false;

function setMenu(open) {
  menuOpen = open;
  navToggle.classList.toggle("open", open);
  mobileMenu.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
}

navToggle.addEventListener("click", () => setMenu(!menuOpen));

// Close on link click
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (
    menuOpen &&
    !navToggle.contains(e.target) &&
    !mobileMenu.contains(e.target)
  ) {
    setMenu(false);
  }
});

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuOpen) setMenu(false);
});

/* ---------- Scroll-to-top button ---------- */
const scrollTopBtn = document.getElementById("scroll-top");
window.addEventListener(
  "scroll",
  () => {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
  },
  { passive: true },
);
scrollTopBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

/* ---------- IntersectionObserver: fade-up elements ---------- */
const fadeEls = document.querySelectorAll(".fade-up");
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);

fadeEls.forEach((el) => fadeObserver.observe(el));

/* ---------- Progress bars (animate on observe) ---------- */
const progressFills = document.querySelectorAll(".progress-fill");
const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.dataset.width;
        fill.style.width = width + "%";
        progressObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.5 },
);

progressFills.forEach((fill) => progressObserver.observe(fill));

/* ---------- Bookmark toggle ---------- */
document.querySelectorAll("[data-bookmark]").forEach((btn) => {
  btn.addEventListener("click", function () {
    const saved = this.classList.toggle("saved");
    this.setAttribute(
      "aria-label",
      saved ? "Remove bookmark" : "Bookmark this article",
    );
    // Visual feedback
    this.style.transform = "scale(1.3)";
    setTimeout(() => (this.style.transform = ""), 200);
  });
});

/* ---------- Newsletter ---------- */
const newsletterBtn = document.getElementById("newsletter-btn");
const newsletterInput = document.getElementById("email-input");

newsletterBtn.addEventListener("click", () => {
  const email = newsletterInput.value.trim();
  if (!email || !email.includes("@")) {
    newsletterInput.style.outline = "2px solid #ff6b6b";
    newsletterInput.focus();
    return;
  }
  newsletterInput.style.outline = "";
  newsletterBtn.textContent = "✓ Subscribed!";
  newsletterBtn.style.background = "var(--blue-light)";
  newsletterInput.value = "";
  newsletterInput.disabled = true;
  newsletterBtn.disabled = true;
});

/* ---------- Roadmap step interaction ---------- */
const roadmapSteps = document.querySelectorAll(".roadmap-step");
roadmapSteps.forEach((step) => {
  function activate() {
    roadmapSteps.forEach((s) => s.classList.remove("active"));
    step.classList.add("active");
  }
  step.addEventListener("click", activate);
  step.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate();
    }
  });
});

/* ---------- Smooth active nav link on scroll ---------- */
const sections = document.querySelectorAll(
  'section[id], div[id="main-layout"]',
);
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id || "content-section";
        navLinks.forEach((link) => {
          const href = link.getAttribute("href").replace("#", "");
          const matches =
            href === id || (href === "content-section" && id === "main-layout");
          link.setAttribute("aria-current", matches ? "page" : "false");
        });
      }
    });
  },
  { rootMargin: "-40% 0px -40% 0px" },
);

sections.forEach((s) => sectionObserver.observe(s));
