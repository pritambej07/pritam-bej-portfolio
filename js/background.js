/* Cinematic particle + energy-line background.
   Uses Three.js (loaded from CDN on demand) with automatic fallback to a
   lightweight 2D canvas, and a static frame for reduced-motion users. */
const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

function tier() {
  const small = innerWidth < 768;
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  if (small) return { name: 'low', particles: 1400, lines: 36, dpr: 1 };
  if (cores <= 4 || mem <= 4) return { name: 'medium', particles: 3500, lines: 80, dpr: Math.min(devicePixelRatio, 1.5) };
  return { name: 'high', particles: 6500, lines: 140, dpr: Math.min(devicePixelRatio, 2) };
}

export async function initBackground(canvas, hero) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t = tier();
  let visible = true, running = true, raf = 0, disposeFn = () => {};
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', e => { mouse.tx = (e.clientX / innerWidth - .5) * 2; mouse.ty = (e.clientY / innerHeight - .5) * 2; }, { passive: true });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 }).observe(hero);
  document.addEventListener('visibilitychange', () => { running = !document.hidden; });

  let ok = false;
  try {
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (gl) { const THREE = await import(THREE_URL); ok = start3D(THREE); }
  } catch (e) { ok = false; }
  if (!ok) start2D();
  addEventListener('pagehide', () => { cancelAnimationFrame(raf); disposeFn(); });

  function start3D(THREE) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(t.dpr);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.035);
    const camera = new THREE.PerspectiveCamera(65, 1, .1, 200);
    camera.position.z = 5;
    const DEPTH = 90;
    // soft round sprite
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.35, 'rgba(255,255,255,.5)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(c);

    const n = t.particles, pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
    const pal = [new THREE.Color('#ffffff'), new THREE.Color('#b9b9b2'), new THREE.Color('#7d7d78'), new THREE.Color('#e8e8e2'), new THREE.Color('#CCFF00')];
    for (let i = 0; i < n; i++) {
      const r = 3 + Math.random() * 38, a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = Math.sin(a) * r * .65; pos[i * 3 + 2] = -Math.random() * DEPTH + 10;
      const k = Math.random() < .06 ? pal[4] : pal[(Math.random() * 4) | 0];
      col.set([k.r, k.g, k.b], i * 3);
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pg.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const pm = new THREE.PointsMaterial({ size: .16, map: sprite, vertexColors: true, transparent: true, opacity: .85, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
    const points = new THREE.Points(pg, pm); scene.add(points);

    // energy lines (streaks along z)
    const L = t.lines, lp = new Float32Array(L * 6), lc = new Float32Array(L * 6), meta = [];
    for (let i = 0; i < L; i++) {
      const r = 4 + Math.random() * 30, a = Math.random() * Math.PI * 2;
      const x = Math.cos(a) * r, y = Math.sin(a) * r * .6, z = -Math.random() * DEPTH + 10, len = 2 + Math.random() * 7;
      meta.push({ x, y, z, len, sp: .12 + Math.random() * .3 });
      const k = Math.random() < .2 ? pal[4] : pal[(Math.random() * 2) | 0];
      lc.set([k.r, k.g, k.b, 0, 0, 0], i * 6);
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.BufferAttribute(lp, 3));
    lg.setAttribute('color', new THREE.BufferAttribute(lc, 3));
    const lm = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: .75, blending: THREE.AdditiveBlending, depthWrite: false });
    const lines = new THREE.LineSegments(lg, lm); scene.add(lines);

    function resize() {
      const w = hero.clientWidth, h = hero.clientHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    resize(); addEventListener('resize', resize);

    function frame() {
      const P = pg.attributes.position.array;
      for (let i = 0; i < n; i++) { P[i * 3 + 2] += .035; if (P[i * 3 + 2] > 8) P[i * 3 + 2] -= DEPTH; }
      pg.attributes.position.needsUpdate = true;
      for (let i = 0; i < L; i++) {
        const m = meta[i]; m.z += m.sp; if (m.z > 8) m.z -= DEPTH;
        lp.set([m.x, m.y, m.z, m.x, m.y, m.z - m.len], i * 6);
      }
      lg.attributes.position.needsUpdate = true;
      mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
      camera.position.x = mouse.x * 1.2; camera.position.y = -mouse.y * .8; camera.lookAt(0, 0, -20);
      renderer.render(scene, camera);
    }
    const loop = () => { raf = requestAnimationFrame(loop); if (visible && running) frame(); };
    if (reduce) frame(); else loop();
    disposeFn = () => { removeEventListener('resize', resize); pg.dispose(); lg.dispose(); pm.dispose(); lm.dispose(); sprite.dispose(); renderer.dispose(); };
    return true;
  }

  function start2D() {
    const ctx = canvas.getContext('2d'); let w, h, dpr = Math.min(devicePixelRatio, 1.5);
    const N = Math.round(t.particles / 8), stars = [];
    function resize() { w = hero.clientWidth; h = hero.clientHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    resize(); addEventListener('resize', resize);
    for (let i = 0; i < N; i++) stars.push({ x: (Math.random() - .5) * 2, y: (Math.random() - .5) * 2, z: Math.random(), c: Math.random() < .08 ? '#CCFF00' : (Math.random() < .5 ? '#ffffff' : '#9a9a94') });
    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        if (!reduce) { s.z -= .0035; if (s.z <= .02) { s.z = 1; s.x = (Math.random() - .5) * 2; s.y = (Math.random() - .5) * 2; } }
        const k = 1 / s.z, x = w / 2 + s.x * k * w * .12 + mouse.x * 14 * (1 - s.z), y = h / 2 + s.y * k * h * .12 + mouse.y * 10 * (1 - s.z);
        const r = Math.max(.4, (1 - s.z) * 2.2); ctx.globalAlpha = Math.min(1, (1 - s.z) * 1.3); ctx.fillStyle = s.c;
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    const loop = () => { raf = requestAnimationFrame(loop); mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05; if (visible && running) frame(); };
    if (reduce) frame(); else loop();
    disposeFn = () => removeEventListener('resize', resize);
  }
}
