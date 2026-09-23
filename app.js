/**
 * samba.lv - SS Stila Kataloga Skripts
 * Reāllaika kategoriju meklēšana un filtrs.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
});

function initSearch() {
  const searchInput = document.getElementById('categorySearchInput');
  const searchButton = document.getElementById('searchButton');
  const categoryBlocks = document.querySelectorAll('.ss-category-block');

  function filterCategories() {
    const query = (searchInput?.value || '').trim().toLowerCase();

    categoryBlocks.forEach(block => {
      if (!query) {
        block.style.display = 'flex';
        // Reset subitems display
        block.querySelectorAll('.ss-subcat-list li').forEach(li => li.style.display = 'list-item');
        return;
      }

      const title = block.querySelector('.ss-cat-title')?.textContent.toLowerCase() || '';
      let hasMatchingChild = false;

      block.querySelectorAll('.ss-subcat-list li').forEach(li => {
        const itemText = li.textContent.toLowerCase();
        if (itemText.includes(query) || title.includes(query)) {
          li.style.display = 'list-item';
          hasMatchingChild = true;
        } else {
          li.style.display = 'none';
        }
      });

      if (title.includes(query) || hasMatchingChild) {
        block.style.display = 'flex';
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
      }
    });
  }

  if (searchButton) {
    searchButton.addEventListener('click', filterCategories);
  }
}
