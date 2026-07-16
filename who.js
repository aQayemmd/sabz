document.addEventListener('DOMContentLoaded', function () {

  /* ========== نمایش تدریجی کارت‌ها هنگام اسکرول ========== */

  var revealItems = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window) || revealItems.length === 0) {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach(function (el, index) {
    el.style.transitionDelay = (index % 4) * 60 + 'ms';
    observer.observe(el);
  });

});