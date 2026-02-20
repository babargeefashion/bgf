// ===============================
// CONFIG
// ===============================
const WHATSAPP_NUMBER = "+923153446770"; // International format
const SHOP_EMAIL = "babargeefashion@gmail.com";
const BRAND_NAME = "Babar Jee Fashion";

// Helper: Open WhatsApp with pre-filled message
function goToWhatsApp(msg) {
    const url = "https://wa.me/" + WHATSAPP_NUMBER.replace(/\D/g, '') + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
}

// Helper: Open Email
function goToEmail() {
    window.location.href = "mailto:" + SHOP_EMAIL;
}

// ===============================
// DOMContentLoaded
// ===============================
document.addEventListener('DOMContentLoaded', function () {

    // ===============================
    // HEADER SCROLL EFFECT
    // ===============================
    const header = document.querySelector('.top-bar');
    const announcement = document.querySelector('.announcement-bar');

    function handleHeaderScroll() {
        const scrollThreshold = 500;
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
            if (announcement) announcement.classList.add('hidden');
        } else {
            header.classList.remove('scrolled');
            if (announcement) announcement.classList.remove('hidden');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // on page load

    // ===============================
    // HAMBURGER MENU
    // ===============================
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const closeBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu-slider');

    if (hamburgerBtn && closeBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', function () {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        const menuLinks = document.querySelectorAll('.slider-links a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // ===============================
    // HERO SLIDER
    // ===============================
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, slideInterval);
    }

    // ===============================
    // CONTACT POPUP
    // ===============================
    const popup = document.querySelector(".cta-popup");
    const contactBtn = document.querySelector(".cta-contact");
    const closePopup = document.querySelector(".close-popup");

    if (contactBtn && popup && closePopup) {
        contactBtn.addEventListener("click", () => popup.style.display = "flex");
        closePopup.addEventListener("click", () => popup.style.display = "none");
    }

    const popupWhatsApp = document.querySelector(".popup-whatsapp");
    if (popupWhatsApp) {
        popupWhatsApp.addEventListener("click", () => {
            const msg = `Assalamualaikum! I want to contact ${BRAND_NAME}.`;
            goToWhatsApp(msg);
        });
    }

    const popupEmail = document.querySelector(".popup-email");
    if (popupEmail) {
        popupEmail.addEventListener("click", () => goToEmail());
    }

    // ===============================
    // PLACE ORDER BUTTONS (All Services)
    // ===============================
    const orderButtons = document.querySelectorAll(".cta-order");

    orderButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Get service title from parent card
            const serviceTitle = btn.closest('.service-item')?.querySelector('h3')?.innerText || "service";
            const msg = `Assalamualaikum! I want to place an order for "${serviceTitle}" from ${BRAND_NAME}. Please share the details (MOQ, price, delivery time).`;
            goToWhatsApp(msg);
        });
    });

    // ===============================
    // CTA SHOP BUTTON
    // ===============================
    const shopBtn = document.querySelector(".cta-shop");
    if (shopBtn) {
        shopBtn.addEventListener("click", () => window.location.href = "shop.html");
    }

});
// ===============================
// SERVICE CARD BUTTONS - INQUIRE NOW
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
