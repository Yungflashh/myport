import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import Loader from './components/Loader';
import FloatingIcons from './components/FloatingIcons';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      '#1a1a2e',
      '#1e1e36',
      '#22223e',
      '#1e1e36',
      '#1c1c32',
      '#1a1a2e'
    ]
  );

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onLoadComplete={handleLoadComplete} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ backgroundColor }}
            className="min-h-screen text-cream overflow-x-hidden relative bg-navy"
          >
            <Navigation />
            <FloatingIcons />

            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>

            <div className="fixed inset-0 pointer-events-none z-0">
              <motion.div
                className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"
                style={{ backgroundColor: 'rgba(207, 92, 54, 0.08)' }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
                style={{ backgroundColor: 'rgba(207, 92, 54, 0.08)' }}
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
