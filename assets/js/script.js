// ==================== DOM ELEMENTS & NAVIGATION ==================== //
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLink = document.querySelectorAll(".nav-link");
const navbar = document.querySelector(".navbar");
const themeToggle = document.getElementById("themeToggle");

// Mobile Menu
hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
navLink.forEach((link) =>
  link.addEventListener("click", () => navLinks.classList.remove("active")),
);

/* ==================== THEME TOGGLE ==================== */
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDarkMode = savedTheme ? savedTheme === "dark" : prefersDark;

  if (!isDarkMode) {
    document.documentElement.classList.add("light-mode");
  }
};

initializeTheme();

themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  const isLightMode = html.classList.contains("light-mode");

  if (isLightMode) {
    html.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  } else {
    html.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") !== "#") {
      e.preventDefault();
      document
        .querySelector(this.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Navbar Styling on Scroll
window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > 50) {
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.8)";
    navbar.style.borderBottom = "1px solid var(--accent-primary)";
  } else {
    navbar.style.boxShadow = "none";
    navbar.style.borderBottom = "1px solid var(--border-main)";
  }
});

// Active Link Highlight
window.addEventListener("scroll", () => {
  let current = "";
  document.querySelectorAll("section").forEach((section) => {
    if (pageYOffset >= section.offsetTop - 200)
      current = section.getAttribute("id");
  });
  navLink.forEach((link) => {
    link.style.color = "";
    link.style.textShadow = "";
    if (link.getAttribute("href").slice(1) === current) {
      link.style.color = "var(--accent-primary)";
      link.style.textShadow = "var(--glow)";
    }
  });
});

// ==================== INTERACTIVE TYPING EFFECT ==================== //
const textArray = [
  "ASIC/VLSI Design Engineer",
  "SoC Verification Specialist",
  "Mixed-Signal Architect",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeWriterElement = document.getElementById("typewriter");

function type() {
  const currentText = textArray[textIndex];
  if (isDeleting) {
    typeWriterElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeWriterElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % textArray.length;
    typeSpeed = 500;
  }
  setTimeout(type, typeSpeed);
}
if (typeWriterElement) setTimeout(type, 1000);

// ==================== 3D CARD TILT EFFECT ==================== //
const cards = document.querySelectorAll(".interactive-card");
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  });
});

// ==================== SCROLL OBSERVER (REVEAL ANIMATION) ==================== //
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

document
  .querySelectorAll(
    ".project-card, .experience-card, .skill-category, .timeline-content",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// ==================== HERO CANVAS BACKGROUND (NETWORK/CIRCUIT) ==================== //
const canvas = document.getElementById("hero-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particlesArray;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let mouse = { x: null, y: null, radius: 150 };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    update() {
      if (this.x > canvas.width || this.x < 0)
        this.directionX = -this.directionX;
      if (this.y > canvas.height || this.y < 0)
        this.directionY = -this.directionY;
      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }

  function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 2 + 1;
      let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
      let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
      let directionX = Math.random() * 1 - 0.5;
      let directionY = Math.random() * 1 - 0.5;
      let color = "#CEE056"; // Lime nodes matching new theme
      particlesArray.push(
        new Particle(x, y, directionX, directionY, size, color),
      );
    }
  }

  function connect() {
    // Check current theme
    const isLightMode = document.documentElement.classList.contains("light-mode");

    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = dx * dx + dy * dy;

        if (distance < (canvas.width / 7) * (canvas.height / 7)) {
          let opacityValue = 1 - distance / 20000;

          // Change line color based on theme
          if (isLightMode) {
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacityValue})`; // black for light mode
          } else {
            ctx.strokeStyle = `rgba(206, 224, 86, ${opacityValue})`; // lime for dark mode
          }

          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connect();
  }

  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
  });

  init();
  animate();
}

// ==================== SCROLL TO TOP BUTTON ==================== //
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.classList.add("scroll-to-top");
scrollToTopBtn.innerHTML = "↑";
document.body.appendChild(scrollToTopBtn);

window.addEventListener("scroll", () => {
  scrollToTopBtn.style.display = window.pageYOffset > 300 ? "flex" : "none";
});

scrollToTopBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

// Initial Fade In
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = "1";
  }, 100);
});