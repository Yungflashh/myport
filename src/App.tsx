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