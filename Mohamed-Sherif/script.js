const words = ["MOHAMED SHERIF", "FRONT-END DEVELOPER"];
const HOLD_MS = 3100;
const START_MS = 650;
const maxCharacters = Math.max(...words.map((word) => word.length));
let wordIndex = 0;
let topLayer = 200;

const TECHS = [
  {
    id: "html",
    svg: '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><polygon points="6,5 10,44 25,48 40,44 44,5" fill="#e44d26"/><polygon points="25,8 25,45.5 37.5,42 41,8" fill="#f16529"/><text x="25" y="22" text-anchor="middle" fill="white" font-family="Arial Black,sans-serif" font-size="10" font-weight="900">HTML</text><text x="25" y="38" text-anchor="middle" fill="white" font-family="Arial Black,sans-serif" font-size="17" font-weight="900">5</text></svg>',
  },
  {
    id: "css",
    svg: '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><polygon points="6,5 10,44 25,48 40,44 44,5" fill="#264de4"/><polygon points="25,8 25,45.5 37.5,42 41,8" fill="#2965f1"/><text x="25" y="22" text-anchor="middle" fill="white" font-family="Arial Black,sans-serif" font-size="10" font-weight="900">CSS</text><text x="25" y="38" text-anchor="middle" fill="white" font-family="Arial Black,sans-serif" font-size="17" font-weight="900">3</text></svg>',
  },
  {
    id: "js",
    svg: '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" fill="#f7df1e"/><text x="6" y="43" font-family="Arial Black,sans-serif" font-size="26" font-weight="900" fill="#323330">JS</text></svg>',
  },
  {
    id: "bootstrap",
    svg: '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><rect width="50" height="50" rx="9" fill="#7952b3"/><text x="25" y="39" text-anchor="middle" font-family="Georgia,Times New Roman,serif" font-size="36" font-weight="900" fill="white">B</text></svg>',
  },
  {
    id: "git",
    svg: '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="30" height="30" rx="5" fill="#f05032" transform="rotate(45 25 25)"/><circle cx="25" cy="14" r="3" fill="white"/><circle cx="15" cy="35" r="3" fill="white"/><circle cx="35" cy="35" r="3" fill="white"/><polyline points="25,17 25,28 15,28 15,32" fill="none" stroke="white" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><line x1="25" y1="17" x2="35" y2="28" stroke="white" stroke-width="2.8" stroke-linecap="round"/><line x1="35" y1="28" x2="35" y2="32" stroke="white" stroke-width="2.8" stroke-linecap="round"/></svg>',
  },
  {
    id: "react",
    svg: '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="25" r="4" fill="#61dafb"/><ellipse cx="25" cy="25" rx="20" ry="7.5" fill="none" stroke="#61dafb" stroke-width="2.4"/><ellipse cx="25" cy="25" rx="20" ry="7.5" fill="none" stroke="#61dafb" stroke-width="2.4" transform="rotate(60 25 25)"/><ellipse cx="25" cy="25" rx="20" ry="7.5" fill="none" stroke="#61dafb" stroke-width="2.4" transform="rotate(120 25 25)"/></svg>',
  },
];

// These positions deliberately reserve the entire middle of the screen for the title.
const POSITIONS = [
  { x: 0.075, y: 0.17 },
  { x: 0.875, y: 0.17 },
  { x: 0.045, y: 0.62 },
  { x: 0.91, y: 0.61 },
  { x: 0.19, y: 0.82 },
  { x: 0.75, y: 0.82 },
];

function playPop() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)(),
      now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.14, now + 0.012);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
    master.connect(ctx.destination);
    const tone = ctx.createOscillator(),
      toneGain = ctx.createGain();
    tone.type = "sine";
    tone.frequency.setValueAtTime(330, now);
    tone.frequency.exponentialRampToValueAtTime(760, now + 0.09);
    tone.frequency.exponentialRampToValueAtTime(430, now + 0.25);
    toneGain.gain.setValueAtTime(0.8, now);
    toneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
    tone.connect(toneGain);
    toneGain.connect(master);
    const sparkle = ctx.createOscillator(),
      sparkleGain = ctx.createGain();
    sparkle.type = "triangle";
    sparkle.frequency.setValueAtTime(1040, now + 0.03);
    sparkle.frequency.exponentialRampToValueAtTime(640, now + 0.17);
    sparkleGain.gain.setValueAtTime(0.16, now + 0.03);
    sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    sparkle.connect(sparkleGain);
    sparkleGain.connect(master);
    tone.start(now);
    sparkle.start(now + 0.03);
    tone.stop(now + 0.3);
    sparkle.stop(now + 0.25);
    setTimeout(() => ctx.close(), 700);
  } catch (e) {}
}

