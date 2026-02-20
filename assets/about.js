// Home Page Js
document.addEventListener('DOMContentLoaded', function () {
    const topBar = document.querySelector('.top-bar');

    // Hamburger Menu Elements
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const closeBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu-slider');

    // Function to handle the header scroll effect
    function handleHeaderScroll() {
        // Elements ko select karte hain
        const header = document.querySelector('.top-bar');
        const announcement = document.querySelector('.announcement-bar');

        // Scroll ki condition: 500px ya aadhe page se zyada scroll hone par (example ke liye 500px use kiya)
        const scrollThreshold = 500;

        if (window.scrollY > scrollThreshold) {
            // 1. Header ko solid aur top par shift karo
            header.classList.add('scrolled');

            // 2. Announcement Bar ko chhipao
            if (announcement) {
                announcement.classList.add('hidden');
            }
        } else {
            // 1. Header ko wapas transparent aur neeche shift karo
            header.classList.remove('scrolled');

            // 2. Announcement Bar ko wapas dikhao
            if (announcement) {
                announcement.classList.remove('hidden');
            }
        }
    }

    // Event Listeners:
    // Scroll hone par function call ho
    window.addEventListener('scroll', handleHeaderScroll);

    // Page load hone par bhi function call ho (taake agar page beech mein reload ho toh header theek dikhe)
    document.addEventListener('DOMContentLoaded', handleHeaderScroll);

    // --- 2. Hamburger Menu Functionality (Fix for not opening/closing) ---

    // Hamburger click hone par menu ko kholo
    hamburgerBtn.addEventListener('click', function () {
        mobileMenu.classList.add('active');
        // Body par overflow hidden lagao taki peeche ka content scroll na ho
        document.body.style.overflow = 'hidden';
    });

    // Close button click hone par menu ko band karo
    closeBtn.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto'; // Scroll wapis chalu karo
    });

    // Menu ke links par click hone par bhi menu band karo
    const menuLinks = document.querySelectorAll('.slider-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
});

// About Page Js
// =======================================================
// FIX: ADD SAFETY CHECK FOR SLIDER ELEMENTS
// The slider code only runs if the 'slides' container is found.
// =======================================================
const slides = document.querySelectorAll('.slide');

if (slides.length > 0) { // CHECK 1: If we are on a page with slides
    const slideInterval = 5000;
    let currentSlide = 0;

    function nextSlide() {
        // 1. Remove 'active' from the current slide
        slides[currentSlide].classList.remove('active');

        // 2. Calculate the next slide index
        currentSlide = (currentSlide + 1) % slides.length;

        // 3. Add 'active' to the new slide
        slides[currentSlide].classList.add('active');
    }

    // Start the auto-slider
    setInterval(nextSlide, slideInterval);
}
// =======================================================
// Simple fade animation on scroll (Keep this as is)
// ... (rest of IntersectionObserver setup) ...
faders.forEach(el => {
    appearOnScroll.observe(el);
});
// ... (other scroll animation logic) ...




// Simple fade animation on scroll
// 'faders' already declared above, so no need to redeclare

const options = {
    threshold: 0.2
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
    });
}, options);

faders.forEach(el => {
    appearOnScroll.observe(el);
});
// Fade animation for Journey steps
const journeyItems = document.querySelectorAll('.journey-item');

journeyItems.forEach((item) => {
    appearOnScroll.observe(item);
});
document.querySelectorAll('.team-card').forEach(item => {
    appearOnScroll.observe(item);
});

// Team Section Js
const teamCards = document.querySelectorAll('.team-card');

function fadeInOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    teamCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerBottom) {
            card.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// ===============================
// FADE-UP ANIMATION ON SCROLL
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.feature-card');

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

