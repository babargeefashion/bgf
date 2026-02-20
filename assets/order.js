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

/* Order Now button handler */
document.querySelectorAll('.product-card').forEach(card => {
    const btn = card.querySelector('.order-btn');
    btn.addEventListener('click', () => {
        const title = card.querySelector('.product-title').innerText.trim();
        const price = card.querySelector('.price').innerText.trim();
        const sku = card.dataset.sku || '';
        const qty = card.querySelector('.qty').value || 1;
        const size = card.querySelector('.size').value || '';

        const msgLines = [
            `Assalamualaikum!`,
            `I want to place an order from ${BRAND_NAME}.`,
            `Product: ${title}`,
            `SKU: ${sku}`,
            `Size: ${size}`,
            `Qty: ${qty}`,
            `Price: ${price}`,
            ``,
            `Please confirm availability, total cost, and delivery time.`,
            `Name:`,
            `Phone:`,
            `Delivery Address:`
        ];
        const finalMsg = msgLines.join('\n');

        openWhatsApp(WHATSAPP_NUMBER, finalMsg);
    });
});

/* Optional: keyboard accessibility for order buttons */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const active = document.activeElement;
        if (active && active.classList.contains('order-btn')) {
            active.click();
        }
    }
});
// Ready To Place Your Order
const form = document.getElementById("orderForm");
const totalPriceDisplay = document.getElementById("totalPrice");
const popup = document.getElementById("thankYouPopup");
const closePopupBtn = document.getElementById("closePopup");

// Price rules
const fabricPrice = { "Cotton": 400, "Silk": 1000, "Chiffon": 500 };
const embroideryPrice = { "Hand": 0, "Machine": 0 };
const stitchingPrice = { "Standard": 1500, "Premium": 2000 };

// Update price dynamically
function updatePrice() {
    const fabric = document.getElementById("fabric").value;
    const embroidery = document.getElementById("embroidery").value;
    const stitching = document.getElementById("stitching").value;

    let total = 0;
    if (fabric) total += fabricPrice[fabric];
    if (embroidery) total += embroideryPrice[embroidery];
    if (stitching) total += stitchingPrice[stitching];

    totalPriceDisplay.innerText = total;
}

// Event listeners for price update
document.getElementById("fabric").addEventListener("change", updatePrice);
document.getElementById("embroidery").addEventListener("change", updatePrice);
document.getElementById("stitching").addEventListener("change", updatePrice);

// Form submit
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
        const res = await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            popup.style.display = "flex";
            form.reset();
            totalPriceDisplay.innerText = "0";
        } else {
            alert("Failed to place order");
        }
    } catch (err) {
        alert("Error: " + err.message);
    }
});

// Close popup
closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
});
