import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789@#$%^&*()<>/{}[]';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(26, 26, 46, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        const opacity = Math.random() * 0.5 + 0.2;
        const useGreen = Math.random() > 0.6;
        ctx.fillStyle = useGreen
          ? `rgba(34, 197, 94, ${opacity})`
          : `rgba(207, 92, 54, ${opacity})`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-50" />;
};

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Software Engineer", "Systems Engineer", "Developer", "Designer", "Creator", "Problem Solver"];
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 800], [2, -2]);
  const rotateY = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1200], [-2, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      className="min-h-screen relative px-6 bg-navy overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      <MatrixRain />

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ backgroundColor: 'rgba(207, 92, 54, 0.07)' }}
        animate={{ scale: [1, 1.3, 1], x: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full blur-[120px]"
        style={{ backgroundColor: 'rgba(207, 92, 54, 0.05)' }}
        animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content with 3D tilt */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center"
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-cream-dim tracking-wide">Available for work</span>
          </motion.div>

          {/* Title */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none"
            >
              <span className="text-cream">Yung</span>
              <span className="text-accent">flash</span>
            </motion.h1>

            <div className="h-16 md:h-20 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentWord}
                  initial={{ y: 30, opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -30, opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-5xl font-light text-cream-dim"
                >
                  {words[currentWord]}
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-cream-muted max-w-2xl mx-auto leading-relaxed"
          >
            I build digital experiences that matter. Let's create something extraordinary together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(207, 92, 54, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-accent text-cream font-semibold text-lg rounded-lg hover:brightness-110 transition-all w-full sm:w-auto shadow-lg shadow-accent/20"
            >
              View My Work
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, borderColor: 'rgba(207, 92, 54, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 text-cream font-semibold text-lg rounded-lg border border-cream/15 hover:text-accent transition-all w-full sm:w-auto backdrop-blur-sm"
            >
              Get in Touch
            </motion.button>
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] text-cream-muted tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} className="text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
