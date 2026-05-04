  // ── CUSTOM CURSOR ──
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; });
  (function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx+'px'; ring.style.top = ry+'px'; requestAnimationFrame(animRing); })();
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width='52px'; ring.style.height='52px'; dot.style.transform='translate(-50%,-50%) scale(1.6)'; });
    el.addEventListener('mouseleave', () => { ring.style.width='36px'; ring.style.height='36px'; dot.style.transform='translate(-50%,-50%) scale(1)'; });
  });

  // ── SCROLL PROGRESS BAR ──
  // ── BACK TO TOP ──
  const backTop = document.getElementById('back-top');

  // ── SCROLLSPY ──
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const navAs = document.querySelectorAll('.nav-links a');

  // ── SCROLL HANDLER ──
  window.addEventListener('scroll', () => {
    const st = window.scrollY;
    // Nav shrink
    document.querySelector('nav').style.padding = st > 60 ? '1rem 5vw' : '1.5rem 5vw';

    // Back to top
    if (st > 400) backTop.classList.add('visible');
    else backTop.classList.remove('visible');

    // Scrollspy
    let current = '';
    sections.forEach(sec => {
      if (st >= sec.offsetTop - 120) current = sec.getAttribute('id');
    });
    navAs.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // ── MOBILE NAV ──
  function toggleMobile() {
    const nav = document.getElementById('mobile-nav');
    const hbg = document.getElementById('hamburger');
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    setTimeout(() => nav.classList.toggle('open', !open), 10);
    hbg.classList.toggle('open', !open);
    document.body.style.overflow = open ? '' : 'hidden';
  }
  function closeMobile() {
    const nav = document.getElementById('mobile-nav');
    nav.classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
    setTimeout(() => { nav.style.display = 'none'; document.body.style.overflow = ''; }, 350);
  }

  // ── PORTFOLIO FILTER ──
  function filterWork(btn, cat) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.portfolio-item').forEach(item => {
      const show = cat === 'all' || item.dataset.cat === cat;
      item.style.opacity = show ? '1' : '0.15';
      item.style.transform = show ? 'scale(1)' : 'scale(0.97)';
      item.style.transition = 'opacity 0.4s, transform 0.4s';
    });
  }

  // ── FORM VALIDATION ──
  function clearErr(input) {
    input.classList.remove('invalid');
    const err = document.getElementById('err-' + input.id);
    if (err) err.classList.remove('show');
  }
  function handleSubmit(e) {
    e.preventDefault();
    let valid = true;
    const fields = [
      { id: 'fname', errId: 'err-fname', check: v => v.trim().length > 0 },
      { id: 'lname', errId: 'err-lname', check: v => v.trim().length > 0 },
      { id: 'email', errId: 'err-email', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    ];
    fields.forEach(f => {
      const el = document.getElementById(f.id);
      const err = document.getElementById(f.errId);
      if (!f.check(el.value)) {
        el.classList.add('invalid'); if (err) err.classList.add('show'); valid = false;
      } else {
        el.classList.remove('invalid'); if (err) err.classList.remove('show');
      }
    });
    if (!valid) return;
    const status = document.getElementById('form-status');
    status.style.display = 'block';
    e.target.querySelector('.form-submit').textContent = 'Sent ✓';
    e.target.querySelector('.form-submit').style.background = 'var(--gold)';
  }

  // ── LIGHTBOX ──
  function openLightbox(src, title, meta) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lb-img').src = src;
    document.getElementById('lb-title').textContent = title;
    document.getElementById('lb-meta').textContent = meta;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(e) {
    if (e && e.target !== document.getElementById('lightbox') && e.type === 'click') return;
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = '';
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { document.getElementById('lightbox').style.display='none'; document.body.style.overflow=''; }
  });

  // ── COOKIE ──
  function acceptCookie() {
    localStorage.setItem('ta_cookie', '1');
    document.getElementById('cookie-bar').style.transform = 'translateY(100%)';
  }
