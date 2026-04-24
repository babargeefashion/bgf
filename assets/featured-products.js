/* Initialize image swap from data attributes for fallback and touch */
document.querySelectorAll('.image-wrap').forEach(wrap => {
  const img1 = wrap.dataset.img1;
  const img2 = wrap.dataset.img2;
  const front = wrap.querySelector('.product-img.front');
  const back = wrap.querySelector('.product-img.back');

  // set sources if data provided
  if (img1 && front) front.src = img1;
  if (img2 && back) back.src = img2;

  // mobile: tap toggles swap
  let toggled = false;
  wrap.addEventListener('click', (e) => {
    // only for touch small screens we toggle
    if (window.innerWidth <= 780 && front && back) {
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
  [front, back].filter(img => img).forEach(img => {
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