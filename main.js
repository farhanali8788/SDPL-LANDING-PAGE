// ── CURSOR ──
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
document.addEventListener("mousemove", (e) => {
  cur.style.left = e.clientX + "px";
  cur.style.top = e.clientY + "px";
  ring.style.left = e.clientX + "px";
  ring.style.top = e.clientY + "px";
});
document.querySelectorAll("a,button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    ring.style.width = "56px";
    ring.style.height = "56px";
    ring.style.borderColor = "rgba(226,192,106,0.8)";
  });
  el.addEventListener("mouseleave", () => {
    ring.style.width = "36px";
    ring.style.height = "36px";
    ring.style.borderColor = "rgba(226,192,106,0.5)";
  });
});

// ── NAV SCROLL ──
window.addEventListener("scroll", () => {
  document
    .getElementById("mainNav")
    .classList.toggle("scrolled", window.scrollY > 50);
});

// ── TICKER ──
const tickerItems = [
  "Grand Gateway",
  "Swimming Pool",
  "Box Cricket",
  "Yoga Space",
  "Eco Gym",
  "Kidtopia",
  "Celebration Hall",
  "Serenity Garden",
  "Wonder Park",
  "Badminton Court",
  "Golden Years Park",
  "Mandir Complex",
  "Maze Garden",
  "Club House",
  "Indoor Games",
  "Gateway Oasis",
];
const tEl = document.getElementById("ticker");
const doubled = [...tickerItems, ...tickerItems];
doubled.forEach((t) => {
  const d = document.createElement("div");
  d.className = "ticker-item";
  d.textContent = t;
  tEl.appendChild(d);
});

// ── MARQUEES ──
const words = [
  "Suvarnabhumi",
  "Villas",
  "Bungalows",
  "Amravati Road",
  "Nagpur",
  "Luxury Living",
  "SDPL",
  "MahaRERA Approved",
  "297 Plots",
];
["mq1", "mq2"].forEach((id) => {
  const el = document.getElementById(id);
  [...words, ...words, ...words].forEach((w) => {
    const s = document.createElement("span");
    s.className = "marquee-word";
    s.textContent = w;
    const dot = document.createElement("span");
    dot.className = "marquee-word marquee-dot";
    dot.textContent = "◆";
    el.appendChild(s);
    el.appendChild(dot);
  });
});

// ── REVEAL ──
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 },
);
document.querySelectorAll(".rv,.rv2").forEach((el) => io.observe(el));

// ── CAPTCHA ──
let cAns = 0;
function genCaptcha() {
  const a = Math.floor(Math.random() * 12) + 1,
    b = Math.floor(Math.random() * 10) + 1;
  const ops = ["+", "×", "−"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let q, ans;
  if (op === "+") {
    q = `${a} + ${b}`;
    ans = a + b;
  } else if (op === "×") {
    q = `${a} × ${b}`;
    ans = a * b;
  } else {
    const big = Math.max(a, b),
      sm = Math.min(a, b);
    q = `${big} − ${sm}`;
    ans = big - sm;
  }
  document.getElementById("cq").textContent = q;
  document.getElementById("ca").value = "";
  cAns = ans;
}
genCaptcha();
document.getElementById("cr").addEventListener("click", genCaptcha);

// ── FORM ──
let submitCount = 0,
  lastTime = 0;
document.getElementById("cf").addEventListener("submit", function (e) {
  e.preventDefault();
  const msg = document.getElementById("fMsg");
  const btn = document.getElementById("sb");
  function show(type, text) {
    msg.className = `form-message ${type}`;
    msg.textContent = text;
    msg.style.display = "block";
    msg.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Honeypot
  if (document.getElementById("hpf").value.trim()) return;

  // Rate limit
  if (submitCount >= 3) {
    show("err", "Too many attempts. Please call us at +91 976 555 0608.");
    return;
  }
  if (Date.now() - lastTime < 10000 && lastTime) {
    show("err", "Please wait a moment before submitting again.");
    return;
  }

  // Validate
  const fn = document.getElementById("fn").value.trim();
  const ln = document.getElementById("ln").value.trim();
  const ph = document.getElementById("ph").value.trim();
  const em = document.getElementById("em").value.trim();
  if (!fn || !ln) {
    show("err", "Please enter your full name.");
    return;
  }
  if (!ph || ph.replace(/\D/g, "").length < 10) {
    show("err", "Please enter a valid 10-digit phone number.");
    return;
  }
  if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
    show("err", "Please enter a valid email address.");
    return;
  }

  // Captcha
  const ua = parseInt(document.getElementById("ca").value, 10);
  if (isNaN(ua) || ua !== cAns) {
    show("err", "Incorrect answer to the verification question.");
    genCaptcha();
    return;
  }

  btn.disabled = true;
  btn.textContent = "Sending…";
  setTimeout(() => {
    submitCount++;
    lastTime = Date.now();
    show(
      "ok",
      `✓ Thank you, ${fn}! We'll reach out to you within 24 hours. For immediate help, call +91 976 555 0608.`,
    );
    document.getElementById("cf").reset();
    genCaptcha();
    btn.disabled = false;
    btn.textContent = "Send Enquiry →";
  }, 1300);
});
