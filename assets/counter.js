//    PREMIUM COUNTER JS
// ===============================
const counters = document.querySelectorAll('.custom-counter-circle');
const speed = 200;

const startCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  const number = counter.querySelector('.custom-counter-number');

  let count = 0;
  const increment = target / speed;

  const updateCount = () => {
    if (count < target) {
      count += increment;
      number.innerText = Math.ceil(count);
      setTimeout(updateCount, 20);
    } else {
      number.innerText = target;
    }
  };

  updateCount();
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => {
  observer.observe(counter);
});