/**
 * samba.lv - Informācijas Portāla Skripts
 * Kategoriju meklēšana, FAQ akordeons un analītika.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initFaq();
});

/* ==========================================================================
   Kategoriju Reāllaika Atlasīšana
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('categorySearchInput');
  const searchButton = document.getElementById('searchButton');
  const categoryBlocks = document.querySelectorAll('.category-block');

  function filterCategories() {
    const query = (searchInput?.value || '').trim().toLowerCase();

    categoryBlocks.forEach(block => {
      if (!query) {
        block.style.display = 'block';
        return;
      }

      const title = block.querySelector('.category-title')?.textContent.toLowerCase() || '';
      const items = Array.from(block.querySelectorAll('.subcat-item'))
        .map(el => el.textContent.toLowerCase())
        .join(' ');

      if (title.includes(query) || items.includes(query)) {
        block.style.display = 'block';
      } else {
        block.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCategories);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        filterCategories();
        document.getElementById('kategorijas')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      filterCategories();
      document.getElementById('kategorijas')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   FAQ Akordeons
   ========================================================================== */
function initFaq() {
  const faqRows = document.querySelectorAll('.faq-row');

  faqRows.forEach(row => {
    const toggleBtn = row.querySelector('.faq-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = row.classList.contains('open');

      faqRows.forEach(otherRow => otherRow.classList.remove('open'));

      if (!isOpen) {
        row.classList.add('open');
      }
    });
  });
}
