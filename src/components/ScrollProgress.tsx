import { useState, useEffect } from 'react';
import { useScroll, useSpring, useTransform, motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const SIZE = 52;
const STROKE = 3;
const RADIUS = (SIZE - STROKE * 2) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const dashOffset = useTransform(smooth, [0, 1], [CIRCUMFERENCE, 0]);

  const [pct, setPct] = useState(0);
  const [atBottom, setAtBottom] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = (v: number) => {
      setPct(Math.round(v * 100));
      setAtBottom(v >= 0.97);
      setVisible(v > 0.03);
    };

    // seed with current value immediately
    update(scrollYProgress.get());

    return scrollYProgress.on('change', update);
  }, [scrollYProgress]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-progress"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-[9999] w-[52px] h-[52px] flex items-center justify-center"
          aria-label={atBottom ? 'Back to top' : `${pct}% scrolled`}
        >
          <svg
            width={SIZE}
            height={SIZE}
            className="absolute inset-0"
            style={{
              transform: 'rotate(-90deg)',
              filter: 'drop-shadow(0 0 10px rgba(207,92,54,0.45))',
            }}
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="rgba(26,26,46,0.92)"
              stroke="rgba(207,92,54,0.2)"
              strokeWidth={STROKE}
            />
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#cf5c36"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>

          <AnimatePresence mode="wait">
            {atBottom ? (
              <motion.span
                key="arrow"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 text-accent"
              >
                <ArrowUp size={18} strokeWidth={2.5} />
              </motion.span>
            ) : (
              <motion.span
                key="pct"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="relative z-10 text-[11px] font-bold text-accent tabular-nums leading-none select-none"
              >
                {pct}%
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollProgress;
