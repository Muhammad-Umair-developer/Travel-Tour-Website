// Contact form functionality
export function initializeContact() {
  const contactForm = document.querySelector('#contactForm');
  const formInputs = contactForm?.querySelectorAll('input, select, textarea');

  if (!contactForm) return;

  // Add form validation
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFormSubmission();
  });

  // Add real-time validation
  formInputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('id');
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    clearFieldError(field);

    // Validation rules
    switch (fieldName) {
      case 'name':
        if (!value) {
          isValid = false;
          errorMessage = 'Name is required';
        } else if (value.length < 2) {
          isValid = false;
          errorMessage = 'Name must be at least 2 characters';
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          isValid = false;
          errorMessage = 'Email is required';
        } else if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
        break;

      case 'phone':
        if (value && !/^\+?[\d\s\-\(\)]+$/.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid phone number';
        }
        break;

      case 'subject':
        if (!value) {
          isValid = false;
          errorMessage = 'Please select a subject';
        }
        break;

      case 'message':
        if (!value) {
          isValid = false;
          errorMessage = 'Message is required';
        } else if (value.length < 10) {
          isValid = false;
          errorMessage = 'Message must be at least 10 characters';
        }
        break;
    }

    if (!isValid) {
      showFieldError(field, errorMessage);
    }

    return isValid;
  }

  function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
  }

  function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  function handleFormSubmission() {
    const formData = new FormData(contactForm);
    const data = {};
    let isFormValid = true;

    // Validate all fields
    formInputs.forEach(input => {
      const isValid = validateField(input);
      if (!isValid) {
        isFormValid = false;
      }
      data[input.id] = input.value.trim();
    });

    if (!isFormValid) {
      showNotification('Please fix the errors below', 'error');
      return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;

      // Show success message
      showNotification('Thank you! Your message has been sent successfully.', 'success');
      
      // Reset form
      contactForm.reset();
      
      // Clear any remaining errors
      formInputs.forEach(input => clearFieldError(input));
      
      // Auto-reply email simulation
      setTimeout(() => {
        showNotification('We\'ll get back to you within 24 hours!', 'info');
      }, 2000);
    }, 2000);
  }

  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      info: '#3b82f6'
    };
    
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${colors[type]};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      animation: slideInRight 0.3s ease;
      max-width: 400px;
      word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }

  // Add character counter for message field
  const messageField = document.querySelector('#message');
  if (messageField) {
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.textContent = '0 / 500 characters';
    messageField.parentNode.appendChild(counter);

    messageField.addEventListener('input', (e) => {
      const length = e.target.value.length;
      counter.textContent = `${length} / 500 characters`;
      counter.style.color = length > 450 ? '#ef4444' : '#6b7280';
    });
  }

  // Add form validation styles
  const style = document.createElement('style');
  style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
      border-color: #ef4444;
      background-color: #fef2f2;
    }
    
    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    
    .character-counter {
      font-size: 0.75rem;
      color: #6b7280;
      margin-top: 0.25rem;
      text-align: right;
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
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
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
