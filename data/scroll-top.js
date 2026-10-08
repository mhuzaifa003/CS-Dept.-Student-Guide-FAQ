(function () {
  const THRESHOLD = 400; // px | Controls the amount of scrolling needed for the button to appear

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = '&uarr;';
  document.body.appendChild(btn);

  const footer = document.querySelector('.site-footer');

  function update() {
    btn.classList.toggle('is-visible', window.scrollY > THRESHOLD);

    // Lifts the button based on the amount of visible footer in the view-port
    const lift = footer
      ? Math.max(0, window.innerHeight - footer.getBoundingClientRect().top)
      : 0;
    btn.style.setProperty('--lift', lift + 'px');
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  btn.addEventListener('click', () => window.scrollTo({ top: 0 }));
  update();
})();