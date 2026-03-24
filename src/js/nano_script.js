/**
 * nano_script.js
 * Custom interactions for the 4-Bit AC Nano-Processor page.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Feature: Pause SVG wave animations when the user hovers over the card
    // This allows them to freeze the frame and study the exact phase alignments.
    const diagramCards = document.querySelectorAll('.diagram-card');
  
    diagramCards.forEach(card => {
      const wave1 = card.querySelector('.path-wave1');
      const wave2 = card.querySelector('.path-wave2');
  
      if (wave1 && wave2) {
        // Pause on mouse enter
        card.addEventListener('mouseenter', () => {
          wave1.style.animationPlayState = 'paused';
          wave2.style.animationPlayState = 'paused';
        });
  
        // Resume on mouse leave
        card.addEventListener('mouseleave', () => {
          wave1.style.animationPlayState = 'running';
          wave2.style.animationPlayState = 'running';
        });
      }
    });

    // Animate AC Logic waves as moving sine waves
    const acCard = document.querySelector('.diagram-card:nth-child(1)'); // First card
    if (acCard) {
      const wave1 = acCard.querySelector('.path-wave1');
      const wave2 = acCard.querySelector('.path-wave2');
      let t = 0;
      let animationId;
      let paused = false;

      function generatePath(phase) {
        let d = 'M 0 50';
        for (let x = 0; x <= 200; x += 2) {
          const y = 50 + 20 * Math.sin(2 * Math.PI * (x / 200) + phase + t);
          d += ` L ${x} ${y}`;
        }
        return d;
      }

      function animate() {
        if (!paused) {
          t += 0.02; // Adjust speed as needed
          wave1.setAttribute('d', generatePath(0));
          wave2.setAttribute('d', generatePath(Math.PI)); // 180 degrees
        }
        animationId = requestAnimationFrame(animate);
      }

      animate();

      // Override hover for AC to pause JS animation
      acCard.addEventListener('mouseenter', () => {
        paused = true;
      });

      acCard.addEventListener('mouseleave', () => {
        paused = false;
      });
    }

    // Animate Quadrature RF waves as moving sine waves
    const quadratureCard = document.querySelector('.diagram-card:nth-child(2)'); // Second card
    if (quadratureCard) {
      const wave1 = quadratureCard.querySelector('.path-wave1');
      const wave2 = quadratureCard.querySelector('.path-wave2');
      let t = 0;
      let animationId;
      let paused = false;

      function generatePath(phase) {
        let d = 'M 0 50';
        for (let x = 0; x <= 200; x += 2) {
          const y = 50 + 20 * Math.sin(2 * Math.PI * (x / 200) + phase + t);
          d += ` L ${x} ${y}`;
        }
        return d;
      }

      function animate() {
        if (!paused) {
          t += 0.02; // Adjust speed as needed
          wave1.setAttribute('d', generatePath(0));
          wave2.setAttribute('d', generatePath(Math.PI / 2));
        }
        animationId = requestAnimationFrame(animate);
      }

      animate();

      // Override hover for quadrature to pause JS animation
      quadratureCard.addEventListener('mouseenter', () => {
        paused = true;
      });

      quadratureCard.addEventListener('mouseleave', () => {
        paused = false;
      });
    }
    
  });