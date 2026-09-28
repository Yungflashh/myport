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
        ::selection { background: rgba(201,169,110,0.3); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #c9a96e; }
        a { text-decoration: none; color: inherit; }
        input, textarea, select { font-family: 'DM Sans', sans-serif; color: #f5f0e8; }

        @keyframes bgPulse {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(30px); }
          to   { opacity:1; transform: none; }
        }
        @keyframes fadeIn {
          from { opacity:0; } to { opacity:1; }
        }
        @keyframes dropLine {
          0%   { top: -100%; }
          100% { top: 150%; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* NAV */
        .nav-link { font-size: 0.71rem; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(245,240,232,0.6); transition: color 0.2s; }
        .nav-link:hover { color: #f5f0e8; }

        /* BUTTONS */
        .btn-gold { display: inline-block; font-size: 0.71rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; background: #c9a96e; color: #0a0a0a; padding: 0.85rem 2.25rem; border: none; cursor: pointer; transition: background 0.25s, transform 0.18s; }
        .btn-gold:hover { background: #b8955a; transform: translateY(-1px); }
        .btn-outline { display: inline-block; font-size: 0.71rem; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; background: transparent; color: rgba(245,240,232,0.65); padding: 0.85rem 2.25rem; border: 1px solid rgba(245,240,232,0.22); cursor: pointer; transition: all 0.25s; }
        .btn-outline:hover { color: #f5f0e8; border-color: rgba(245,240,232,0.55); }

        /* SERVICE ROWS */
        .svc-row { border-top: 1px solid rgba(245,240,232,0.08); padding: 1.75rem 0; transition: background 0.3s; }
        .svc-row:hover { background: rgba(245,240,232,0.025); padding-left: 0.5rem; transition: all 0.3s; }
        .svc-row:hover .svc-arrow { opacity:1; transform: translateX(0); color: #c9a96e; }
        .svc-arrow { opacity:0; transform: translateX(-10px); transition: all 0.3s; font-size: 1rem; }

        /* PROCESS */
        .proc-row { display:flex; gap:2rem; padding:1.75rem 0; border-bottom:1px solid rgba(245,240,232,0.07); transition: padding-left 0.3s; }
        .proc-row:hover { padding-left: 0.5rem; }
        .proc-row:hover .proc-n { color: #c9a96e; }
        .proc-n { font-family: 'Cormorant Garamond',serif; font-size:0.9rem; color:rgba(245,240,232,0.18); min-width:2.25rem; padding-top:3px; transition:color 0.3s; letter-spacing:0.05em; flex-shrink:0; }

        /* FORM */
        .f-field { width:100%; background:rgba(245,240,232,0.04); border:1px solid rgba(245,240,232,0.1); padding:0.875rem 1rem; font-size:0.875rem; outline:none; transition:border-color 0.25s; }
        .f-field::placeholder { color:rgba(245,240,232,0.28); }
        .f-field:focus { border-color:#c9a96e; }
        select.f-field option { background:#111; }

        /* FOOTER */
        .ft-link { font-size:0.68rem; letter-spacing:0.1em; text-transform:uppercase; color:rgba(245,240,232,0.3); transition:color 0.2s; }
        .ft-link:hover { color:rgba(245,240,232,0.75); }

        /* MOBILE */
        .mob-overlay { position:fixed; inset:0; z-index:200; background:#080808; display:flex; flex-direction:column; padding:2rem; overflow-y:auto; }

        @media (max-width: 768px) {
          .hide-mob { display:none !important; }
          .show-mob { display:flex !important; }
          .sec-pad { padding: 5rem 1.5rem !important; }
          .hero-title { font-size: clamp(3.75rem, 16vw, 5.5rem) !important; }
          .split-2 { grid-template-columns: 1fr !important; }
          .split-3 { grid-template-columns: 1fr !important; }
          .split-4 { grid-template-columns: 1fr 1fr !important; }
          .craft-flex { flex-direction: column !important; }
          .craft-vid { width: 100% !important; height: 55vw !important; min-height: 240px; }
          .hero-btns { flex-direction:column !important; align-items:flex-start !important; }
          .quote-text { font-size: clamp(1.4rem,5vw,2rem) !important; }
          .proc-split { flex-direction:column !important; gap:2rem !important; }
        }
        @media (min-width: 769px) {
          .show-mob { display:none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation:none !important; transition:none !important; }
        }
      `}</style>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="mob-overlay">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"3rem" }}>
            <span style={{ fontFamily:serif, fontSize:"1.5rem", fontWeight:300, letterSpacing:"0.15em" }}>Ate<em>lier</em></span>
            <button onClick={() => setMenuOpen(false)} style={{ background:"none", border:"none", color:C, fontSize:"1.5rem", cursor:"pointer", lineHeight:1 }}>✕</button>
          </div>
          {NAV.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ fontFamily:serif, fontSize:"2.75rem", fontWeight:300, color:C, display:"block", padding:"0.6rem 0", borderBottom:"1px solid rgba(245,240,232,0.07)", letterSpacing:"-0.01em" }}>
              {l}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-gold" style={{ marginTop:"2.5rem", textAlign:"center" }}>Book a Fitting</a>
          <div style={{ marginTop:"auto", paddingTop:"3rem" }}>
            <p style={{ fontSize:"0.7rem", color:"rgba(245,240,232,0.2)", letterSpacing:"0.1em" }}>+234 801 234 5678 · hello@atelierlagos.com</p>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          §1  HERO
      ════════════════════════════════════════════════════ */}
      <section id="hero" style={{ position:"relative", height:"100vh", overflow:"hidden" }}>
        <BgVideo id={VID.hero} overlayColor="linear-gradient(160deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.3) 45%, rgba(10,10,10,0.82) 100%)" />

        {/* FIXED NAV */}
        <nav style={{
          position:"fixed", top:0, left:0, right:0, zIndex:100,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"1.6rem 3rem",
          background: scrolled ? "rgba(8,8,8,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(245,240,232,0.06)" : "none",
          transition:"background 0.4s, backdrop-filter 0.4s, border 0.4s",
        }}>
          <a href="#hero" style={{ fontFamily:serif, fontSize:"1.5rem", fontWeight:300, letterSpacing:"0.16em", textTransform:"uppercase", position:"relative", zIndex:1 }}>
            Ate<em style={{ fontStyle:"italic" }}>lier</em>
          </a>
          <div className="hide-mob" style={{ display:"flex", gap:"2.5rem" }}>
            {NAV.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
          </div>
          <a href="#contact" className="btn-gold hide-mob" style={{ padding:"0.65rem 1.5rem" }}>Book a Fitting</a>
          <button className="show-mob" onClick={() => setMenuOpen(true)}
            style={{ background:"none", border:"none", color:C, cursor:"pointer", flexDirection:"column", gap:"5px", padding:"4px" }}>
            <span style={{ display:"block", width:"24px", height:"1px", background:"currentColor" }} />
            <span style={{ display:"block", width:"24px", height:"1px", background:"currentColor" }} />
            <span style={{ display:"block", width:"18px", height:"1px", background:"currentColor" }} />
          </button>
        </nav>

        {/* HERO COPY */}
        <div style={{ position:"relative", zIndex:3, height:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 3rem 4.5rem" }}>
          <p style={{ fontSize:"0.67rem", letterSpacing:"0.22em", textTransform:"uppercase", color:G, marginBottom:"1.25rem", animation:"fadeUp 0.8s 0.3s both" }}>
            Est. 2008 · Bespoke Tailoring · Lagos, Nigeria
          </p>
          <h1 className="hero-title" style={{ fontFamily:serif, fontSize:"clamp(4.5rem, 10vw, 8.5rem)", fontWeight:300, lineHeight:0.9, letterSpacing:"-0.025em", marginBottom:"2.25rem", animation:"fadeUp 0.95s 0.5s both" }}>
            Worn<br /><em style={{ color:"rgba(245,240,232,0.32)", fontStyle:"italic" }}>with intent.</em>
          </h1>
          <div className="hero-btns" style={{ display:"flex", alignItems:"center", gap:"1.25rem", animation:"fadeUp 0.9s 0.72s both" }}>
            <a href="#contact" className="btn-gold">Book a Fitting</a>
            <a href="#work" className="btn-outline">Explore Our Work</a>
            <span className="hide-mob" style={{ width:"1px", height:"28px", background:"rgba(245,240,232,0.12)" }} />
            <span className="hide-mob" style={{ fontSize:"0.8rem", color:"rgba(245,240,232,0.45)", fontWeight:300 }}>
              Every stitch placed by hand.
            </span>
          </div>
        </div>

        {/* RIGHT SIDE STATS */}
        <div className="hide-mob" style={{ position:"absolute", right:"2.5rem", bottom:"4.5rem", zIndex:3, display:"flex", flexDirection:"column", gap:"0.875rem", animation:"fadeIn 1s 1.2s both" }}>
          {[["2,400+","Garments"],["16","Years"],["98%","Return rate"]].map(([n, l]) => (
            <div key={l} style={{ background:"rgba(10,10,10,0.55)", backdropFilter:"blur(8px)", border:"1px solid rgba(245,240,232,0.08)", padding:"0.625rem 1rem", textAlign:"right" }}>
              <div style={{ fontFamily:serif, fontSize:"1.5rem", fontWeight:300, color:C, lineHeight:1 }}>{n}</div>
              <div style={{ fontSize:"0.62rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(245,240,232,0.38)", marginTop:"2px" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* SCROLL LINE */}
        <div style={{ position:"absolute", bottom:"2.5rem", left:"50%", transform:"translateX(-50%)", zIndex:3, display:"flex", flexDirection:"column", alignItems:"center", gap:"8px", animation:"fadeIn 1s 1.5s both" }}>
          <div style={{ width:"1px", height:"48px", background:"rgba(245,240,232,0.12)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, width:"100%", height:"45%", background:G, animation:"dropLine 2.2s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* TICKER */}
      <Ticker items={["Bespoke Suits","Made-to-Measure","Alterations","Evening Wear","Wedding Attire","Corporate Wardrobe","Hand-Stitched","Holland & Sherry","Dormeuil Fabrics","Lagos Island","Since 2008"]} />

      {/* ════════════════════════════════════════════════════
          §2  NUMBERS
      ════════════════════════════════════════════════════ */}
      <section style={{ background:"#0a0a0a", padding:"6.5rem 3rem" }} className="sec-pad">
        <div style={{ maxWidth:"74rem", margin:"0 auto" }}>
          <Reveal>
            <p style={{ fontSize:"0.67rem", letterSpacing:"0.2em", textTransform:"uppercase", color:G, marginBottom:"3.5rem" }}>The record</p>
          </Reveal>
          <div className="split-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:"rgba(245,240,232,0.07)" }}>
            {[
              { n:"2,400+", l:"Garments delivered since 2008" },
              { n:"16 yrs", l:"Operating in Lagos, Nigeria" },
              { n:"98%",    l:"Clients who commission again" },
              { n:"48 hr",  l:"Express alteration turnaround" },
            ].map(({ n, l }, i) => (
              <Reveal key={n} delay={i * 0.1}>
                <div style={{ padding:"2.5rem 2rem", background:"#0a0a0a" }}>
                  <div style={{ fontFamily:serif, fontSize:"clamp(2.25rem,4.5vw,3.5rem)", fontWeight:300, color:C, letterSpacing:"-0.02em", lineHeight:1, marginBottom:"0.75rem" }}>{n}</div>
                  <div style={{ fontSize:"0.75rem", color:M, fontWeight:300, lineHeight:1.6 }}>{l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          §3  CRAFT SPLIT  (video left / copy right)
      ════════════════════════════════════════════════════ */}
      <section id="work">
        <div className="craft-flex" style={{ display:"flex", minHeight:"75vh" }}>
          {/* VIDEO HALF */}
          <div className="craft-vid" style={{ width:"52%", position:"relative" }}>
            <BgVideo id={VID.craft} overlayColor="rgba(10,10,10,0.22)" />
          </div>
          {/* COPY HALF */}
          <div style={{ flex:1, background:"#111111", display:"flex", alignItems:"center", padding:"4rem 3.5rem" }}>
            <div>
              <Reveal>
                <p style={{ fontSize:"0.67rem", letterSpacing:"0.2em", textTransform:"uppercase", color:G, marginBottom:"1.5rem" }}>The craft</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 style={{ fontFamily:serif, fontSize:"clamp(2.25rem,4vw,3.25rem)", fontWeight:300, lineHeight:1.12, letterSpacing:"-0.02em", marginBottom:"1.5rem" }}>
                  Precision is<br /><em style={{ color:"rgba(245,240,232,0.38)" }}>not a feature.</em><br />It's the baseline.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ fontSize:"0.9rem", fontWeight:300, lineHeight:1.85, color:M, marginBottom:"2.25rem", maxWidth:"28rem" }}>
                  We don't use automated cutting tables. Every panel is traced by hand from a paper pattern created specifically for your body — and used for no one else's.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <a href="#process" className="btn-outline">See our process →</a>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── SERVICES LIST ────────────────────────────────── */}
        <div style={{ background:"#0a0a0a", padding:"6.5rem 3rem" }} className="sec-pad">
          <div style={{ maxWidth:"74rem", margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem", flexWrap:"wrap", gap:"1.5rem" }}>
              <Reveal>
                <div>
                  <p style={{ fontSize:"0.67rem", letterSpacing:"0.2em", textTransform:"uppercase", color:G, marginBottom:"0.875rem" }}>What we make</p>
                  <h2 style={{ fontFamily:serif, fontSize:"clamp(2.25rem,4.5vw,3.75rem)", fontWeight:300, letterSpacing:"-0.02em", lineHeight:1.05 }}>
                    Six ways<br /><em style={{ color:"rgba(245,240,232,0.35)" }}>to dress well.</em>
                  </h2>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <a href="#contact" className="btn-gold">Start a Commission</a>
              </Reveal>
            </div>
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="svc-row">
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"1.5rem" }}>
                    <div style={{ display:"flex", gap:"1.75rem", flex:1 }}>
                      <span style={{ fontFamily:serif, fontSize:"0.82rem", color:"rgba(245,240,232,0.18)", paddingTop:"4px", flexShrink:0, letterSpacing:"0.04em" }}>{s.n}</span>
                      <div>
                        <h3 style={{ fontSize:"1.0625rem", fontWeight:400, letterSpacing:"-0.01em", marginBottom:"0.45rem" }}>{s.title}</h3>
                        <p style={{ fontSize:"0.855rem", fontWeight:300, color:M, lineHeight:1.75, maxWidth:"40rem" }}>{s.desc}</p>
                      </div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:"1.25rem", flexShrink:0, paddingTop:"4px" }}>
                      <span style={{ fontSize:"0.6rem", letterSpacing:"0.12em", textTransform:"uppercase", color:G, background:"rgba(201,169,110,0.08)", padding:"3px 9px", border:`1px solid rgba(201,169,110,0.22)` }}>{s.tag}</span>
                      <span className="svc-arrow">→</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop:"1px solid rgba(245,240,232,0.08)" }} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          §4  FULL-BLEED QUOTE (sewing machine video)
      ════════════════════════════════════════════════════ */}
      <section style={{ position:"relative", height:"65vh", overflow:"hidden" }}>
        <BgVideo id={VID.machine} overlayColor="rgba(10,10,10,0.58)" />
        <div style={{ position:"relative", zIndex:3, height:"100%", display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 2.5rem" }}>
          <div>
            <Reveal>
              <p style={{ fontSize:"0.67rem", letterSpacing:"0.22em", textTransform:"uppercase", color:G, marginBottom:"1.75rem" }}>Our philosophy</p>
            </Reveal>
            <Reveal delay={0.15}>
              <blockquote className="quote-text" style={{ fontFamily:serif, fontSize:"clamp(1.75rem,4.5vw,3.5rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.02em", maxWidth:"50rem" }}>
                "A suit should feel like a second skin — not like a second opinion."
              </blockquote>
            </Reveal>
            <Reveal delay={0.3}>
              <p style={{ fontSize:"0.72rem", letterSpacing:"0.15em", textTransform:"uppercase", color:M, marginTop:"1.75rem" }}>
                — Atelier Studio, Lagos Island
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          §5  PROCESS
      ════════════════════════════════════════════════════ */}
      <section id="process" style={{ background:"#0e0e0e", padding:"6.5rem 3rem" }} className="sec-pad">
        <div style={{ maxWidth:"74rem", margin:"0 auto" }}>
          <Reveal>
            <p style={{ fontSize:"0.67rem", letterSpacing:"0.2em", textTransform:"uppercase", color:G, marginBottom:"1rem" }}>How it works</p>
          </Reveal>
          <div className="proc-split" style={{ display:"flex", gap:"7rem", alignItems:"flex-start" }}>
            <div style={{ flex:"0 0 auto", maxWidth:"21rem" }}>
              <Reveal delay={0.1}>
                <h2 style={{ fontFamily:serif, fontSize:"clamp(2.25rem,4vw,3.5rem)", fontWeight:300, lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:"1.5rem" }}>
                  Six steps<br /><em style={{ color:"rgba(245,240,232,0.35)" }}>to perfect.</em>
                </h2>
                <p style={{ fontSize:"0.875rem", fontWeight:300, color:M, lineHeight:1.8, marginBottom:"2rem" }}>
                  From first call to final press — a process designed around your schedule, not ours.
                </p>
                <a href="#contact" className="btn-gold">Book Consultation</a>
              </Reveal>
            </div>
            <div style={{ flex:1 }}>
              {PROCESS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.07}>
                  <div className="proc-row">
                    <span className="proc-n">{String(i+1).padStart(2,"0")}</span>
                    <div>
                      <h3 style={{ fontSize:"0.9875rem", fontWeight:500, letterSpacing:"0.01em", marginBottom:"0.4rem" }}>{p.title}</h3>
                      <p style={{ fontSize:"0.855rem", fontWeight:300, color:M, lineHeight:1.8 }}>{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          §6  NEEDLE CLOSE-UP VIDEO  (atmospheric interlude)
      ════════════════════════════════════════════════════ */}
      <section style={{ position:"relative", height:"55vh", overflow:"hidden" }}>
        <BgVideo id={VID.needle} overlayColor="rgba(10,10,10,0.48)" />
        <div style={{ position:"relative", zIndex:3, height:"100%", display:"flex", alignItems:"flex-end", padding:"0 3rem 4rem" }}>
          <div style={{ maxWidth:"74rem", margin:"0 auto", width:"100%", display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1.5rem" }}>
            <Reveal>
              <div>
                <p style={{ fontSize:"0.67rem", letterSpacing:"0.22em", textTransform:"uppercase", color:G, marginBottom:"0.75rem" }}>The studio</p>
                <h2 style={{ fontFamily:serif, fontSize:"clamp(1.75rem,3.5vw,2.75rem)", fontWeight:300, letterSpacing:"-0.02em", lineHeight:1.15 }}>
                  Open by appointment.<br />Lagos Island & Victoria Island.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <a href="#contact" className="btn-gold">Schedule a Visit</a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          §7  TESTIMONIALS
      ════════════════════════════════════════════════════ */}
      <section id="story" style={{ background:"#0a0a0a", padding:"6.5rem 3rem", textAlign:"center" }} className="sec-pad">
        <div style={{ maxWidth:"50rem", margin:"0 auto" }}>
          <Reveal>
            <p style={{ fontSize:"0.67rem", letterSpacing:"0.2em", textTransform:"uppercase", color:G, marginBottom:"3.5rem" }}>What clients say</p>
          </Reveal>
          {/* Rotating quote */}
          <div style={{ minHeight:"180px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ display: i === activeQ ? "block" : "none", animation: i === activeQ ? "fadeIn 0.65s both" : "none" }}>
                <blockquote style={{ fontFamily:serif, fontSize:"clamp(1.4rem,3vw,2.1rem)", fontWeight:300, lineHeight:1.45, letterSpacing:"-0.01em", marginBottom:"1.75rem" }}>
                  "{t.q}"
                </blockquote>
                <p style={{ fontSize:"0.72rem", letterSpacing:"0.12em", textTransform:"uppercase", color:M }}>
                  {t.name} &nbsp;·&nbsp; <span style={{ color:G }}>{t.role}</span>
                </p>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div style={{ display:"flex", gap:"0.75rem", justifyContent:"center", marginTop:"2.5rem" }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveQ(i)} aria-label={`Testimonial ${i+1}`}
                style={{ width:"6px", height:"6px", borderRadius:"50%", border:"none", cursor:"pointer", background: i === activeQ ? G : "rgba(245,240,232,0.18)", transform: i === activeQ ? "scale(1.35)" : "none", transition:"all 0.3s" }} />
            ))}
          </div>
        </div>
      </section>

      {/* FABRIC TEXTURE VIDEO SEPARATOR */}
      <section style={{ position:"relative", height:"35vh", overflow:"hidden" }}>
        <BgVideo id={VID.fabric} overlayColor="rgba(10,10,10,0.6)" />
        <div style={{ position:"relative", zIndex:3, height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Reveal>
            <p style={{ fontFamily:serif, fontSize:"clamp(1.5rem,3vw,2.25rem)", fontWeight:300, letterSpacing:"0.04em", color:"rgba(245,240,232,0.6)", textAlign:"center", fontStyle:"italic" }}>
              The fabric is the first impression.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          §8  RATES
      ════════════════════════════════════════════════════ */}
      <section id="rates" style={{ background:"#0d0d0d", padding:"6.5rem 3rem" }} className="sec-pad">
        <div style={{ maxWidth:"74rem", margin:"0 auto" }}>
          <Reveal>
            <p style={{ fontSize:"0.67rem", letterSpacing:"0.2em", textTransform:"uppercase", color:G, marginBottom:"0.875rem" }}>Investment</p>
            <h2 style={{ fontFamily:serif, fontSize:"clamp(2.25rem,4.5vw,3.75rem)", fontWeight:300, letterSpacing:"-0.02em", marginBottom:"4rem", lineHeight:1.05 }}>
              Transparent pricing.<br /><em style={{ color:"rgba(245,240,232,0.35)" }}>No surprises.</em>
            </h2>
          </Reveal>
          <div className="split-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:"rgba(245,240,232,0.07)" }}>
            {[
              { t:"Alteration",      from:"₦15,000",  note:"From 48-hr turnaround",  feat:false, items:["Hem adjustments","Taking in / letting out","Relining jackets","Sleeve shortening","Zip replacement"] },
              { t:"Made-to-Measure", from:"₦120,000", note:"2–3 week lead time",      feat:true,  items:["2 fittings included","200+ fabric choices","Full lining","1-year guarantee","Measurements on file"] },
              { t:"Bespoke",         from:"₦350,000", note:"6–8 week lead time",      feat:false, items:["Full canvas construction","Hand-stitched buttonholes","3+ fittings","Paper pattern kept on file","Lifetime alterations discount"] },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 0.1}>
                <div style={{ background: p.feat ? "#141414" : "#0d0d0d", padding:"2.5rem 2rem", borderTop: p.feat ? `2px solid ${G}` : "2px solid transparent", position:"relative", height:"100%" }}>
                  {p.feat && <span style={{ position:"absolute", top:"1.25rem", right:"1.25rem", fontSize:"0.58rem", letterSpacing:"0.12em", textTransform:"uppercase", color:G, background:"rgba(201,169,110,0.1)", padding:"3px 9px", border:`1px solid rgba(201,169,110,0.28)` }}>Most popular</span>}
                  <p style={{ fontSize:"0.67rem", letterSpacing:"0.14em", textTransform:"uppercase", color:M, marginBottom:"0.875rem" }}>{p.t}</p>
                  <div style={{ fontFamily:serif, fontSize:"clamp(1.75rem,3vw,2.5rem)", fontWeight:300, color:C, marginBottom:"0.25rem", letterSpacing:"-0.01em" }}>From {p.from}</div>
                  <p style={{ fontSize:"0.72rem", color:"rgba(245,240,232,0.28)", marginBottom:"1.75rem" }}>{p.note}</p>
                  <div style={{ borderTop:"1px solid rgba(245,240,232,0.07)", paddingTop:"1.5rem", marginBottom:"2rem" }}>
                    {p.items.map(item => (
                      <div key={item} style={{ display:"flex", gap:"0.75rem", marginBottom:"0.6rem", alignItems:"flex-start" }}>
                        <span style={{ color:G, fontSize:"0.7rem", marginTop:"2px", flexShrink:0 }}>—</span>
                        <span style={{ fontSize:"0.8rem", fontWeight:300, color:"rgba(245,240,232,0.62)", lineHeight:1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" className={p.feat ? "btn-gold" : "btn-outline"} style={{ display:"block", textAlign:"center" }}>
                    {p.feat ? "Book Now" : "Enquire"}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p style={{ fontSize:"0.75rem", color:"rgba(245,240,232,0.22)", textAlign:"center", marginTop:"1.75rem", fontWeight:300 }}>
              Starting estimates only. Final price confirmed at consultation. Fabric upgrades priced separately.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          §9  CONTACT FORM
      ════════════════════════════════════════════════════ */}
      <section id="contact" style={{ background:"#0a0a0a", padding:"6.5rem 3rem" }} className="sec-pad">
        <div style={{ maxWidth:"74rem", margin:"0 auto" }}>
          <div className="split-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6rem", alignItems:"start" }}>