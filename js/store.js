// js/store.js

// Manage Cart
const CartStore = {
    getCart() {
        try {
            return JSON.parse(localStorage.getItem('cloth_cart')) || [];
        } catch {
            return [];
        }
    },
    syncFromCatalog() {
        if (typeof getProductById !== 'function') return;
        const cart = this.getCart();
        let changed = false;
        cart.forEach(item => {
            const product = getProductById(item.id);
            if (product) {
                if (item.image !== product.image) {
                    item.image = product.image;
                    changed = true;
                }
                if (item.hoverImage !== product.hoverImage) {
                    item.hoverImage = product.hoverImage;
                    changed = true;
                }
                if (item.price !== product.price) {
                    item.price = product.price;
                    changed = true;
                }
                if (item.name !== product.name) {
                    item.name = product.name;
                    changed = true;
                }
            }
        });
        if (changed) this.saveCart(cart);
    },
    saveCart(cart) {
        localStorage.setItem('cloth_cart', JSON.stringify(cart));
        updateCartCount();
    },
    addItem(product, quantity = 1) {
        const cart = this.getCart();
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }
        this.saveCart(cart);
        showToast('Added to Cart', 'success');
    },
    removeItem(id) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== id);
        this.saveCart(cart);
    },
    updateQuantity(id, quantity) {
        const cart = this.getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) this.removeItem(id);
            else this.saveCart(cart);
        }
    },
    clearCart() {
        localStorage.removeItem('cloth_cart');
        updateCartCount();
    },
    getTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
};

// Manage Wishlist
const WishlistStore = {
    getWishlist() {
        return JSON.parse(localStorage.getItem('cloth_wishlist')) || [];
    },
    saveWishlist(wishlist) {
        localStorage.setItem('cloth_wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
    },
    toggleItem(product) {
        let wishlist = this.getWishlist();
        const exists = wishlist.find(item => item.id === product.id);
        
        if (exists) {
            wishlist = wishlist.filter(item => item.id !== product.id);
            showToast('Removed from Wishlist', 'info');
        } else {
            wishlist.push(product);
            showToast('Added to Wishlist', 'success');
        }
        this.saveWishlist(wishlist);
        return !exists; // true if added, false if removed
    },
    isInWishlist(id) {
        const wishlist = this.getWishlist();
        return wishlist.some(item => item.id === id);
    }
};

// Manage Auth State
const AuthStore = {
    getUser() {
        return JSON.parse(localStorage.getItem('cloth_user')) || null;
    },
    login(user) {
        localStorage.setItem('cloth_user', JSON.stringify(user));
        updateAuthUI();
    },
    logout() {
        localStorage.removeItem('cloth_user');
        updateAuthUI();
        window.location.href = 'index.html';
    },
    isLoggedIn() {
        return !!this.getUser();
    }
};

// Update UI Counts
function updateCartCount() {
    const count = CartStore.getCart().reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

function updateWishlistCount() {
    const count = WishlistStore.getWishlist().length;
    const badge = document.getElementById('wishlist-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

function updateAuthUI() {
    const userBtn = document.getElementById('user-btn');
    if (userBtn) {
        if (AuthStore.isLoggedIn()) {
            userBtn.href = "#"; // Could link to profile
            userBtn.innerHTML = `<i class="ph ph-user-check"></i>`;
            userBtn.onclick = (e) => {
                e.preventDefault();
                if(confirm('Do you want to logout?')) {
                    AuthStore.logout();
                }
            };
        } else {
            userBtn.href = "login.html";
            userBtn.innerHTML = `<i class="ph ph-user"></i>`;
            userBtn.onclick = null;
        }
    }
}

// Global Toast Notification
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'ph-check-circle' : type === 'error' ? 'ph-warning-circle' : 'ph-info';
    
    toast.innerHTML = `
        <i class="ph ${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3s
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Global Event Listeners for Add to Cart / Wishlist buttons
document.addEventListener('click', (e) => {
    // Add to cart
    const addToCartBtn = e.target.closest('.add-to-cart-btn');
    if (addToCartBtn && typeof getProductById === 'function') {
        const id = addToCartBtn.dataset.id;
        const product = getProductById(id);
        if (product) CartStore.addItem(product);
    }

    // Toggle Wishlist
    const wishlistBtn = e.target.closest('.wishlist-btn');
    if (wishlistBtn && typeof getProductById === 'function') {
        const id = wishlistBtn.dataset.id;
        const product = getProductById(id);
        if (product) {
            const added = WishlistStore.toggleItem(product);
            const icon = wishlistBtn.querySelector('i');
            if (added) {
                icon.classList.remove('ph-heart');
                icon.classList.add('ph-heart', 'ph-fill');
                wishlistBtn.classList.add('active');
            } else {
                icon.classList.remove('ph-fill');
                wishlistBtn.classList.remove('active');
            }
        }
    }
});
