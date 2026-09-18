/* ==========================================================================
   PORTFOLIO - GLOBAL BACKEND JS UTILITIES
   File: backend/static/js/custom.js
   ========================================================================== */

(function () {
  'use strict';

  // Helper to extract CSRF token from cookies
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  // Global helper for secure API POST/PATCH requests
  window.portfolioApi = {
    csrfToken: getCookie('csrftoken'),
    async fetchWithCsrf(url, options = {}) {
      options.headers = {
        'X-CSRFToken': this.csrfToken,
        'Content-Type': 'application/json',
        ...options.headers,
      };
      return fetch(url, options);
    },
  };
})();