// js/faq.js

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const content = faq.querySelector('.faq-content');
                content.style.maxHeight = null;
            });

            // Open clicked item if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.faq-content');
                // Calculate and set the correct max-height based on content scrollHeight
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});
