// Animation and visual effects
export function initializeAnimations() {
  // Initialize scroll-triggered animations
  initializeScrollAnimations();
  
  // Initialize hover effects
  initializeHoverEffects();
  
  // Initialize loading animations
  initializeLoadingAnimations();
  
  // Initialize parallax effects
  initializeParallaxEffects();
}

function initializeScrollAnimations() {
  // Create intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(`
    .destination-card,
    .tour-card,
    .feature,
    .contact-item,
    .about-text,
    .about-image,
    .section-header
  `);

  animatedElements.forEach(element => {
    observer.observe(element);
  });

  // Add staggered animation for grids
  const grids = document.querySelectorAll('.destinations-grid, .tours-grid');
  grids.forEach(grid => {
    const items = grid.querySelectorAll('.destination-card, .tour-card');
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  });
}

function initializeHoverEffects() {
  // Add hover effects to cards
  const cards = document.querySelectorAll('.destination-card, .tour-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      e.target.style.transform = 'translateY(-10px) scale(1.02)';
      e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', (e) => {
      e.target.style.transform = 'translateY(0) scale(1)';
      e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
  });

  // Add hover effects to buttons
  const buttons = document.querySelectorAll('.btn:not(.btn-book)');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
      if (!e.target.classList.contains('btn-secondary')) {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
      }
    });
    
    button.addEventListener('mouseleave', (e) => {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '';
    });
  });

  // Add ripple effect to buttons
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
}

function createRipple(e) {
  const button = e.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  ripple.className = 'ripple';
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  `;
  
  button.style.position = 'relative';
  button.style.overflow = 'hidden';
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

function initializeLoadingAnimations() {
  // Add loading skeleton for image placeholders
  const imagePlaceholders = document.querySelectorAll('.image-placeholder');
  
  imagePlaceholders.forEach(placeholder => {
    placeholder.classList.add('skeleton-loading');
    
    // Remove skeleton after random delay to simulate loading
    setTimeout(() => {
      placeholder.classList.remove('skeleton-loading');
    }, Math.random() * 2000 + 1000);
  });
}

function initializeParallaxEffects() {
  // Add parallax effect to hero section
  const heroSection = document.querySelector('.hero');
  
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroSection.style.backgroundPosition = `center ${rate}px`;
    });
  }

  // Add floating animation to hero elements
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  
  if (heroTitle) {
    heroTitle.style.animation = 'float 6s ease-in-out infinite';
  }
  
  if (heroSubtitle) {
    heroSubtitle.style.animation = 'float 6s ease-in-out infinite 0.5s';
  }
}

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes skeleton-pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
  
  .animate-in {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .animate-in.from-left {
    animation: fadeInLeft 0.8s ease-out forwards;
  }
  
  .animate-in.from-right {
    animation: fadeInRight 0.8s ease-out forwards;
  }
  
  .skeleton-loading {
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }
  
  .destination-card,
  .tour-card,
  .feature,
  .contact-item,
  .about-text,
  .about-image,
  .section-header {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }
  
  .destination-card.animate-in,
  .tour-card.animate-in,
  .feature.animate-in,
  .contact-item.animate-in,
  .about-text.animate-in,
  .about-image.animate-in,
  .section-header.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .destination-card,
  .tour-card {
    transition: all 0.3s ease;
  }
  
  .btn {
    transition: all 0.3s ease;
  }
  
  /* Smooth scrolling for better UX */
  html {
    scroll-behavior: smooth;
  }
  
  /* Loading states */
  .loading {
    position: relative;
    overflow: hidden;
  }
  
  .loading::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
  
  /* Enhance focus states for accessibility */
  .btn:focus,
  .nav-link:focus,
  input:focus,
  select:focus,
  textarea:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  
  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    html {
      scroll-behavior: auto;
    }
  }
`;

document.head.appendChild(style);
