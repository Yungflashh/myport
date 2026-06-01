import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "IshowLeck",
    role: "CEO",
    company: "VendorSpot NG",
    text: "Working with Yungflash was an incredible experience. He delivered our e-commerce platform ahead of schedule with features we didn't even know we needed. His attention to detail and understanding of user experience is top-notch.",
    rating: 5,
    avatar: "AO",
  },
  {
    id: 2,
    name: "Mr Eze",
    role: "Product Manager",
    company: "LookReal",
    text: "Yungflash built our mobile app from scratch and the result exceeded all expectations. The real-time features work flawlessly, and our users love the smooth interface. Highly recommend his services.",
    rating: 5,
    avatar: "ME",
  },
  {
    id: 3,
    name: "Emeka Nwosu",
    role: "Founder",
    company: "SoyaAI",
    text: "He transformed our AI concept into a fully functional SaaS platform. His expertise in both frontend and backend development made the entire process seamless. A truly talented engineer.",
    rating: 5,
    avatar: "EN",
  },
  {
    id: 4,
    name: "Funke Adeyemi",
    role: "CTO",
    company: "FlowPay",
    text: "Yungflash has a rare combination of technical skill and creative vision. He doesn't just write code — he builds experiences. Our dashboard performance improved by 60% after his optimization work.",
    rating: 5,
    avatar: "FA",
  },
  {
    id: 5,
    name: "Tunde Bakare",
    role: "Managing Director",
    company: "Ikorodu Tech Community ",
    text: "From consultation to deployment, Yungflash was professional and responsive. He handled our complex requirements with ease and delivered a solution that has scaled beautifully with our growth.",
    rating: 5,
    avatar: "TB",
  },
  {
    id: 6,
    name: "Franboss",
    role: "Founder & CEO",
    company: "LookReal(Usa)",
    text: "I Was specifially looking for a developer who could bring my vision to life. Yungflash didn't just build LookReal — he understood the product at its core. The escrow system, real-time updates, everything works seamlessly. Best decision I made for my startup.",
    rating: 5,
    avatar: "F",
  },
  {
    id: 7,
    name: "Mr Rapheal",
    role: "Head of Engineering",
    company: "Vayaak (China)",
    text: "We contracted Yungflash for a critical API integration project and he delivered exceptional work. His communication across time zones was flawless, and the code quality was production-ready from day one. We've since hired him for two more projects.",
    rating: 5,
    avatar: "MR",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="px-4 sm:px-6 py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-cream">
            What Clients <span className="text-accent">Say</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-cream-muted text-base md:text-lg max-w-xl mx-auto">
            Feedback from people I've had the pleasure of working with
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="rounded-2xl border border-cream/5 p-8 sm:p-10 relative overflow-hidden"
              style={{ backgroundColor: 'rgba(36, 36, 69, 0.5)', backdropFilter: 'blur(12px)' }}
            >
              <div className="absolute top-6 right-6 opacity-10">
                <Quote size={60} className="text-accent" />
              </div>

              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-accent fill-accent" />
                ))}
              </div>

              <p className="text-cream-dim text-base sm:text-lg leading-relaxed mb-8 relative z-10">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-cream font-semibold">{t.name}</h4>
                  <p className="text-cream-muted text-sm">
                    {t.role}, <span className="text-accent/70">{t.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-11 h-11 rounded-full border border-cream/10 flex items-center justify-center text-cream-muted hover:text-accent hover:border-accent/30 transition-colors"
              style={{ backgroundColor: 'rgba(36, 36, 69, 0.5)' }}
            >
              <ChevronLeft size={20} />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-accent w-8' : 'bg-cream/20 w-4 hover:bg-cream/40'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-11 h-11 rounded-full border border-cream/10 flex items-center justify-center text-cream-muted hover:text-accent hover:border-accent/30 transition-colors"
              style={{ backgroundColor: 'rgba(36, 36, 69, 0.5)' }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
