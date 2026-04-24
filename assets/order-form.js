// Order Form Section JS
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