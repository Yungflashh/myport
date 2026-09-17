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