// js/wishlist.js

document.addEventListener('DOMContentLoaded', () => {
    const wishlistContent = document.getElementById('wishlist-content');

    const renderWishlist = () => {
        const wishlist = WishlistStore.getWishlist();

        if (wishlist.length === 0) {
            wishlistContent.innerHTML = `
                <div class="empty-wishlist">
                    <i class="ph ph-heart-break"></i>
                    <h2 class="title-serif">Your wishlist is empty</h2>
                    <p class="text-muted">Save items you love here to easily find them later.</p>
                    <a href="shop.html" class="btn btn-accent mt-3">Explore Collection</a>
                </div>
            `;
            return;
        }

        let html = '<div class="products-grid reveal-left">';
        wishlist.forEach(product => {
            // Use the global generator with active heart icon
            const saleBadge = product.badge === 'sale' ? `<span class="badge-tag sale">Sale</span>` : '';
            const trendingBadge = product.badge === 'trending' ? `<span class="badge-tag">Trending</span>` : '';
            const newBadge = product.isNew ? `<span class="badge-tag">New</span>` : '';
            const oldPriceHTML = product.oldPrice ? `<span class="price-old">$${product.oldPrice}</span>` : '';

            html += `
                <div class="product-card">
                    <div class="product-badges">
                        ${newBadge}
                        ${saleBadge}
                        ${trendingBadge}
                    </div>
                    <a href="product.html?id=${product.id}" class="product-img-wrapper">
                        <img src="${product.image}" alt="${product.name}" class="img-main">
                        <img src="${product.hoverImage}" alt="${product.name}" class="img-hover">
                    </a>
                    <div class="product-actions">
                        <button class="action-btn wishlist-btn active" data-id="${product.id}" title="Remove from Wishlist">
                            <i class="ph ph-heart ph-fill"></i>
                        </button>
                        <button class="action-btn add-to-cart-btn" data-id="${product.id}" title="Add to Cart">
                            <i class="ph ph-shopping-bag"></i>
                        </button>
                        <a href="product.html?id=${product.id}" class="action-btn" title="View Details">
                            <i class="ph ph-eye"></i>
                        </a>
                    </div>
                    <div class="product-info">
                        <span class="product-category">${product.category}</span>
                        <a href="product.html?id=${product.id}" class="product-title">${product.name}</a>
                        <div class="product-price">
                            ${oldPriceHTML}
                            <span class="price-current">$${product.price}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';

        wishlistContent.innerHTML = html;

        // Re-trigger scroll reveal animations
        if (typeof initScrollReveal === 'function') {
            initScrollReveal();
        }
    };

    // Override global click listener for wishlist toggle to re-render page
    document.addEventListener('click', (e) => {
        const wishlistBtn = e.target.closest('.wishlist-btn');
        // Only re-render if we are on the wishlist page and the button is clicked
        if (wishlistBtn && window.location.pathname.includes('wishlist.html')) {
            // Give local storage a split second to update from store.js before re-rendering
            setTimeout(() => {
                renderWishlist();
            }, 50);
        }
    });

    // Initial render
    renderWishlist();
});
