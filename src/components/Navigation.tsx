import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  const scrollToSection = (item: string) => {
    const element = document.getElementById(item.toLowerCase());
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 border-b border-cream/5'
          : 'bg-transparent py-6'
      }`}
      style={scrolled ? { backgroundColor: 'rgba(26, 26, 46, 0.85)', backdropFilter: 'blur(20px)' } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-accent"
        >
          &lt;Yungflash /&gt;
        </motion.div>

        <div className="hidden md:flex gap-8">
          {navItems.map((item, i) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="text-cream-dim hover:text-accent transition-colors text-sm tracking-wide uppercase"
            >
              {item}
            </motion.button>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cream"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed top-0 right-0 h-screen w-64 border-l border-cream/5 md:hidden"
              style={{ backgroundColor: 'rgba(26, 26, 46, 0.97)', backdropFilter: 'blur(24px)' }}
            >
              <div className="flex flex-col gap-6 p-8 mt-20">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-xl text-cream-dim hover:text-accent text-left tracking-wide"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
