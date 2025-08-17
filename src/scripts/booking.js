// Booking functionality
export function initializeBooking() {
  // Initialize tour booking buttons
  const bookingButtons = document.querySelectorAll(".btn-book");

  bookingButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const tourCard = e.target.closest(".tour-card");
      const tourTitle = tourCard.querySelector("h3").textContent;
      const tourPrice = tourCard.querySelector(".price").textContent;

      openBookingModal(tourTitle, tourPrice);
    });
  });

  // Initialize hero buttons
  const heroButtons = document.querySelectorAll(".hero-buttons .btn");
  heroButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.textContent.includes("Explore")) {
        e.preventDefault();
        document.querySelector("#tours").scrollIntoView({ behavior: "smooth" });
      } else if (button.textContent.includes("Video")) {
        e.preventDefault();
        openVideoModal();
      }
    });
  });

  // Initialize destination card clicks
  const destinationCards = document.querySelectorAll(".destination-card");
  destinationCards.forEach((card) => {
    card.addEventListener("click", () => {
      const destination = card.querySelector("h3").textContent;
      const price = card.querySelector(".price").textContent;
      const duration = card.querySelector(".duration").textContent;

      openDestinationModal(destination, price, duration);
    });
  });
}

function openBookingModal(tourTitle, tourPrice) {
  const modal = createModal(
    "Book Your Tour",
    `
    <div class="booking-form">
      <h3>${tourTitle}</h3>
      <p class="tour-price">${tourPrice}</p>
      
      <form id="bookingForm">
        <div class="form-row">
          <div class="form-group">
            <label for="bookingName">Full Name *</label>
            <input type="text" id="bookingName" required>
          </div>
          <div class="form-group">
            <label for="bookingEmail">Email *</label>
            <input type="email" id="bookingEmail" required>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="bookingPhone">Phone Number</label>
            <input type="tel" id="bookingPhone">
          </div>
          <div class="form-group">
            <label for="bookingGuests">Number of Guests *</label>
            <select id="bookingGuests" required>
              <option value="">Select guests</option>
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5+">5+ Guests</option>
            </select>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="bookingDate">Preferred Date *</label>
            <input type="date" id="bookingDate" required>
          </div>
          <div class="form-group">
            <label for="bookingTime">Preferred Time</label>
            <select id="bookingTime">
              <option value="">Select time</option>
              <option value="morning">Morning (8AM-12PM)</option>
              <option value="afternoon">Afternoon (12PM-5PM)</option>
              <option value="evening">Evening (5PM-8PM)</option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <label for="bookingRequests">Special Requests</label>
          <textarea id="bookingRequests" placeholder="Any special requirements or requests..."></textarea>
        </div>
        
        <div class="booking-summary">
          <div class="summary-item">
            <span>Tour:</span>
            <span>${tourTitle}</span>
          </div>
          <div class="summary-item">
            <span>Price per person:</span>
            <span>${tourPrice}</span>
          </div>
          <div class="summary-item total">
            <span>Total:</span>
            <span id="totalPrice">${tourPrice}</span>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn btn-secondary cancel-booking">Cancel</button>
          <button type="submit" class="btn btn-primary">Book Now</button>
        </div>
      </form>
    </div>
  `
  );

  // Set minimum date to today
  const dateInput = modal.querySelector("#bookingDate");
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;

  // Handle guest count change for price calculation
  const guestsSelect = modal.querySelector("#bookingGuests");
  const totalPriceElement = modal.querySelector("#totalPrice");
  const basePrice = parseFloat(tourPrice.replace(/[^0-9.]/g, ""));

  guestsSelect.addEventListener("change", (e) => {
    const guestCount = parseInt(e.target.value) || 1;
    const total = basePrice * guestCount;
    totalPriceElement.textContent = `$${total.toLocaleString()}`;
  });

  // Handle form submission
  const bookingForm = modal.querySelector("#bookingForm");
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleBookingSubmission(modal, tourTitle);
  });

  // Handle cancel button
  const cancelButton = modal.querySelector(".cancel-booking");
  cancelButton.addEventListener("click", () => {
    closeModal(modal);
  });
}

