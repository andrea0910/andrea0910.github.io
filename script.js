(function () {
  // ── CURSOR ──
  const dotEl = document.getElementById('cur-dot-el');
  const ringEl = document.getElementById('cur-ring-el');
  if (dotEl && ringEl) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dotEl.style.left = mx + 'px'; dotEl.style.top = my + 'px';
    });
    (function anim() {
      rx += (mx - rx) * .1; ry += (my - ry) * .1;
      ringEl.style.left = rx + 'px'; ringEl.style.top = ry + 'px';
      requestAnimationFrame(anim);
    })();
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        dotEl.querySelector('.cur-dot').style.transform = 'translate(-50%,-50%) scale(0)';
        ringEl.querySelector('.cur-ring').style.transform = 'translate(-50%,-50%) scale(1.7)';
        ringEl.querySelector('.cur-ring').style.borderColor = 'rgba(232,197,71,.65)';
      });
      el.addEventListener('mouseleave', () => {
        dotEl.querySelector('.cur-dot').style.transform = 'translate(-50%,-50%) scale(1)';
        ringEl.querySelector('.cur-ring').style.transform = 'translate(-50%,-50%) scale(1)';
        ringEl.querySelector('.cur-ring').style.borderColor = 'rgba(255,255,255,.35)';
      });
    });
  }

  // ── TOP NAV ──
  const topnav = document.getElementById('topnav');
  const isLightPage = document.body.classList.contains('page-light');
  if (topnav) {
    if (isLightPage) topnav.classList.add('scrolled');
    window.addEventListener('scroll', () => {
      if (isLightPage) topnav.classList.add('scrolled');
      else topnav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ── NAV ACTIVE STATE ──
  const pageOrder = ['index.html', 'about.html', 'projects.html', 'experience.html', 'personal.html', 'essays.html', 'connect.html'];
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  const currentIdx = pageOrder.indexOf(filename) >= 0 ? pageOrder.indexOf(filename) : 0;

  const sideNav = document.getElementById('side-nav');
  const bottomNav = document.getElementById('bottom-nav');

  if (sideNav) {
    sideNav.querySelectorAll('.snav-dot').forEach((dot, i) => {
      if (i === currentIdx) dot.classList.add('active');
      if (isLightPage) dot.classList.add('light');
      dot.addEventListener('click', () => { window.location.href = dot.dataset.href; });
    });
  }

  if (bottomNav) {
    bottomNav.querySelectorAll('.bnav-item').forEach((item, i) => {
      if (i === currentIdx) item.classList.add('active');
      item.addEventListener('click', () => { window.location.href = item.dataset.href; });
    });
  }

  // ── REVEAL ──
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));
})();
