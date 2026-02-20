// Optional: Add small animation like floating gears
// Currently gears rotate via CSS. JS can add extra hover effect if needed.
const gears = document.querySelectorAll('.gear');

gears.forEach(gear => {
    gear.addEventListener('mouseenter', () => {
        gear.style.transform += ' scale(1.1)';
    });
    gear.addEventListener('mouseleave', () => {
        gear.style.transform = gear.style.transform.replace(' scale(1.1)', '');
    });
});
