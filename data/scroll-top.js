(function () {
    const THRESHOLD = 400; // px | Controls the amount of scrolling needed for the button to appear

    const rail = document.createElement('div');
    rail.className = 'scroll-top-rail';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'scroll-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '&uarr;';

    rail.appendChild(btn);
    document.querySelector('main').appendChild(rail);

    const update = () =>
        btn.classList.toggle('is-visible', window.scrollY > THRESHOLD);

    window.addEventListener('scroll', update, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0 }));
    update();
})();