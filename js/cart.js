// js/cart.js

document.addEventListener('DOMContentLoaded', () => {
    const cartLayout = document.getElementById('cart-layout');
    
    // Shipping threshold
    const FREE_SHIPPING_THRESHOLD = 200;
    const SHIPPING_COST = 25;

    const renderCart = () => {
        const cart = CartStore.getCart();

        if (cart.length === 0) {
            cartLayout.innerHTML = `
                <div style="grid-column: 1/-1; width: 100%;">
                    <div class="empty-cart reveal">
                        <i class="ph ph-shopping-bag-open"></i>
                        <h2>Your bag is empty</h2>
                        <p class="text-muted mt-2 mb-3">Looks like you haven't added anything to your cart yet.</p>
                        <a href="shop.html" class="btn btn-accent mt-3">Start Shopping</a>
                    </div>
                </div>
            `;
            return;
        }

        const subtotal = CartStore.getTotal();
        const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
        const total = subtotal + shipping;

        // Render Items
        let itemsHtml = '<div class="cart-items-container reveal-left">';
        cart.forEach(item => {
            itemsHtml += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <a href="product.html?id=${item.id}" class="cart-item-title">${item.name}</a>
                        <span class="cart-item-price">$${item.price}</span>
                        <div class="cart-qty">
                            <button onclick="changeQty('${item.id}', -1)"><i class="ph ph-minus"></i></button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQty('${item.id}', 1)"><i class="ph ph-plus"></i></button>
                        </div>
                    </div>
                    <button class="remove-item-btn" onclick="removeItem('${item.id}')" title="Remove Item">
                        <i class="ph ph-x"></i>
                    </button>
                </div>
            `;
        });
        itemsHtml += '</div>';

        // Render Summary
        const summaryHtml = `
            <div class="order-summary reveal-right">
                <h3 class="summary-title">Order Summary</h3>
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping</span>
                    <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
                </div>
                ${shipping > 0 ? `<div style="font-size:0.8rem; color:var(--clr-accent); text-align:right; margin-bottom:1rem;">Spend $${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping!</div>` : ''}
                
                <div class="summary-total">
                    <span>Total</span>
                    <span>$${total.toFixed(2)}</span>
                </div>

                <div class="coupon-box">
                    <input type="text" placeholder="Promo Code">
                    <button class="btn btn-outline" onclick="showToast('Invalid promo code', 'error')">Apply</button>
                </div>

                <a href="payment.html" class="btn btn-accent checkout-btn">Proceed to Checkout</a>
            </div>
        `;

        cartLayout.innerHTML = itemsHtml + summaryHtml;
        
        // Re-trigger animations
        if(typeof initScrollReveal === 'function') initScrollReveal();
    };

    window.changeQty = (id, change) => {
        const cart = CartStore.getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
            CartStore.updateQuantity(id, item.quantity + change);
            renderCart();
        }
    };

    window.removeItem = (id) => {
        CartStore.removeItem(id);
        showToast('Item removed', 'info');
        renderCart();
    };

    renderCart();
});
