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

  // ── NAV ──
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  const isIndexPage = filename === 'index.html' || filename === '';

  const sideNav = document.getElementById('side-nav');
  const bottomNav = document.getElementById('bottom-nav');
  const sideDots = sideNav ? Array.from(sideNav.querySelectorAll('.snav-dot')) : [];
  const btmItems = bottomNav ? Array.from(bottomNav.querySelectorAll('.bnav-item')) : [];

  function setActive(idx, lightDots) {
    sideDots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
      d.classList.toggle('light', !!lightDots);
    });
    btmItems.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  // Same-page anchors scroll smoothly; cross-page hrefs navigate
  function navClick(href) {
    const hashIdx = href.indexOf('#');
    const page = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
    const anchor = hashIdx >= 0 ? href.slice(hashIdx + 1) : null;
    const targetPage = page || 'index.html';
    const currentPage = filename || 'index.html';
    if (targetPage === currentPage) {
      if (anchor) {
        const target = document.getElementById(anchor);
        if (target) { target.scrollIntoView({ behavior: 'smooth' }); return; }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    window.location.href = href;
  }

  sideDots.forEach(dot => dot.addEventListener('click', () => navClick(dot.dataset.href)));
  btmItems.forEach(item => item.addEventListener('click', () => navClick(item.dataset.href)));

  // ── INDEX PAGE: scroll-based active state for hero + about ──
  if (isIndexPage) {
    const heroEl = document.getElementById('hero');
    const aboutEl = document.getElementById('about');

    const navObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        if (e.target.id === 'hero') setActive(0, false);
        else if (e.target.id === 'about') setActive(1, true);
      });
    }, { threshold: 0.4 });

    if (heroEl) navObs.observe(heroEl);
    if (aboutEl) navObs.observe(aboutEl);
  } else {
    // Page-based: match dot whose data-href equals the current filename
    const idx = sideDots.findIndex(d => d.dataset.href === filename);
    setActive(idx, isLightPage);
  }

  // ── REVEAL ──
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));
})();
