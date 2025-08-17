// Search functionality
export function initializeSearch() {
  const searchForm = document.querySelector('.search-form');
  const searchButton = document.querySelector('.btn-search');
  const destinationInput = document.querySelector('#destination');
  const datesInput = document.querySelector('#dates');
  const guestsSelect = document.querySelector('#guests');

  // Mock destinations data
  const destinations = [
    'Bali, Indonesia',
    'Tokyo, Japan',
    'Santorini, Greece',
    'Machu Picchu, Peru',
    'Paris, France',
    'New York, USA',
    'London, UK',
    'Dubai, UAE',
    'Sydney, Australia',
    'Bangkok, Thailand',
    'Rome, Italy',
    'Barcelona, Spain'
  ];

  // Set minimum date to today
  if (datesInput) {
    const today = new Date().toISOString().split('T')[0];
    datesInput.min = today;
  }

  // Add autocomplete functionality to destination input
  if (destinationInput) {
    const datalistId = 'destination-options';
    let datalist = document.getElementById(datalistId);
    
    if (!datalist) {
      datalist = document.createElement('datalist');
      datalist.id = datalistId;
      document.body.appendChild(datalist);
    }
    
    destinationInput.setAttribute('list', datalistId);
    
    // Populate datalist with destinations
    destinations.forEach(dest => {
      const option = document.createElement('option');
      option.value = dest;
      datalist.appendChild(option);
    });

    // Filter suggestions based on input
    destinationInput.addEventListener('input', (e) => {
      const value = e.target.value.toLowerCase();
      datalist.innerHTML = '';
      
      const filteredDestinations = destinations.filter(dest =>
        dest.toLowerCase().includes(value)
      );
      
      filteredDestinations.forEach(dest => {
        const option = document.createElement('option');
        option.value = dest;
        datalist.appendChild(option);
      });
    });
  }

  // Handle search form submission
  if (searchButton) {
    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      handleSearch();
    });
  }

  // Handle Enter key press in search fields
  const searchInputs = [destinationInput, datesInput, guestsSelect];
  searchInputs.forEach(input => {
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSearch();
        }
      });
    }
  });

  function handleSearch() {
    const destination = destinationInput?.value.trim();
    const dates = datesInput?.value;
    const guests = guestsSelect?.value;

    // Basic validation
    if (!destination) {
      showNotification('Please enter a destination', 'error');
      destinationInput?.focus();
      return;
    }

    // Show loading state
    searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    searchButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // Reset button
      searchButton.innerHTML = '<i class="fas fa-search"></i> Search';
      searchButton.disabled = false;

      // Show results
      const results = mockSearchResults(destination, dates, guests);
      displaySearchResults(results);
      
      // Scroll to results
      document.querySelector('#tours').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  }

  function mockSearchResults(destination, dates, guests) {
    const mockResults = [
      {
        title: `Adventure Tour to ${destination}`,
        price: '$1,299',
        duration: '7 days',
        rating: 4.8,
        image: 'adventure.jpg'
      },
      {
        title: `Cultural Experience in ${destination}`,
        price: '$899',
        duration: '5 days',
        rating: 4.6,
        image: 'culture.jpg'
      },
      {
        title: `Luxury Getaway to ${destination}`,
        price: '$2,499',
        duration: '10 days',
        rating: 4.9,
        image: 'luxury.jpg'
      }
    ];

    return mockResults;
  }

  function displaySearchResults(results) {
    const toursGrid = document.querySelector('.tours-grid');
    if (!toursGrid) return;

    // Clear existing tours
    toursGrid.innerHTML = '';

    // Add search results
    results.forEach(result => {
      const tourCard = createTourCard(result);
      toursGrid.appendChild(tourCard);
    });

    // Update section header
    const sectionHeader = document.querySelector('#tours .section-header h2');
    if (sectionHeader) {
      sectionHeader.textContent = 'Search Results';
    }
  }

  function createTourCard(tour) {
    const card = document.createElement('div');
    card.className = 'tour-card';
    card.innerHTML = `
      <div class="tour-image">
        <div class="image-placeholder">
          <i class="fas fa-camera"></i>
        </div>
        <div class="tour-badge">Search Result</div>
      </div>
      <div class="tour-info">
        <h3>${tour.title}</h3>
        <p>Discover amazing experiences and create unforgettable memories</p>
        <div class="tour-features">
          <span><i class="fas fa-users"></i> Small Group</span>
          <span><i class="fas fa-star"></i> ${tour.rating} rating</span>
          <span><i class="fas fa-clock"></i> ${tour.duration}</span>
        </div>
        <div class="tour-price">
          <span class="price">${tour.price}</span>
          <button class="btn btn-book">Book Now</button>
        </div>
      </div>
    `;
    return card;
  }

  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'error' ? '#ef4444' : '#10b981'};
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Add animation for notification
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}