function makeElasticDraggable(element) {
  let active = false,
    startX = 0,
    startY = 0,
    baseX = 0,
    baseY = 0,
    lastX = 0,
    lastY = 0,
    lastTime = 0,
    velocityX = 0,
    velocityY = 0,
    flightId = 0;
  element.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    cancelAnimationFrame(flightId);
    element.classList.remove("is-flying", "releasing");
    active = true;
    startX = lastX = event.clientX;
    startY = lastY = event.clientY;
    lastTime = performance.now();
    velocityX = velocityY = 0;
    baseX = parseFloat(element.style.left) || 0;
    baseY = parseFloat(element.style.top) || 0;
    element.setPointerCapture(event.pointerId);
    element.classList.add("is-dragging");
    element.style.zIndex = ++topLayer;
  });
  element.addEventListener("pointermove", (event) => {
    if (!active) return;
    const now = performance.now(),
      dt = Math.max(8, now - lastTime),
      dx = event.clientX - startX,
      dy = event.clientY - startY;
    velocityX = ((event.clientX - lastX) / dt) * 16;
    velocityY = ((event.clientY - lastY) / dt) * 16;
    lastX = event.clientX;
    lastY = event.clientY;
    lastTime = now;
    element.style.left = `${baseX + dx}px`;
    element.style.top = `${baseY + dy}px`;
    element.style.setProperty(
      "--drag-rotation",
      `${Math.max(-10, Math.min(10, dx * 0.09))}deg`,
    );
  });
  const launch = () => {
    let x = parseFloat(element.style.left) || 0,
      y = parseFloat(element.style.top) || 0,
      vx = Math.max(-16, Math.min(16, velocityX)),
      vy = Math.max(-16, Math.min(16, velocityY));
    const hits = new Set();
    if (Math.hypot(vx, vy) < 2) {
      vx = (Math.random() > 0.5 ? 1 : -1) * (8 + Math.random() * 3);
      vy = (Math.random() > 0.5 ? 1 : -1) * (6 + Math.random() * 3);
    }
    element.classList.add("is-flying");
    const step = () => {
      const size = element.offsetWidth,
        maxX = window.innerWidth - size,
        maxY = window.innerHeight - size;
      x += vx;
      y += vy;
      let side = "";
      if (x <= 0) {
        x = 0;
        vx = Math.abs(vx);
        side = "left";
      } else if (x >= maxX) {
        x = maxX;
        vx = -Math.abs(vx);
        side = "right";
      }
      if (y <= 0) {
        y = 0;
        vy = Math.abs(vy);
        side = "top";
      } else if (y >= maxY) {
        y = maxY;
        vy = -Math.abs(vy);
        side = "bottom";
      }
      if (side) {
        hits.add(side);
        element.classList.remove("impact");
        void element.offsetWidth;
        element.classList.add("impact");
        setTimeout(() => element.classList.remove("impact"), 240);
      }
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      vx *= 0.996;
      vy *= 0.996;
      if (hits.size < 4 && Math.hypot(vx, vy) > 1.2) {
        flightId = requestAnimationFrame(step);
      } else {
        element.classList.remove("is-flying");
      }
    };
    flightId = requestAnimationFrame(step);
  };
  const release = (event) => {
    if (!active) return;
    active = false;
    element.classList.remove("is-dragging");
    element.classList.add("releasing");
    setTimeout(() => element.classList.remove("releasing"), 720);
    if (element.hasPointerCapture(event.pointerId))
      element.releasePointerCapture(event.pointerId);
    launch();
  };
  element.addEventListener("pointerup", release);
  element.addEventListener("pointercancel", release);
}

