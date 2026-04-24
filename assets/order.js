// ===============================

// ===============================
document.addEventListener('DOMContentLoaded', () => {
    const serviceButtons = document.querySelectorAll('.service-btn');

    serviceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceTitle = btn.closest('.service-item')?.querySelector('h3')?.innerText || "service";
            const msg = `Assalamualaikum! I want to inquire about "${serviceTitle}" from Babar Jee Fashion. Please share details (MOQ, price, delivery time).`;
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

        openWhatsApp(finalMsg);
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
