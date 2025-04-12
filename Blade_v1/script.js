document.addEventListener("DOMContentLoaded", () => {
  const blades = document.querySelectorAll(".blade");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  let currentIndex = 0;

  function scrollToBlade(index) {
    if (index < 0) index = blades.length - 1;
    if (index >= blades.length) index = 0;
    blades[index].scrollIntoView({ behavior: "smooth", block: "start" });
    currentIndex = index;
  }

  prevBtn.addEventListener("click", () => scrollToBlade(currentIndex - 1));
  nextBtn.addEventListener("click", () => scrollToBlade(currentIndex + 1));

  // Auto-hide arrows after inactivity
  let arrowTimeout;
  function showArrows() {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    clearTimeout(arrowTimeout);
    arrowTimeout = setTimeout(() => {
      prevBtn.classList.add("hidden");
      nextBtn.classList.add("hidden");
    }, 3000);
  }

  document.addEventListener("mousemove", showArrows);
  document.addEventListener("keydown", showArrows);
  showArrows(); // show on load

  // Sidebar menu toggle
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Reveal animation per blade
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const texts = entry.target.querySelectorAll('.text-reveal');
      if (entry.isIntersecting) {
        texts.forEach((el, i) => {
          el.classList.remove("animate");
          void el.offsetWidth;
          el.style.animationDelay = `${i * 0.2}s`;
          el.classList.add("animate");
        });
      } else {
        texts.forEach(el => {
          el.classList.remove("animate");
          el.style.animationDelay = "0s";
        });
      }
    });
  }, {
    root: null,
    threshold: 0.6
  });

  blades.forEach(blade => observer.observe(blade));
});