function openVideoModal() {
  const modal = createModal(
    "Wanderlust Tours Experience",
    `
    <div class="video-container">
      <div class="video-placeholder">
        <div class="play-button">
          <i class="fas fa-play"></i>
        </div>
        <h3>Experience the World with Wanderlust Tours</h3>
        <p>Watch our promotional video to see the amazing destinations and experiences we offer.</p>
      </div>
    </div>
  `
  );

  // Simulate video play
  const playButton = modal.querySelector(".play-button");
  playButton.addEventListener("click", () => {
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
    playButton.style.background = "rgba(0, 0, 0, 0.7)";

    setTimeout(() => {
      showNotification("Video playing... (This is a demo)", "info");
    }, 500);
  });
}

function openDestinationModal(destination, price, duration) {
  // Define image mappings for each destination
  const destinationImages = {
    "Tokyo, Japan": "./public/images/tokyo2.avif",
    "Machu Picchu, Peru": "./public/images/peru2.avif",
    "Santorini, Greece": "./public/images/santorini2.webp",
    "Bali, Indonesia": "./public/images/bali2.avif",
  };

  const imageUrl = destinationImages[destination] || "./public/images/Bali.jpg";

  const modal = createModal(
    destination,
    `
    <div class="destination-details">
      <div class="destination-image-large">
        <img src="${imageUrl}" alt="${destination}" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
      </div>
      
      <div class="destination-info-detailed">
        <div class="destination-meta">
          <span class="price-large">${price}</span>
          <span class="duration-large">${duration}</span>
        </div>
        
        <div class="destination-features">
          <h4>What's Included:</h4>
          <ul>
            <li><i class="fas fa-check"></i> Professional tour guide</li>
            <li><i class="fas fa-check"></i> Transportation</li>
            <li><i class="fas fa-check"></i> Accommodation</li>
            <li><i class="fas fa-check"></i> Meals as specified</li>
            <li><i class="fas fa-check"></i> Entry fees to attractions</li>
          </ul>
        </div>
        
        <div class="destination-description">
          <h4>About This Destination:</h4>
          <p>Discover the beauty and culture of ${destination}. This carefully crafted tour offers an authentic experience with local guides, comfortable accommodations, and unforgettable memories.</p>
        </div>
        
        <div class="destination-actions">
          <button class="btn btn-primary book-destination">Book This Tour</button>
          <button class="btn btn-secondary more-info">More Information</button>
        </div>
      </div>
    </div>
  `
  );

  // Handle booking button
  const bookButton = modal.querySelector(".book-destination");
  bookButton.addEventListener("click", () => {
    closeModal(modal);
    setTimeout(() => {
      openBookingModal(`${destination} Tour`, price);
    }, 300);
  });

  // Handle more info button
  const moreInfoButton = modal.querySelector(".more-info");
  moreInfoButton.addEventListener("click", () => {
    showNotification("More information sent to your email!", "success");
  });
}

function handleBookingSubmission(modal, tourTitle) {
  const form = modal.querySelector("#bookingForm");
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');

  // Basic validation
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.style.borderColor = "#ef4444";
      isValid = false;
    } else {
      field.style.borderColor = "";
    }
  });

  if (!isValid) {
    showNotification("Please fill in all required fields", "error");
    return;
  }

  // Show loading state
  submitButton.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Processing...';
  submitButton.disabled = true;

  // Simulate booking process
  setTimeout(() => {
    closeModal(modal);

    // Show success message
    showNotification(
      "🎉 Booking confirmed! Check your email for details.",
      "success"
    );

    // Send confirmation email simulation
    setTimeout(() => {
      showNotification("Confirmation email sent!", "info");
    }, 2000);

    // Show booking reference
    setTimeout(() => {
      const bookingRef =
        "WT" + Math.random().toString(36).substr(2, 9).toUpperCase();
      showNotification(`Your booking reference: ${bookingRef}`, "info");
    }, 4000);
  }, 3000);
}

