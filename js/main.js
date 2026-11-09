import { initBackground } from './background.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const CFG = window.SITE_CONFIG || {};

/* ---------- DATA ---------- */
const SOCIALS = [
  { name: 'GitHub', url: 'https://github.com/pritambej07', svg: '<svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/pritam-bej-226626449', svg: '<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' },
  { name: 'Fiverr', url: 'https://www.fiverr.com/pritambej07', stroke: true, svg: '<svg viewBox="0 0 24 24"><path d="M4 21V9m0-3.5V5M4 13c0-3 1.4-4 3.5-4H9M12 9v12M12 5.5V5M16 21v-8c0-2.5 1.3-4 3.5-4H21"/></svg>' },
  { name: 'Instagram', url: 'https://www.instagram.com/pritam_dev_01?rpxt=cmtkN2F4ZGp2OGcw', stroke: true, svg: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/></svg>' }
];

const PROJECTS = [
  { id: 'fitness-zone', name: 'Fitness Zone', cat: 'Fitness & Sports E-commerce Platform', img: 'fitness-zone', status: 'Live demo', live: true,
    desc: 'A Django-based fitness and sports e-commerce platform featuring authentication, email verification, workout content, AI Coach, product browsing, favourites, cart, checkout, and demo payment.',
    tags: ['Django', 'E-commerce'],
    features: ['Authentication', 'Email verification', 'Workout content', 'AI Coach', 'Product browsing', 'Favourites', 'Cart', 'Checkout', 'Demo payment'],
    repo: 'https://github.com/pritambej07/fitness-zone', demo: 'https://fitnesszone-g836.onrender.com' },
  { id: 'quiz-mania', name: 'Quiz Mania', cat: 'Competitive Quiz & Ranking Platform', img: 'quiz-mania' },
  { id: 'campusos', name: 'CampusOS', cat: 'Smart College Management Platform', img: 'campusos' },
  { id: 'mediconnect', name: 'MediConnect', cat: 'Smart Healthcare & Appointment Platform', img: 'mediconnect' },
  { id: 'civictrack', name: 'CivicTrack', cat: 'Smart City Complaint Management System', img: 'civictrack' },
  { id: 'disasterlink', name: 'DisasterLink', cat: 'Emergency Response Coordination System', img: 'disasterlink' },
  { id: 'tracechain', name: 'TraceChain', cat: 'Product Authenticity & Supply Chain Tracker', img: 'tracechain' },
  { id: 'homegenie', name: 'HomeGenie', cat: 'Intelligent Smart Home Automation Platform', img: 'homegenie' },
  { id: 'bustrack', name: 'BusTrack', cat: 'Live Bus Tracking & Route Information Platform', img: 'bustrack' },
  { id: 'surprisestudio', name: 'SurpriseStudio', cat: 'Personalized Birthday & Anniversary Video Maker', img: 'surprisestudio' }
];

const SKILLS = [
  { t: 'Programming', i: '<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>', l: ['C', 'Java', 'Python'] },
  { t: 'Frontend', i: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>', l: ['HTML', 'CSS', 'JavaScript'] },
  { t: 'Backend', i: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01"/>', l: ['Django'] },
  { t: 'Database', i: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>', l: ['MySQL', 'SQLite'] },
  { t: 'Tools', i: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.6-.6-.6-2.6z"/>', l: ['VS Code', 'Git', 'GitHub'] }
];

const CERTS = [
  ['Unleashing the Power of AI Agents', '08 August 2025'],
  ['Learn Java', '10 August 2025'],
  ['Applied Data Science with Python', '09 August 2025'],
  ['Web Development Fundamentals', '10 August 2025']
];

/* ---------- RENDER ---------- */
const socialHTML = SOCIALS.map(s => `<li><a class="soc${s.stroke ? ' stroke' : ''}" href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="Pritam Bej on ${s.name} (opens in a new tab)" data-tip="${s.name}">${s.svg}</a></li>`).join('');
$$('[data-socials]').forEach(el => el.innerHTML = socialHTML);

$('#skillsWrap').insertAdjacentHTML('beforeend', SKILLS.map((g, i) => `
  <div class="skill-group rv" style="--d:${i * .08}s"><h3><svg viewBox="0 0 24 24">${g.i}</svg>${g.t}</h3>
  <ul class="pills">${g.l.map(x => `<li>${x}</li>`).join('')}</ul></div>`).join(''));

$('#projGrid').innerHTML = PROJECTS.map((p, i) => `
  <article class="card rv" style="--d:${(i % 3) * .08}s" data-id="${p.id}">
    <div class="cover"><img src="images/projects/${p.img}.webp" alt="Conceptual illustration for the ${p.name} project" width="1920" height="1080" loading="lazy" decoding="async">
      <span class="num">${String(i + 1).padStart(2, '0')}</span><span class="status${p.live ? ' live' : ''}">${p.status || 'Details soon'}</span></div>
    <div class="body"><span class="cat">${p.cat}</span><h3>${p.name}</h3>
      <p>${p.desc || 'Project details, features and links will be added here soon.'}</p>
      ${p.tags ? `<ul class="tags">${p.tags.map(t => `<li>${t}</li>`).join('')}</ul>` : ''}
      <div class="links">
        ${p.demo ? `<a class="btn primary sm" href="${p.demo}" target="_blank" rel="noopener noreferrer">Live demo <svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>` : ''}
        ${p.repo ? `<a class="btn ghost sm" href="${p.repo}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
        <button class="btn ghost sm more" type="button" data-open="${p.id}" aria-label="View details of ${p.name}">Details</button>
      </div></div>
  </article>`).join('');

$('#certGrid').innerHTML = CERTS.map((c, i) => `
  <div class="cert rv" style="--d:${i * .08}s"><div class="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/></svg></div>
  <div><h3>${c[0]}</h3><span class="by">IBM SkillsBuild</span><p class="dt">${c[1]}</p></div></div>`).join('');

$('#mq').innerHTML = Array(2).fill('<span><b>//</b>PRITAM BEJ <b>//</b>SOFTWARE DEVELOPER <b>//</b>BUILDING DIGITAL EXPERIENCES <b>//</b>WEB DEVELOPMENT <b>//</b>CREATIVE TECHNOLOGY</span>'.repeat(3)).join('');
$('#yr').textContent = new Date().getFullYear();

/* ---------- PRELOADER ---------- */
const pl = $('#preloader'), bar = $('#plbar');
let started = false;
function startHero() {
  if (started) return; started = true;
  pl.classList.add('done');
  $('#headline').classList.add('in'); $('#portrait').classList.add('in'); $('#intro').classList.add('in');
  setTimeout(() => { if (!reduce) rotateWords(); }, 2600);
}
let pct = 0; const tick = setInterval(() => { pct = Math.min(100, pct + 9 + Math.random() * 14); bar.style.width = pct + '%'; if (pct >= 100) clearInterval(tick); }, 90);
const heroImg = $('.portrait img');
const imgReady = new Promise(r => { if (heroImg.complete) r(); else { heroImg.onload = heroImg.onerror = r; } });
Promise.all([imgReady, new Promise(r => setTimeout(r, reduce ? 50 : 1100))]).then(() => { bar.style.width = '100%'; setTimeout(startHero, 150); });
setTimeout(startHero, 4500); // safety

/* ---------- HEADLINE ---------- */
function splitChars(el, text, offset = 0) {
  el.innerHTML = [...text].map((c, i) => c === ' ' ? ' ' : `<span class="ch" style="--i:${i + offset}">${c}</span>`).join('');
}
splitChars($('#l1'), 'Building');
splitChars($('#l1b'), 'Digital', 8);
splitChars($('#word'), 'EXPERIENCES.', 15);
$('#word').setAttribute('aria-hidden', 'true');

const WORDS = ['EXPERIENCES.', 'SOLUTIONS.', 'PRODUCTS.', 'IDEAS.'];
const GLYPHS = '#@$%&*+=<>/\\01';
let wi = 0, busy = false;
function scrambleTo(el, target) {
  return new Promise(res => {
    const start = performance.now(), dur = 800, from = el.textContent;
    const len = Math.max(from.length, target.length);
    (function step(now) {
      const p = Math.min(1, (now - start) / dur); let out = '';
      for (let i = 0; i < len; i++) {
        const lock = p * len * 1.25 > i + 2;
        if (lock) out += target[i] || ''; else out += i < target.length ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : '';
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(step); else { el.textContent = target; res(); }
    })(start);
  });
}
function rotateWords() {
  setInterval(async () => {
    if (busy || document.hidden) return; busy = true;
    wi = (wi + 1) % WORDS.length; await scrambleTo($('#word'), WORDS[wi]); busy = false;
  }, 3800);
}

/* intro words */
const it = $('#introText'); it.innerHTML = it.textContent.split(' ').map((w, i) => `<span class="w" style="--i:${i}">${w}</span>`).join(' ');

/* ---------- HEADER / PROGRESS / ACTIVE LINKS ---------- */
const header = $('#top'), prog = $('#progress'), toTop = $('#toTop');
function onScroll() {
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  header.classList.toggle('scrolled', y > 30);
  prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  toTop.classList.toggle('show', y > 700);
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
const links = $$('.nav ul a');
const secObs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main > section').forEach(s => secObs.observe(s));

/* reveal on scroll */
const rvObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rvObs.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
$$('.rv').forEach(el => rvObs.observe(el));

/* cursor glow + card effects */
const glow = $('#glow');
if (matchMedia('(hover:hover)').matches && !reduce) {
  addEventListener('pointermove', e => { glow.style.opacity = 1; glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; }, { passive: true });
  $$('.card').forEach(c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
    });
    c.addEventListener('pointerleave', () => c.style.transform = '');
  });
}
$$('.skill-group').forEach(g => g.addEventListener('pointermove', e => { const r = g.getBoundingClientRect(); g.style.setProperty('--mx', (e.clientX - r.left) + 'px'); g.style.setProperty('--my', (e.clientY - r.top) + 'px'); }));

/* ---------- DIALOG HELPERS (focus trap, Esc) ---------- */
let lastFocus = null, openEl = null;
function openDialog(el, focusSel) {
  lastFocus = document.activeElement; openEl = el; el.classList.add('open'); el.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => (focusSel ? $(focusSel, el) : $('button,a,input', el))?.focus(), 60);
}
function closeDialog(el) {
  el.classList.remove('open'); el.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; openEl = null;
  $('#openMenu').setAttribute('aria-expanded', 'false'); lastFocus?.focus?.();
}
addEventListener('keydown', e => {
  if (e.key === 'Escape' && openEl) closeDialog(openEl);
  if (e.key === 'Tab' && openEl) {
    const f = $$('a[href],button:not([disabled]),input,textarea', openEl).filter(x => x.offsetParent !== null);
    if (!f.length) return; const a = f[0], b = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); b.focus(); }
    else if (!e.shiftKey && document.activeElement === b) { e.preventDefault(); a.focus(); }
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openEl === cmd ? closeDialog(cmd) : (openEl && closeDialog(openEl), openCmd()); }
});

/* drawer */
const drawer = $('#drawer');
$('#openMenu').addEventListener('click', e => { e.currentTarget.setAttribute('aria-expanded', 'true'); openDialog(drawer, '.close'); });
$$('[data-close]', drawer).forEach(b => b.addEventListener('click', () => closeDialog(drawer)));
$$('#drawer nav a').forEach(a => a.addEventListener('click', () => { lastFocus = null; closeDialog(drawer); }));

/* project modal */
const modal = $('#modal'), mBox = $('#mBox');
function openProject(id) {
  const i = PROJECTS.findIndex(p => p.id === id), p = PROJECTS[i];
  mBox.innerHTML = `<button class="close x" data-mclose aria-label="Close details">✕</button>
   <div class="cover"><img src="images/projects/${p.img}.webp" alt="Conceptual illustration for ${p.name}"></div>
   <div class="inner"><span class="eyebrow" style="margin:0">Project ${String(i + 1).padStart(2, '0')} — ${p.cat}</span><h3 id="mTitle">${p.name}</h3>
   <p>${p.desc || 'Detailed description, features and links for this project will be added here soon.'}</p>
   ${p.features ? `<h4>Features</h4><ul class="feat">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>` : ''}
   <p style="font-size:.85rem;color:var(--muted);margin-top:18px">The cover is a conceptual illustration, not a screenshot of the application.</p>
   <div class="links" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
   ${p.demo ? `<a class="btn primary sm" href="${p.demo}" target="_blank" rel="noopener noreferrer">Live demo</a>` : ''}
   ${p.repo ? `<a class="btn ghost sm" href="${p.repo}" target="_blank" rel="noopener noreferrer">View on GitHub</a>` : ''}
   ${!p.demo && !p.repo ? `<a class="btn ghost sm" href="#contact" data-mclose>Ask me about this project</a>` : ''}</div></div>`;
  $$('[data-mclose]', modal).forEach(b => b.addEventListener('click', () => closeDialog(modal)));
  openDialog(modal, '.x');
}
$('#projGrid').addEventListener('click', e => { const b = e.target.closest('[data-open]'); if (b) openProject(b.dataset.open); });
$('.ov[data-mclose]', modal).addEventListener('click', () => closeDialog(modal));

/* command palette */
const cmd = $('#cmd'), cmdIn = $('#cmdIn'), cmdList = $('#cmdList');
const go = id => () => { closeDialog(cmd); lastFocus = null; $(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); };
const ext = u => () => { closeDialog(cmd); open(u, '_blank', 'noopener'); };
const ACTIONS = [
  ['Go to Home', 'section', go('#home')], ['Go to About', 'section', go('#about')], ['Go to Skills', 'section', go('#skills')],
  ['Go to Projects', 'section', go('#projects')], ['Go to Education', 'section', go('#education')], ['Go to Certifications', 'section', go('#certifications')], ['Go to Contact', 'section', go('#contact')],
  ...SOCIALS.map(s => ['Open ' + s.name, 'link', ext(s.url)]),
  ['Copy email address', 'action', () => { copyEmail(); closeDialog(cmd); }],
  ...PROJECTS.map(p => ['Project: ' + p.name, 'project', () => { closeDialog(cmd); openProject(p.id); }])
];
let sel = 0, shown = ACTIONS;
function drawCmd() {
  const q = cmdIn.value.trim().toLowerCase();
  shown = ACTIONS.filter(a => a[0].toLowerCase().includes(q)); sel = 0;
  cmdList.innerHTML = shown.map((a, i) => `<li><button type="button" data-i="${i}" class="${i === 0 ? 'sel' : ''}">${a[0]}<small>${a[1]}</small></button></li>`).join('') || '<li style="padding:14px;color:var(--muted)">No matches</li>';
}
function openCmd() { cmdIn.value = ''; drawCmd(); openDialog(cmd, '#cmdIn'); }
cmdIn.addEventListener('input', drawCmd);
cmdIn.addEventListener('keydown', e => {
  const btns = $$('button', cmdList); if (!btns.length) return;
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); btns[sel].classList.remove('sel'); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + btns.length) % btns.length; btns[sel].classList.add('sel'); btns[sel].scrollIntoView({ block: 'nearest' }); }
  if (e.key === 'Enter') { e.preventDefault(); shown[sel]?.[2](); }
});
cmdList.addEventListener('click', e => { const b = e.target.closest('button'); if (b) shown[+b.dataset.i][2](); });
$('.ov[data-cclose]', cmd).addEventListener('click', () => closeDialog(cmd));

/* copy email */
async function copyEmail() {
  const btn = $('#copyEmail');
  try { await navigator.clipboard.writeText('bpritam2005@gmail.com'); btn.textContent = 'Copied ✓'; }
  catch { btn.textContent = 'bpritam2005@gmail.com'; }
  setTimeout(() => btn.textContent = 'Copy email address', 2000);
}
$('#copyEmail').addEventListener('click', copyEmail);

/* ---------- CONTACT FORM ---------- */
const form = $('#contactForm'), status = $('#formStatus'), sendBtn = $('#sendBtn'), sendLbl = $('#sendLbl');
const openedAt = Date.now();
const rules = {
  cname: v => v.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).',
  cemail: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
  csubject: v => v.trim().length >= 3 ? '' : 'Please add a subject (at least 3 characters).',
  cmsg: v => v.trim().length >= 10 ? '' : 'Your message should be at least 10 characters.'
};
function validate() {
  let ok = true;
  for (const id in rules) {
    const el = document.getElementById(id), msg = rules[id](el.value);
    el.closest('.fld').classList.toggle('err', !!msg); el.setAttribute('aria-invalid', !!msg);
    $(`[data-for="${id}"]`).textContent = msg; if (msg) ok = false;
  }
  return ok;
}
$$('input,textarea', form).forEach(el => el.addEventListener('blur', () => { if (rules[el.id] && el.value) validate(); }));
function show(type, html) { status.className = type; status.innerHTML = html; }
function mailtoLink(d) { return `mailto:bpritam2005@gmail.com?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(d.message + '\n\n— ' + d.name + ' (' + d.email + ')')}`; }
form.addEventListener('submit', async e => {
  e.preventDefault(); status.className = '';
  if (!validate()) { show('bad', 'Please fix the highlighted fields and try again.'); $('.fld.err input,.fld.err textarea', form)?.focus(); return; }
  const data = { name: $('#cname').value.trim(), email: $('#cemail').value.trim(), subject: $('#csubject').value.trim(), message: $('#cmsg').value.trim() };
  if (form.botcheck?.value || Date.now() - openedAt < 3000) { show('bad', 'Submission blocked by spam protection. Please try again in a moment.'); return; }
  const last = +localStorage.getItem('pb_last_send') || 0;
  if (Date.now() - last < 30000) { show('bad', 'Please wait a little before sending another message.'); return; }
  if (!CFG.WEB3FORMS_ACCESS_KEY) {
    show('bad', `The email service isn't connected yet, so your message was <strong>not</strong> sent. You can <a href="${mailtoLink(data)}">send it from your email app</a> instead, or write to bpritam2005@gmail.com.`); return;
  }
  sendBtn.disabled = true; sendBtn.classList.add('loading'); sendLbl.textContent = 'Sending…';
  try {
    const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 15000);
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, signal: ctrl.signal,
      body: JSON.stringify({ access_key: CFG.WEB3FORMS_ACCESS_KEY, ...data, from_name: 'Portfolio Contact Form', botcheck: '' }) });
    clearTimeout(to);
    const j = await res.json().catch(() => ({}));
    if (res.ok && j.success) { show('ok', 'Thank you! Your message was delivered — I\'ll get back to you soon.'); form.reset(); localStorage.setItem('pb_last_send', Date.now()); }
    else show('bad', `Sorry, the message couldn't be sent${j.message ? ' (' + String(j.message).slice(0, 120) + ')' : ''}. Please <a href="${mailtoLink(data)}">email me directly</a>.`);
  } catch { show('bad', `Network problem — your message was not sent. Please <a href="${mailtoLink(data)}">email me directly</a>.`); }
  finally { sendBtn.disabled = false; sendBtn.classList.remove('loading'); sendLbl.textContent = 'Send message'; }
});

/* smooth anchor offset for hash on load */
if (location.hash) setTimeout(() => $(location.hash)?.scrollIntoView(), 1200);

/* ---------- BACKGROUND ---------- */
initBackground($('#bg'), $('#home')).catch(() => {});
