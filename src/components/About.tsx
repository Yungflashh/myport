import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Terminal, Gauge, Layers, Users } from 'lucide-react';
import myImg from "../assets/my_img.jpeg"
import myImg2 from "../assets/my_img2.jpeg"

const About: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = [
    { src: myImg, alt: "Developer workspace" },
    { src: myImg2, alt: "Developer portrait" }
  ];

  const features = [
    {
      Icon: Terminal,
      title: "Clean Code",
      description: "Writing maintainable, scalable code with best practices",
      color: "bg-cyan-500"
    },
    {
      Icon: Gauge,
      title: "Fast Performance",
      description: "Optimized solutions for lightning-fast user experiences",
      color: "bg-blue-500"
    },
    {
      Icon: Layers,
      title: "Modern Tech",
      description: "Leveraging cutting-edge technologies and frameworks",
      color: "bg-purple-500"
    },
    {
      Icon: Users,
      title: "User Focused",
      description: "Creating intuitive interfaces that users love",
      color: "bg-pink-500"
    }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            About Me
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={images[currentImage].src}
                  alt={images[currentImage].alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full h-96 object-cover rounded-2xl transition-all duration-500 ${
                    isHovered ? 'blur-none' : 'blur-sm'
                  }`}
                />
              </AnimatePresence>

              <AnimatePresence>
                {isHovered && (
                  <>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  </>
                )}
              </AnimatePresence>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImage
                        ? 'bg-cyan-500 w-8'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white">
              Building Digital Excellence
            </h3>
            <p className="text-gray-400 leading-relaxed">
              As a software engineer, I thrive on the challenge of transforming ideas into functional applications that make a difference in people's lives. My journey began with a fascination for technology and problem-solving, and now I enjoy crafting elegant code that not only meets user needs but also enhances their experiences.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Collaborating with diverse teams, I dive deep into understanding requirements, always aiming to create innovative solutions that are both efficient and user-friendly. Continuous learning is a core part of my life, as I stay updated with the latest technologies and trends.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button className="px-8 py-3 rounded-sm bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-colors shadow-lg">
                Download Resume
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const { Icon, title, description, color } = feature;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-cyan-500/50 transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-lg ${color} flex items-center justify-center mb-4`}
                >
                  <Icon className="text-white" size={28} strokeWidth={2} />
                </motion.div>
                <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
                <p className="text-gray-400 text-sm">{description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;