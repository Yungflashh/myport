import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 0.6,
  duration: 1.2 + Math.random() * 1.2,
  size: 4 + Math.random() * 8,
  color: ['#cf5c36', '#e8774f', '#fdfffc', '#cf5c3680'][Math.floor(Math.random() * 4)],
}));

const EasterEgg = () => {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const konamiLower = KONAMI.map(k => k.toLowerCase());
    let seq: string[] = [];

    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) return;

      seq = [...seq, e.key.toLowerCase()].slice(-konamiLower.length);

      if (
        seq.length === konamiLower.length &&
        seq.every((k, i) => k === konamiLower[i])
      ) {
        setTriggered(true);
        seq = [];
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden cursor-pointer"
          style={{ backgroundColor: 'rgba(26,26,46,0.97)' }}
          onClick={() => setTriggered(false)}
        >
          {PARTICLES.map(p => (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.x}%`,
                bottom: '-10px',
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -(window.innerHeight + 100), opacity: [1, 1, 0] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: 'easeOut',
                repeat: Infinity,
                repeatDelay: 0.3,
              }}
            />
          ))}

          <div className="relative z-10 text-center px-8 select-none">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.1 }}
              className="text-7xl md:text-9xl mb-6"
            >
              🎉
            </motion.div>

            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-3xl md:text-6xl font-bold text-accent font-mono mb-3 tracking-tight"
            >
              YOU FOUND IT
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-cream-dim font-mono text-base md:text-lg mb-2"
            >
              ↑ ↑ ↓ ↓ ← → ← → B A
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-cream-dim font-mono text-sm md:text-base mb-8"
            >
              The Konami Code. Classic.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-accent/80 font-mono text-sm md:text-base italic"
            >
              "You're clearly thorough — I like that in a collaborator." 👀
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-cream-muted/40 font-mono text-xs mt-10"
            >
              click anywhere to close
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEgg;
