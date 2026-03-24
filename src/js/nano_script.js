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
    
  });