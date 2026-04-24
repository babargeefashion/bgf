// ===============================

// ===============================
document.addEventListener('DOMContentLoaded', () => {
    const serviceButtons = document.querySelectorAll('.service-btn');

    serviceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceTitle = btn.closest('.service-item')?.querySelector('h3')?.innerText || "service";
            const msg = `Assalamualaikum! I want to inquire about "${serviceTitle}" from Babar Jee Fashion. Please share details (MOQ, price, delivery time).`;
            const WHATSAPP_NUMBER = "+923153446770";
            const url = "https://wa.me/" + WHATSAPP_NUMBER.replace(/\D/g, '') + "?text=" + encodeURIComponent(msg);
            window.open(url, "_blank");
        });
    });
});
// ===============================
// FADE-UP ANIMATION ON SCROLL
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.process-step');

    const appearOptions = {
        threshold: 0.2
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => appearOnScroll.observe(el));
});

// Fade-up animation for bulk section
document.addEventListener('DOMContentLoaded', () => {
    const bulkSection = document.querySelector('.bulk-orders-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bulkSection.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    observer.observe(bulkSection);
});
