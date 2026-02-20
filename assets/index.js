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

/* Save as featured-products.js and include before </body> */
// ===============================
//    PREMIUM COUNTER JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const counters = document.querySelectorAll(".counter-number");
  let started = false;

  function startCounting() {
    if (started) return;
    started = true;

    counters.forEach(counter => {
      let target = parseInt(counter.getAttribute("data-target"));
      let duration = 1800; // speed
      let start = 0;
      let stepTime = Math.max(Math.floor(duration / target), 15);

      const timer = setInterval(() => {
        start += Math.ceil(target / (duration / stepTime));

        if (start >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = start;
        }
      }, stepTime);
    });
  }

  // Trigger when section visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting();
      }
    });
  }, { threshold: 0.4 });

  const section = document.querySelector(".counter-wrapper");
  if (section) {
    observer.observe(section);
  }
});

/* --- CONFIG --- */
const WHATSAPP_NUMBER = "+923153446770"; // your WhatsApp number (use international format)
const BRAND_NAME = "Babar Jee Fashion";
const SHOP_EMAIL = "babargeefashion@gmail.com";

/* Helper: url-encode message and open WhatsApp */
function openWhatsApp(phone, text) {
  const base = "https://wa.me/" + phone.replace(/\D/g, '') + "?text=" + encodeURIComponent(text);
  window.open(base, "_blank");
}

/* Initialize image swap from data attributes for fallback and touch */
document.querySelectorAll('.image-wrap').forEach(wrap => {
  const img1 = wrap.dataset.img1;
  const img2 = wrap.dataset.img2;
  const front = wrap.querySelector('.product-img.front');
  const back = wrap.querySelector('.product-img.back');

  // set sources if data provided
  if (img1) front.src = img1;
  if (img2) back.src = img2;

  // mobile: tap toggles swap
  let toggled = false;
  wrap.addEventListener('click', (e) => {
    // only for touch small screens we toggle
    if (window.innerWidth <= 780) {
      toggled = !toggled;
      if (toggled) {
        front.style.opacity = 0;
        back.style.opacity = 1;
      } else {
        front.style.opacity = 1;
        back.style.opacity = 0;
      }
    }
  });

  // prevent image dragging
  [front, back].forEach(img => {
    img.addEventListener('dragstart', e => e.preventDefault());
  });

  // small parallax tilt on mousemove
  wrap.addEventListener('mousemove', (ev) => {
    const r = wrap.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (ev.clientX - cx) / r.width; // -0.5 .. 0.5
    const dy = (ev.clientY - cy) / r.height;
    const rotY = dx * 10; // degrees
    const rotX = -dy * 8;
    wrap.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  wrap.addEventListener('mouseleave', () => {
    wrap.style.transform = '';
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
// Place Order Section Js
/* CONFIG */
// Reuse WHATSAPP_NUMBER and SHOP_EMAIL declared earlier in the file

/* WhatsApp Function */
function goToWhatsApp(msg) {
  const url = "https://wa.me/" + WHATSAPP_NUMBER.replace(/\D/g, '') + "?text=" + encodeURIComponent(msg);
  window.open(url, "_blank");
}

/* Email */
function goToEmail() {
  // use the SHOP_EMAIL constant defined in the top-level config
  window.location.href = "mailto:" + SHOP_EMAIL;
}

/* Order */
document.querySelector(".cta-order").addEventListener("click", () => {
  const msg =
    "Assalamualaikum! I want to place an order from Babar Jee Fashion.\nPlease share the details.";
  goToWhatsApp(msg);
});

/* Shop */
document.querySelector(".cta-shop").addEventListener("click", () => {
  window.location.href = "shop.html";  // apna shop page link
});

/* Contact popup */
const popup = document.querySelector(".cta-popup");
const contactBtn = document.querySelector(".cta-contact");
const closePopup = document.querySelector(".close-popup");

contactBtn.addEventListener("click", () => popup.style.display = "flex");
closePopup.addEventListener("click", () => popup.style.display = "none");

document.querySelector(".popup-whatsapp").addEventListener("click", () => {
  const msg = "Assalamualaikum! I want to contact Babar Jee Fashion.";
  goToWhatsApp(msg);
});

document.querySelector(".popup-email").addEventListener("click", () => {
  goToEmail();
});