function createModal(title, content) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${title}</h2>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        ${content}
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  // Handle close button
  const closeButton = modal.querySelector(".modal-close");
  closeButton.addEventListener("click", () => {
    closeModal(modal);
  });

  // Handle click outside modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  // Handle escape key
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closeModal(modal);
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);

  // Animate modal in
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);

  return modal;
}

function closeModal(modal) {
  modal.classList.remove("show");
  setTimeout(() => {
    document.body.removeChild(modal);
    document.body.style.overflow = "";
  }, 300);
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${
        type === "success"
          ? "check-circle"
          : type === "error"
          ? "exclamation-circle"
          : "info-circle"
      }"></i>
      <span>${message}</span>
    </div>
  `;

  const colors = {
    success: "#10b981",
    error: "#ef4444",
    info: "#3b82f6",
  };

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${colors[type]};
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    animation: slideInRight 0.3s ease;
    max-width: 400px;
    word-wrap: break-word;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Add modal and booking styles
const style = document.createElement("style");
style.textContent = `
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .modal-overlay.show {
    opacity: 1;
  }
  
  .modal-content {
    background: white;
    border-radius: 12px;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.9);
    transition: transform 0.3s ease;
  }
  
  .modal-overlay.show .modal-content {
    transform: scale(1);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .modal-header h2 {
    margin: 0;
    color: var(--text-primary);
  }
  
  .modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--text-secondary);
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  
  .modal-close:hover {
    background: var(--background-light);
    color: var(--text-primary);
  }
  
  .modal-body {
    padding: 24px;
  }
  
  .booking-form {
    max-width: 600px;
  }
  
  .booking-form h3 {
    margin: 0 0 8px 0;
    color: var(--text-primary);
  }
  
  .tour-price {
    color: var(--primary-color);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 24px;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    font-weight: 500;
    margin-bottom: 4px;
    color: var(--text-primary);
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 12px;
    border: 2px solid var(--border-light);
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.2s ease;
  }
  
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
  }
  
  .form-group textarea {
    resize: vertical;
    min-height: 80px;
  }
  
  .booking-summary {
    background: var(--background-light);
    padding: 20px;
    border-radius: 8px;
    margin: 24px 0;
  }
  
  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  
  .summary-item.total {
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--primary-color);
    border-top: 1px solid var(--border-light);
    padding-top: 8px;
    margin-top: 12px;
  }
  
  .form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }
  
  .video-container {
    max-width: 600px;
    text-align: center;
  }
  
  .video-placeholder {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 60px 40px;
    border-radius: 12px;
    position: relative;
  }
  
  .play-button {
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .play-button:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: scale(1.1);
  }
  
  .play-button i {
    font-size: 32px;
    margin-left: 4px;
  }
  
  .destination-details {
    max-width: 700px;
  }
  
  .destination-image-large {
    height: 300px;
    margin-bottom: 24px;
    border-radius: 12px;
    overflow: hidden;
  }
  
  .destination-image-large .image-placeholder {
    height: 100%;
    background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--text-light);
  }
  
  .destination-image-large .image-placeholder i {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .destination-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .price-large {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color);
  }
  
  .duration-large {
    font-size: 1.2rem;
    color: var(--text-secondary);
  }
  
  .destination-features {
    margin-bottom: 24px;
  }
  
  .destination-features h4 {
    margin-bottom: 12px;
    color: var(--text-primary);
  }
  
  .destination-features ul {
    list-style: none;
    padding: 0;
  }
  
  .destination-features li {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    color: var(--text-secondary);
  }
  
  .destination-features i {
    color: var(--accent-color);
    font-size: 14px;
  }
  
  .destination-description {
    margin-bottom: 24px;
  }
  
  .destination-description h4 {
    margin-bottom: 12px;
    color: var(--text-primary);
  }
  
  .destination-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }
  
  @media (max-width: 768px) {
    .modal-content {
      max-width: 95vw;
      max-height: 95vh;
    }
    
    .form-row {
      grid-template-columns: 1fr;
    }
    
    .form-actions,
    .destination-actions {
      flex-direction: column;
    }
    
    .destination-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
`;

document.head.appendChild(style);
