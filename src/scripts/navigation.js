// Navigation functionality
export function initializeNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Animate hamburger menu
      const bars = navToggle.querySelectorAll('.bar');
      bars.forEach((bar, index) => {
        bar.style.transform = navMenu.classList.contains('active') 
          ? `rotate(${index === 0 ? '45' : index === 1 ? '0' : '-45'}deg) translateY(${index === 1 ? '0' : index === 0 ? '8' : '-8'}px)`
          : 'rotate(0deg) translateY(0px)';
        bar.style.opacity = navMenu.classList.contains('active') && index === 1 ? '0' : '1';
      });
    });
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const bars = navToggle.querySelectorAll('.bar');
      bars.forEach(bar => {
        bar.style.transform = 'rotate(0deg) translateY(0px)';
        bar.style.opacity = '1';
      });
    });
  });

  // Highlight active navigation link based on scroll position
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const correspondingLink = document.querySelector(`a[href="#${id}"]`);

      if (correspondingLink) {
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => link.classList.remove('active'));
          correspondingLink.classList.add('active');
        }
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInsideNav = navToggle.contains(e.target) || navMenu.contains(e.target);
    
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      const bars = navToggle.querySelectorAll('.bar');
      bars.forEach(bar => {
        bar.style.transform = 'rotate(0deg) translateY(0px)';
        bar.style.opacity = '1';
      });
    }
  });
}

// Add active state styles
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--primary-color);
  }
  
  .nav-link.active::after {
    width: 100%;
  }
  
  .nav-toggle .bar {
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(style);
