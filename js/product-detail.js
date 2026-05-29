// js/product-detail.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productContainer = document.getElementById('product-container');
    const relatedGrid = document.getElementById('related-grid');

    if (!productId || !getProductById(productId)) {
        productContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 5rem 0;">
                <h2>Product not found.</h2>
                <a href="shop.html" class="btn btn-accent" style="margin-top: 2rem;">Return to Shop</a>
            </div>
        `;
        return;
    }

    const product = getProductById(productId);
    
    // Update Page Title
    document.title = `${product.name} | Cloth Luxury`;

    // Render Product HTML
    const oldPriceHtml = product.oldPrice ? `<span class="price-old" style="font-size:1.2rem;">$${product.oldPrice}</span>` : '';
    
    productContainer.innerHTML = `
        <div class="product-gallery reveal-left">
            <div class="thumbnails">
                <img src="${product.image}" class="thumbnail active" onclick="changeMainImage(this.src, this)">
                <img src="${product.hoverImage}" class="thumbnail" onclick="changeMainImage(this.src, this)">
                <!-- Adding dummy thumbnails for effect -->
                <img src="${product.image}" class="thumbnail" style="filter: grayscale(100%);" onclick="changeMainImage(this.src, this)">
            </div>
            <div class="main-image-container">
                <img id="main-img" src="${product.image}" alt="${product.name}">
            </div>
        </div>
        
        <div class="product-info-wrapper reveal-right">
            <div class="breadcrumbs">
                <a href="index.html">Home</a> / <a href="shop.html?category=${product.category.toLowerCase()}">${product.category}</a> / ${product.name}
            </div>
            <h1 class="product-title-large title-serif">${product.name}</h1>
            <div class="product-price-large">
                ${oldPriceHtml}
                <span>$${product.price}</span>
            </div>
            <p class="product-desc">${product.description} Crafted with meticulous attention to detail, ensuring a premium feel and long-lasting durability.</p>
            
            <div class="option-group">
                <span class="option-title">Select Size</span>
                <div class="size-options">
                    <button class="size-btn">XS</button>
                    <button class="size-btn active">S</button>
                    <button class="size-btn">M</button>
                    <button class="size-btn">L</button>
                </div>
            </div>

            <div class="action-group">
                <div class="qty-selector">
                    <button class="qty-btn" onclick="updateQty(-1)"><i class="ph ph-minus"></i></button>
                    <input type="number" id="qty-input" class="qty-input" value="1" min="1" max="10" readonly>
                    <button class="qty-btn" onclick="updateQty(1)"><i class="ph ph-plus"></i></button>
                </div>
                <button class="btn btn-accent add-btn" id="p-add-to-cart">Add to Cart - $${product.price}</button>
                <button class="action-btn wishlist-btn" data-id="${product.id}" style="width:50px; height:50px; font-size:1.5rem;" title="Add to Wishlist">
                    <i class="ph ${WishlistStore.isInWishlist(product.id) ? 'ph-heart ph-fill' : 'ph-heart'}"></i>
                </button>
            </div>

            <div class="accordion">
                <div class="acc-item active">
                    <button class="acc-header">Product Details <i class="ph ph-caret-down"></i></button>
                    <div class="acc-content">
                        <div class="acc-content-inner">
                            <ul>
                                <li>Premium material composition</li>
                                <li>Designed in Paris, France</li>
                                <li>Dry clean only</li>
                                <li>Model is 5'9" wearing size S</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="acc-item">
                    <button class="acc-header">Shipping & Returns <i class="ph ph-caret-down"></i></button>
                    <div class="acc-content">
                        <div class="acc-content-inner">
                            <p>Complimentary express shipping on all orders over $200. Secure checkout. Returns accepted within 30 days of receipt.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Handle Image Swapping globally
    window.changeMainImage = (src, el) => {
        document.getElementById('main-img').src = src;
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        el.classList.add('active');
    };

    // Handle Qty locally
    window.updateQty = (change) => {
        const input = document.getElementById('qty-input');
        let val = parseInt(input.value) + change;
        if(val < 1) val = 1;
        if(val > 10) val = 10;
        input.value = val;
        
        const addBtn = document.getElementById('p-add-to-cart');
        addBtn.innerText = `Add to Cart - $${product.price * val}`;
    };

    // Accordion Logic
    const accHeaders = document.querySelectorAll('.acc-header');
    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const wasActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('active'));
            
            if(!wasActive) {
                item.classList.add('active');
            }
        });
    });

    // Add to cart main button logic
    document.getElementById('p-add-to-cart').addEventListener('click', () => {
        const qty = parseInt(document.getElementById('qty-input').value);
        CartStore.addItem(product, qty);
    });

    // Size selection UI
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Render Related Products (Same category, excluding current)
    if (relatedGrid) {
        const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
        if (related.length > 0) {
            relatedGrid.innerHTML = related.map(p => generateProductCard(p)).join('');
        } else {
            // fallback
            const fallback = products.filter(p => p.id !== product.id).slice(0, 4);
            relatedGrid.innerHTML = fallback.map(p => generateProductCard(p)).join('');
        }
    }
});
