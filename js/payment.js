// js/payment.js

let paymentTotal = 0;
let paymentCart = [];
let selectedUpiApp = null;

document.addEventListener('DOMContentLoaded', () => {
    if (typeof CartStore.syncFromCatalog === 'function') {
        CartStore.syncFromCatalog();
    }
    paymentCart = CartStore.getCart();

    if (paymentCart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    const itemsContainer = document.getElementById('checkout-items');
    const FREE_SHIPPING_THRESHOLD = 200;
    const SHIPPING_COST = 25;

    let itemsHtml = '';
    paymentCart.forEach(item => {
        itemsHtml += `
            <div class="summary-item">
                <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80'">
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
    paymentTotal = subtotal + shipping;

    document.getElementById('summ-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summ-shipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('summ-total').textContent = `$${paymentTotal.toFixed(2)}`;
    document.getElementById('btn-total-val').textContent = `$${paymentTotal.toFixed(2)}`;

    // Tab switching
    window.switchTab = (tabId, evt) => {
        const currentActiveTab = document.querySelector('.tab-content.active');
        if (currentActiveTab) {
            currentActiveTab.querySelectorAll('input[required]').forEach(inp => {
                inp.required = false;
            });
        }

        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        const tabBtn = evt?.currentTarget || evt?.target?.closest('.tab-btn');
        if (tabBtn) tabBtn.classList.add('active');

        const activeTab = document.getElementById(`tab-${tabId}`);
        if (!activeTab) return;
        activeTab.classList.add('active');

        if (tabId !== 'upi') {
            selectedUpiApp = null;
            document.querySelectorAll('.upi-app-btn').forEach(b => b.classList.remove('active'));
        }

        if (tabId === 'card') {
            activeTab.querySelectorAll('input').forEach(inp => {
                inp.required = true;
            });
        } else if (tabId === 'upi') {
            const upiInput = document.getElementById('upi-id');
            if (upiInput) upiInput.required = false;
        }
    };

    // UPI app selection
    document.querySelectorAll('.upi-app-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const isActive = btn.classList.contains('active');
            document.querySelectorAll('.upi-app-btn').forEach(b => b.classList.remove('active'));
            if (isActive) {
                selectedUpiApp = null;
            } else {
                btn.classList.add('active');
                selectedUpiApp = btn.dataset.upiApp;
                document.getElementById('upi-id').value = '';
            }
        });
    });

    document.getElementById('upi-id').addEventListener('input', () => {
        if (document.getElementById('upi-id').value.trim()) {
            selectedUpiApp = null;
            document.querySelectorAll('.upi-app-btn').forEach(b => b.classList.remove('active'));
        }
    });

    // Net banking bank selection highlight
    document.querySelectorAll('.bank-option').forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        option.addEventListener('click', () => {
            document.querySelectorAll('.bank-option').forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            radio.checked = true;
        });
        radio.addEventListener('change', () => {
            document.querySelectorAll('.bank-option').forEach(o => o.classList.remove('active'));
            if (radio.checked) option.classList.add('active');
        });
    });

    window.formatCardNum = (input) => {
        const val = input.value.replace(/\D/g, '');
        const formatted = val.match(/.{1,4}/g)?.join(' ') || '';
        input.value = formatted;
        document.getElementById('preview-num').textContent = formatted || '**** **** **** ****';
    };

    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        processPayment();
    });

    document.getElementById('success-ok-btn').addEventListener('click', () => {
        window.location.href = 'success.html';
    });

    // Postal code input — ensure typing works and only valid chars
    const zipInput = document.getElementById('c-zip');
    if (zipInput) {
        zipInput.value = '';
        zipInput.addEventListener('input', () => {
            zipInput.value = zipInput.value.replace(/[^0-9A-Za-z\s-]/g, '');
        });
        zipInput.addEventListener('focus', () => {
            zipInput.style.color = 'var(--clr-text-main)';
        });
    }
});

function getActivePaymentMethod() {
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) return 'card';
    return activeTab.id.replace('tab-', '');
}

function validatePaymentMethod() {
    const method = getActivePaymentMethod();

    if (method === 'card') {
        const cardNum = document.getElementById('card-number').value.replace(/\s/g, '');
        if (cardNum.length < 12) {
            alert('Please enter a valid card number (dummy: any 12+ digits).');
            return false;
        }
    } else if (method === 'upi') {
        const upi = document.getElementById('upi-id').value.trim();
        if (!selectedUpiApp && (!upi || !upi.includes('@'))) {
            alert('Please select a UPI app (PhonePe, Google Pay, Paytm) or enter a valid UPI ID.');
            return false;
        }
    } else if (method === 'netbank') {
        const bank = document.querySelector('input[name="netbank"]:checked');
        if (!bank) {
            alert('Please select a bank to continue.');
            return false;
        }
    }

    return true;
}

window.processPayment = function processPayment() {
    if (!validatePaymentMethod()) return;

    const overlay = document.getElementById('processing-overlay');
    const progressFill = document.getElementById('progress-fill');
    const msg = document.getElementById('proc-msg');
    const successModal = document.getElementById('payment-success-modal');

    overlay.classList.add('active');
    progressFill.style.width = '0%';
    msg.textContent = 'Processing Payment...';

    let progress = 0;
    const interval = setInterval(() => {
        progress += 20;
        if (progress > 100) progress = 100;
        progressFill.style.width = `${progress}%`;

        if (progress >= 50) msg.textContent = 'Securing transaction...';
        if (progress >= 85) msg.textContent = 'Finalizing order...';

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                overlay.classList.remove('active');

                const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
                const method = getActivePaymentMethod();
                let methodDetail = method;
                if (method === 'upi') {
                    methodDetail = selectedUpiApp || document.getElementById('upi-id').value.trim();
                } else if (method === 'netbank') {
                    methodDetail = document.querySelector('input[name="netbank"]:checked')?.value || 'netbank';
                }

                localStorage.setItem('cloth_last_order', JSON.stringify({
                    id: orderId,
                    total: paymentTotal,
                    items: paymentCart.length,
                    method: methodDetail
                }));

                CartStore.clearCart();
                successModal.classList.add('active');
            }, 400);
        }
    }, 200);
};
