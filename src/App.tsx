import { useState, useEffect, useRef } from "react";

/* ─── VIDEO HELPER ───────────────────────────────────────────────────────────
   Pexels CDN works in the browser (CORS + cookies handled automatically).
   We don't know the exact filename ahead of time, so we supply ALL common
   resolution/fps combos as <source> tags. The browser tries each in order
   and plays the first one that streams — silently skipping any 403s.
─────────────────────────────────────────────────────────────────────────── */
function pexelsSources(id) {
  const base = `https://videos.pexels.com/video-files/${id}/${id}`;
  return [
    `${base}-hd_1280_720_25fps.mp4`,
    `${base}-hd_1280_720_30fps.mp4`,
    `${base}-hd_1280_720_24fps.mp4`,
    `${base}-hd_1920_1080_25fps.mp4`,
    `${base}-hd_1920_1080_30fps.mp4`,
    `${base}-hd_1920_1080_24fps.mp4`,
    `${base}-hd_1080_1920_25fps.mp4`,
    `${base}-hd_1080_1920_30fps.mp4`,
    `${base}-sd_960_540_25fps.mp4`,
    `${base}-sd_960_540_30fps.mp4`,
    `${base}-sd_640_360_25fps.mp4`,
    `${base}-sd_640_360_30fps.mp4`,
  ];
}

/* Video IDs — all from Pexels, tailoring/fashion theme
   6764964  master tailor cutting outline in atelier   ✓ confirmed working
   6766337  tailor cutting fabric on table
   4927683  sewing machine stitching close-up
   3755530  woman sewing red cloth
   7452737  close-up sewing machine needle in factory
   7677746  top view black fabric texture               */
const VID = {
  hero:    6764964,
  craft:   6766337,
  machine: 4927683,
  sewing:  3755530,
  needle:  7452737,
  fabric:  7677746,
};

/* ─── COMPONENTS ─────────────────────────────────────────────────────────── */

// Autoplay video that pauses when off-screen + multi-source fallback
function BgVideo({ id, style, overlayColor = "rgba(10,10,10,0.52)" }) {
  const vidRef = useRef(null);
  const wrapRef = useRef(null);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { try { e.isIntersecting ? vidRef.current?.play() : vidRef.current?.pause(); } catch(_){} },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={wrapRef} style={{ position: "absolute", inset: 0, overflow: "hidden", ...style }}>
      {/* CSS animated fallback — shows while video loads or if all sources fail */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1410 50%, #0a0a0a 100%)",
        backgroundSize: "400% 400%",
        animation: "bgPulse 8s ease infinite",
      }} />
      <video ref={vidRef} autoPlay muted loop playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }}>
        {pexelsSources(id).map(src => <source key={src} src={src} type="video/mp4" />)}
      </video>
      <div style={{ position: "absolute", inset: 0, background: overlayColor, zIndex: 2 }} />
    </div>
  );
}

// Scroll-reveal wrapper
function Reveal({ children, delay = 0, y = 30 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.9s ${delay}s cubic-bezier(.22,1,.36,1), transform 0.9s ${delay}s cubic-bezier(.22,1,.36,1)`,
    }}>
      {children}
    </div>
  );
}

// Horizontal ticker
function Ticker({ items }) {
  const [x, setX] = useState(0);
  const rep = [...items, ...items, ...items, ...items];
  useEffect(() => {
    let raf;
    const tick = () => { setX(p => (p + 0.45) % (items.length * 175)); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [items]);
  return (
    <div style={{ overflow: "hidden", background: "#0d0d0d", borderTop: "1px solid rgba(201,169,110,0.15)", borderBottom: "1px solid rgba(201,169,110,0.15)", padding: "13px 0" }}>
      <div style={{ display: "flex", transform: `translateX(-${x}px)`, willChange: "transform" }}>
        {rep.map((t, i) => (
          <span key={i} style={{ fontSize: "0.67rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", paddingRight: "1rem", flexShrink: 0, display: "flex", alignItems: "center", gap: "1rem" }}>
            {t}
            <span style={{ color: "#c9a96e", opacity: 0.5, fontSize: "0.5rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const NAV = ["Work", "Process", "Story", "Rates", "Contact"];

const SERVICES = [
  { n: "01", title: "Bespoke Suits",       tag: "Signature",  desc: "Fully canvassed, hand-stitched suits built from a paper pattern cut to your body only. Two fittings minimum. Nothing is shared with another client's pattern." },
  { n: "02", title: "Made-to-Measure",     tag: "Popular",    desc: "A refined fit from a modified block pattern. Faster lead time, the same premium fabrics, and every key measurement still captured from your body." },
  { n: "03", title: "Evening Wear",        tag: "Occasions",  desc: "Dinner jackets, agbadas, senator kaftans, gowns. Ceremonial dress that commands a room before you speak." },
  { n: "04", title: "Alterations",         tag: "Fast",       desc: "We rescue and recraft — hems, relined jackets, taking in or letting out, sleeve adjustments. Nothing beyond repair. Turnaround from 48 hours." },
  { n: "05", title: "Corporate Wardrobe",  tag: "Ongoing",    desc: "Quarterly wardrobe packages for executives who need to show up consistently. Every piece calibrated to your existing wardrobe." },
  { n: "06", title: "Wedding Party",       tag: "Events",     desc: "Groom, groomsmen, family. The full party dressed cohesively from one studio — no mismatched fabrics, no last-minute surprises." },
];

const PROCESS = [
  { title: "Consult",  body: "30 minutes in person or on a video call. We learn how you move, how you sit, how you present — so the clothes work for your life, not ours." },
  { title: "Measure",  body: "42 body measurements taken with precision tape. Your geometry becomes the only pattern that exists for your garment." },
  { title: "Fabric",   body: "Choose from 200+ premium swatches — Holland & Sherry worsteds, Dormeuil Super 130s, Thomas Mason cotton shirtings, Ghanaian kente accents." },
  { title: "Cut",      body: "Every panel cut by hand from your paper pattern. No automated cutting tables, no block approximation." },
  { title: "Fit",      body: "First fitting at 60% construction. Adjustments marked live on your body in chalk. Not on a mannequin. Never guessed." },
  { title: "Deliver",  body: "Final garment pressed, tissue-wrapped, and handed over with a care card and a one-year structural guarantee." },
];

const TESTIMONIALS = [
  { q: "I've worn suits from London, Milan, and New York. Nothing has fit like this. Not once.", name: "Emeka O.", role: "Managing Director, Lagos" },
  { q: "Three wedding pieces. Every single one was perfect. My guests still ask where I got dressed.", name: "Femi A.", role: "Architect, Abuja" },
  { q: "They took a jacket I hated and made me love wearing it. Atelier is the only tailor I recommend.", name: "Chidera N.", role: "Creative Director, Lagos" },
  { q: "My corporate wardrobe package changed how I walk into every meeting. Worth every naira.", name: "Adaeze K.", role: "CEO, Victoria Island" },
];

/* ─── MAIN COMPONENT ──────────────────────────────────────────────────────── */
export default function AtelierPage() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [activeQ, setActiveQ]       = useState(0);
  const [form, setForm]             = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent]             = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveQ(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const G = "#c9a96e"; // gold
  const C = "#f5f0e8"; // cream
  const M = "rgba(245,240,232,0.55)"; // muted
  const B = "rgba(245,240,232,0.09)"; // border
  const serif = "'Cormorant Garamond', serif";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #0a0a0a; color: #f5f0e8; overflow-x: hidden; }