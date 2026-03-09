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
  const isDarkMode = savedTheme ? savedTheme === "dark" : false; // Default to light mode

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
    const isLightMode =
      document.documentElement.classList.contains("light-mode");

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

// ==================== CNN HERO BACKGROUND ==================== //
const cnnCanvas = document.getElementById("cnn-hero-canvas");

if (cnnCanvas) {
  const ctx = cnnCanvas.getContext("2d");

  let layers = [];
  let paddingX = 0;
  let paddingY = 0;
  let nodes = [];
  let activeNodes = []; // array of arrays per layer to track active nodes
  let activeTimers = []; // timers per active node

  function setLayers() {
    if (window.innerWidth < 768) {
      // mobile/tablet
      layers = [8, 6, 2];
      paddingX = 10;
      paddingY = 0;
    } else {
      // desktop
      layers = [18, 16, 14, 12, 10, 8, 6, 4];
      paddingX = 20;
      paddingY = 0;
    }
  }

  function initCNN() {
    nodes = [];
    const layerSpacing = (cnnCanvas.width - paddingX * 2) / (layers.length - 1);

    for (let l = 0; l < layers.length; l++) {
      const layerNodes = [];
      const nodeSpacing = (cnnCanvas.height - 2 * paddingY) / (layers[l] + 1);

      for (let n = 0; n < layers[l]; n++) {
        const x = paddingX + l * layerSpacing;
        const y = paddingY + (n + 1) * nodeSpacing + (Math.random() - 0.5) * 20;

        layerNodes.push({
          x: x,
          y: y,
          baseY: y,
          pulse: Math.random() * Math.PI * 2,
          moveOffset: Math.random() * 20,
        });
      }
      nodes.push(layerNodes);
    }

    selectActiveNodes();
  }

  function selectActiveNodes() {
    activeNodes = [];
    activeTimers = [];

    for (let l = 0; l < nodes.length; l++) {
      let count = 0;
      if (l === nodes.length - 1) {
        // last layer always 1
        count = 1;
      } else {
        // random number of active nodes per layer (1 to ~30% of layer)
        count = Math.max(
          1,
          Math.floor(Math.random() * (nodes[l].length * 0.3) + 1),
        );
      }

      // pick unique random indices for this layer
      const indices = [];
      while (indices.length < count) {
        const idx = Math.floor(Math.random() * nodes[l].length);
        if (!indices.includes(idx)) indices.push(idx);
      }
      activeNodes.push(indices);
      activeTimers.push(indices.map(() => 0)); // init timers
    }
  }

  function drawConnections() {
    const isLightMode =
      document.documentElement.classList.contains("light-mode");
    ctx.lineWidth = 1;

    for (let l = 0; l < nodes.length - 1; l++) {
      for (let aIdx = 0; aIdx < nodes[l].length; aIdx++) {
        for (let bIdx = 0; bIdx < nodes[l + 1].length; bIdx++) {
          const a = nodes[l][aIdx];
          const b = nodes[l + 1][bIdx];

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);

          // check if this connection should pulse
          const activeA = activeNodes[l].includes(aIdx);
          const activeB = activeNodes[l + 1].includes(bIdx);

          if (activeA && activeB) {
            // find the smaller timer for blending
            const timerA = activeTimers[l][activeNodes[l].indexOf(aIdx)];
            const timerB =
              activeTimers[l + 1][activeNodes[l + 1].indexOf(bIdx)] || 0;
            const alpha = 1.1 * Math.min(timerA, timerB); // increase alpha for visibility
            // ctx.strokeStyle = "#6366f1";
            ctx.strokeStyle = isLightMode
              ? `rgba(55,48,163,1)`
              : `rgba(255,255,255,${alpha})`;
          } else {
            ctx.strokeStyle = isLightMode
              ? "rgba(0,0,0,0.25)"
              : "rgba(206,224,86,0.2)";
          }

          ctx.stroke();
        }
      }
    }
  }

  function drawNodes() {
    const isLightMode =
      document.documentElement.classList.contains("light-mode");

    for (let l = 0; l < nodes.length; l++) {
      for (let n = 0; n < nodes[l].length; n++) {
        const node = nodes[l][n];
        node.pulse += 0.05;
        node.y = node.baseY + Math.sin(node.pulse * 0.5) * node.moveOffset;

        const isActiveNode = activeNodes[l].includes(n);
        const timer = isActiveNode
          ? activeTimers[l][activeNodes[l].indexOf(n)]
          : 0;

        const radius = 2 + Math.sin(node.pulse) * 1.5 + timer * 3;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isLightMode
          ? isActiveNode
            ? `rgba(0,0,0,1)`
            : "rgba(0,0,0,0.5)"
          : isActiveNode
            ? `rgba(255,255,255,${0.5 + timer * 0.5})`
            : "rgba(206,224,86,0.5)";
        ctx.fill();
      }
    }
  }

  function animateCNN() {
    requestAnimationFrame(animateCNN);
    ctx.clearRect(0, 0, cnnCanvas.width, cnnCanvas.height);

    // increment timers for active nodes
    for (let l = 0; l < activeTimers.length; l++) {
      for (let i = 0; i < activeTimers[l].length; i++) {
        if (activeTimers[l][i] < 1) activeTimers[l][i] += 0.03;
      }
    }

    drawConnections();
    drawNodes();

    // check if last layer all timers reached 1
    if (activeTimers[activeTimers.length - 1][0] >= 1) {
      selectActiveNodes();
    }
  }

  function resizeCNN() {
    cnnCanvas.width = window.innerWidth;
    cnnCanvas.height = window.innerHeight;
    setLayers();
    initCNN();
  }

  // ================== Setup ================== //
  resizeCNN();
  animateCNN();
  window.addEventListener("resize", resizeCNN);
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

// ==================== BATCH 2025 MEMBERS GENERATION ==================== //
const batchMembers = [
  "Babar_Bhutta",
  "Humbal_Hammad",
  "Muhammad_Uzair",
  "Osama_Anees_Mirza",
  "Ejaz_Ahmad_Khan",
  "Ajmal_Khan",
  "Salman_Qazi",
  "Kousar_Gul",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
  "Member_Name",
];

const batchGrid = document.getElementById("batchGrid");
if (batchGrid) {
  for (let i = 1; i <= 32; i++) {
    const memberCard = document.createElement("div");
    memberCard.className = "batch-member interactive-card";
    memberCard.innerHTML = `
      <img
        src="assets/images/batch25/${batchMembers[i - 1]}.png"
        alt="${batchMembers[i - 1]}"
        class="member-photo"
      />
      <h4>${batchMembers[i - 1]}</h4>
    `;
    batchGrid.appendChild(memberCard);
  }
}

// Initial Fade In
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = "1";
  }, 100);
});
