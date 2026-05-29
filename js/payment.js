// js/payment.js

document.addEventListener('DOMContentLoaded', () => {
    const cart = CartStore.getCart();

    // Redirect if cart is empty
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    const itemsContainer = document.getElementById('checkout-items');
    const FREE_SHIPPING_THRESHOLD = 200;
    const SHIPPING_COST = 25;

    // Render Summary
    let itemsHtml = '';
    cart.forEach(item => {
        itemsHtml += `
            <div class="summary-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="summary-item-info">
                    <h4>${item.name}</h4>
                    <span>Qty: ${item.quantity}</span>
                </div>
                <div style="font-weight:600;">$${item.price * item.quantity}</div>
            </div>
        `;
    });
    itemsContainer.innerHTML = itemsHtml;

    const subtotal = CartStore.getTotal();
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shipping;

    document.getElementById('summ-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summ-shipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('summ-total').textContent = `$${total.toFixed(2)}`;
    document.getElementById('btn-total-val').textContent = `$${total.toFixed(2)}`;

    // Tab Switching
    window.switchTab = (tabId) => {
        // Reset inputs
        const currentActiveInputs = document.querySelector('.tab-content.active').querySelectorAll('input[required]');
        currentActiveInputs.forEach(inp => inp.required = false);

        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        event.target.classList.add('active');
        const activeTab = document.getElementById(`tab-${tabId}`);
        activeTab.classList.add('active');

        // Set new inputs as required
        const newInputs = activeTab.querySelectorAll('input');
        if (tabId === 'card') {
            newInputs.forEach(inp => inp.required = true);
        } else if (tabId === 'upi') {
            document.getElementById('upi-id').required = true;
        }
    };

    // Format Card Number
    window.formatCardNum = (input) => {
        let val = input.value.replace(/\D/g, ''); // remove non-digits
        let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
        input.value = formatted;
        
        const preview = document.getElementById('preview-num');
        preview.textContent = formatted || '**** **** **** ****';
    };

    // Process Payment Simulation
    window.processPayment = () => {
        const overlay = document.getElementById('processing-overlay');
        const progressFill = document.getElementById('progress-fill');
        const msg = document.getElementById('proc-msg');
        
        overlay.classList.add('active');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            progressFill.style.width = `${progress}%`;

            if (progress > 50) {
                msg.textContent = "Securing transaction...";
            }
            if (progress > 85) {
                msg.textContent = "Finalizing order...";
            }

            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    // Generate Fake Order ID and save details
                    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
                    localStorage.setItem('cloth_last_order', JSON.stringify({
                        id: orderId,
                        total: total,
                        items: cart.length
                    }));
                    
                    // Clear cart
                    CartStore.clearCart();
                    
                    // Redirect
                    window.location.href = 'success.html';
                }, 500);
            }
        }, 300);
    };
});