function showBubbles() {
  const layer = document.getElementById("bubbles-layer");
  TECHS.forEach((tech, index) => {
    const wrap = document.createElement("div"),
      float = document.createElement("div"),
      icon = document.createElement("div"),
      shell = document.createElement("div"),
      position = POSITIONS[index];
    wrap.className = "bubble-wrap";
    float.className = "bubble-float";
    icon.className = "bubble-icon";
    shell.className = "bubble-shell";
    float.style.setProperty("--idle-duration", `${5.2 + Math.random() * 2.8}s`);
    float.style.animationDelay = `-${(Math.random() * 4).toFixed(2)}s`;
    icon.innerHTML = tech.svg;
    float.append(icon, shell);
    wrap.append(float);
    wrap.style.left = `${position.x * window.innerWidth}px`;
    wrap.style.top = `${position.y * window.innerHeight}px`;
    wrap.style.animationDelay = `${index * 0.1}s`;
    layer.append(wrap);
    makeElasticDraggable(wrap);
    wrap.addEventListener("dblclick", (event) => {
      if (wrap.dataset.popped) return;
      wrap.dataset.popped = "1";
      event.preventDefault();
      playPop();
      shell.style.animation = "shellBurst .28s ease-out forwards";
      setTimeout(() => wrap.classList.add("popped"), 280);
    });
  });
}

const typed = document.getElementById("typed");
const glyphs = Array.from({ length: maxCharacters }, (_, index) => {
  const glyph = document.createElement("span");
  glyph.className = "glyph empty";
  glyph.dataset.index = index;
  typed.append(glyph);
  makeLetterDraggable(glyph);
  return glyph;
});

function makeLetterDraggable(glyph) {
  let active = false,
    startX = 0,
    startY = 0;
  glyph.addEventListener("pointerdown", (event) => {
    if (
      glyph.classList.contains("empty") ||
      (event.button !== undefined && event.button !== 0)
    )
      return;
    active = true;
    startX = event.clientX;
    startY = event.clientY;
    glyph.setPointerCapture(event.pointerId);
    glyph.classList.remove("releasing");
    glyph.classList.add("is-dragging");
    event.stopPropagation();
  });
  glyph.addEventListener("pointermove", (event) => {
    if (!active) return;
    const dx = event.clientX - startX,
      dy = event.clientY - startY;
    glyph.style.transform = `translate(${dx}px,${dy}px) rotate(${dx * 0.08}deg)`;
  });
  const release = (event) => {
    if (!active) return;
    active = false;
    glyph.classList.remove("is-dragging");
    glyph.classList.add("releasing");
    glyph.style.transform = "";
    setTimeout(() => glyph.classList.remove("releasing"), 650);
    if (glyph.hasPointerCapture(event.pointerId))
      glyph.releasePointerCapture(event.pointerId);
  };
  glyph.addEventListener("pointerup", release);
  glyph.addEventListener("pointercancel", release);
}

function setGlyph(glyph, character, index, initial = false) {
  glyph.classList.remove("ghost", "morph", "empty", "space");
  if (character === undefined) {
    if (glyph.textContent) {
      glyph.classList.add("ghost");
      setTimeout(
        () => {
          glyph.textContent = "";
          glyph.classList.remove("ghost");
          glyph.classList.add("empty");
        },
        260 + index * 24,
      );
    } else glyph.classList.add("empty");
    return;
  }
  glyph.textContent = character;
  glyph.classList.toggle("space", character === " ");
  if (!initial) {
    void glyph.offsetWidth;
    glyph.classList.add("morph");
    setTimeout(() => glyph.classList.remove("morph"), 640);
  }
}

function morphTo(word, initial = false) {
  glyphs.forEach((glyph, index) =>
    setTimeout(
      () => setGlyph(glyph, word[index], index, initial),
      initial ? index * 38 : index * 42,
    ),
  );
}
function cycleWords() {
  setTimeout(() => {
    wordIndex = (wordIndex + 1) % words.length;
    morphTo(words[wordIndex]);
    setTimeout(cycleWords, HOLD_MS + maxCharacters * 42);
  }, HOLD_MS);
}

morphTo(words[0], true);
setTimeout(showBubbles, START_MS);
setTimeout(cycleWords, START_MS + HOLD_MS);
