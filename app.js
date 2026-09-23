/**
 * samba.lv - Pre-launch Portal JavaScript
 * Interactive functionality: Search filtering, Waitlist submission, Theme Toggle, FAQ accordion & GA4 Tracking.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSearch();
  initWaitlist();
  initFaq();
  initAnalyticsTracking();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // Check stored theme or default to dark
  const storedTheme = localStorage.getItem('samba_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('samba_theme', newTheme);
      updateThemeIcon(newTheme);
      
      trackAnalytics('theme_change', { theme: newTheme });
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.innerHTML = '🌙';
      themeToggleBtn.setAttribute('title', 'Pārslēgt uz tumšo režīmu');
    } else {
      themeIcon.innerHTML = '☀️';
      themeToggleBtn.setAttribute('title', 'Pārslēgt uz gaišo režīmu');
    }
  }
}

/* ==========================================================================
   2. Live Real-time Category Search
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('categorySearchInput');
  const categoryCards = document.querySelectorAll('.category-card');
  const searchButton = document.getElementById('searchButton');

  function performSearch() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    
    if (!query) {
      categoryCards.forEach(card => card.style.display = 'block');
      return;
    }

    let matchCount = 0;
    categoryCards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const tags = Array.from(card.querySelectorAll('.subcategory-tag'))
        .map(t => t.textContent.toLowerCase())
        .join(' ');

      if (title.includes(query) || tags.includes(query)) {
        card.style.display = 'block';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (query.length > 2) {
      trackAnalytics('search_query', { query: query, matches: matchCount });
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const firstVisibleCard = document.querySelector('.category-card[style*="display: block"], .category-card:not([style*="display: none"])');
        if (firstVisibleCard) {
          firstVisibleCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      const query = (searchInput?.value || '').trim();
      if (query) {
        document.getElementById('kategorijas')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Allow clicking on any subcategory tag to focus waitlist or search
  document.querySelectorAll('.subcategory-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const text = tag.textContent.trim();
      trackAnalytics('category_tag_click', { tag_name: text });
      
      const emailField = document.getElementById('waitlistEmail');
      const categorySelect = document.getElementById('waitlistCategory');
      
      if (categorySelect) {
        // Try to match select options
        const parentCardTitle = tag.closest('.category-card')?.querySelector('h3')?.textContent.trim() || '';
        for (let i = 0; i < categorySelect.options.length; i++) {
          if (categorySelect.options[i].text.includes(parentCardTitle) || categorySelect.options[i].value.toLowerCase().includes(parentCardTitle.toLowerCase())) {
            categorySelect.selectedIndex = i;
            break;
          }
        }
      }

      document.getElementById('gaidisanas-rinda')?.scrollIntoView({ behavior: 'smooth' });
      if (emailField) {
        setTimeout(() => emailField.focus(), 600);
      }
    });
  });
}

/* ==========================================================================
   3. Waitlist & Early Access Submission
   ========================================================================== */
function initWaitlist() {
  const form = document.getElementById('waitlistForm');
  const successMsg = document.getElementById('formSuccessMessage');
  const submitBtn = document.getElementById('waitlistSubmitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('waitlistEmail')?.value.trim();
    const category = document.getElementById('waitlistCategory')?.value;
    const userType = document.getElementById('waitlistUserType')?.value;

    if (!email || !validateEmail(email)) {
      alert('Lūdzu, ievadiet derīgu e-pasta adresi!');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '⏳ Saglabā...';
    }

    // Store in localStorage
    const waitlistData = {
      email: email,
      category: category,
      userType: userType,
      timestamp: new Date().toISOString()
    };

    const existingWaitlist = JSON.parse(localStorage.getItem('samba_waitlist_leads') || '[]');
    existingWaitlist.push(waitlistData);
    localStorage.setItem('samba_waitlist_leads', JSON.stringify(existingWaitlist));

    // GA4 conversion event
    trackAnalytics('waitlist_signup', {
      user_type: userType,
      category_interest: category
    });

    // Simulate short network delay for smooth UX
    setTimeout(() => {
      form.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('active');
      }
    }, 600);
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

/* ==========================================================================
   4. FAQ Accordion
   ========================================================================== */
function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordion items
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
        const questionText = questionBtn.querySelector('span')?.textContent || '';
        trackAnalytics('faq_expand', { question: questionText });
      }
    });
  });
}

/* ==========================================================================
   5. Google Analytics 4 (GA4) Helper
   ========================================================================== */
function initAnalyticsTracking() {
  // Track button clicks with data-ga-action
  document.querySelectorAll('[data-ga-action]').forEach(elem => {
    elem.addEventListener('click', () => {
      const action = elem.getAttribute('data-ga-action');
      const label = elem.getAttribute('data-ga-label') || elem.textContent.trim();
      trackAnalytics(action, { event_label: label });
    });
  });
}

function trackAnalytics(eventName, params = {}) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
      console.log(`[GA4 Event] ${eventName}:`, params);
    } else {
      console.log(`[GA4 Simulated Event] ${eventName}:`, params);
    }
  } catch (err) {
    console.warn('Analytics tracking error:', err);
  }
}
