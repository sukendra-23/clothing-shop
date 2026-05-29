// js/shop.js

document.addEventListener('DOMContentLoaded', () => {
    const shopGrid = document.getElementById('shop-grid');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    const filterSale = document.getElementById('filter-sale');
    const filterNew = document.getElementById('filter-new');

    let currentProducts = [...products];

    // Read URL params for initial category filtering (if navigated from home page)
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get('category');
    if (initialCategory) {
        const targetRadio = document.querySelector(`input[name="category"][value="${initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1)}"]`);
        if (targetRadio) {
            targetRadio.checked = true;
        }
    }

    const renderProducts = (prods) => {
        if (prods.length === 0) {
            shopGrid.innerHTML = '<div class="no-results">No products found matching your criteria.</div>';
            return;
        }
        shopGrid.innerHTML = prods.map(p => generateProductCard(p)).join('');
        // Re-initialize scroll reveal for new elements
        if (typeof initScrollReveal === 'function') {
            setTimeout(initScrollReveal, 100);
        }
    };

    const applyFilters = () => {
        // 1. Search
        const searchTerm = searchInput.value.toLowerCase();
        let filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm));

        // 2. Category
        const selectedCategory = document.querySelector('input[name="category"]:checked').value;
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // 3. Checkboxes
        if (filterSale.checked) {
            filtered = filtered.filter(p => p.badge === 'sale' || p.oldPrice);
        }
        if (filterNew.checked) {
            filtered = filtered.filter(p => p.isNew);
        }

        // 4. Sort
        const sortVal = sortSelect.value;
        if (sortVal === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortVal === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortVal === 'name-asc') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        currentProducts = filtered;
        renderProducts(currentProducts);
    };

    // Event Listeners
    searchInput.addEventListener('input', applyFilters);
    sortSelect.addEventListener('change', applyFilters);
    categoryRadios.forEach(radio => radio.addEventListener('change', applyFilters));
    filterSale.addEventListener('change', applyFilters);
    filterNew.addEventListener('change', applyFilters);

    // Initial render
    applyFilters();
});
