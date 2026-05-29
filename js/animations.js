// js/animations.js

// Scroll Reveal Animation using Intersection Observer
let scrollRevealObserver = null;

const initScrollReveal = () => {
    if (!scrollRevealObserver) {
        scrollRevealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        });
    }

    document.querySelectorAll('.reveal:not(.active), .reveal-left:not(.active), .reveal-right:not(.active)').forEach(el => {
        if (!el.dataset.revealObserved) {
            el.dataset.revealObserved = 'true';
            scrollRevealObserver.observe(el);
        }
    });
};

document.addEventListener('DOMContentLoaded', initScrollReveal);
