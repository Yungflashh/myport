import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Terminal, Gauge, Layers, Users, Download, Briefcase, Calendar, MapPin } from 'lucide-react';
import myImg from "../assets/my_img.jpeg"
import myImg2 from "../assets/my_img2.jpeg"

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Completed' },
  { value: '10+', label: 'Happy Clients' },
  { value: '15+', label: 'Technologies' },
];

const features = [
  {
    Icon: Terminal,
    title: "Clean Code",
    description: "Writing maintainable, scalable code that follows industry best practices and design patterns.",
  },
  {
    Icon: Gauge,
    title: "Fast Performance",
    description: "Optimized solutions engineered for lightning-fast load times and smooth user experiences.",
  },
  {
    Icon: Layers,
    title: "Modern Tech",
    description: "Leveraging cutting-edge technologies, frameworks, and tools to build future-proof solutions.",
  },
  {
    Icon: Users,
    title: "User Focused",
    description: "Designing intuitive, accessible interfaces that users genuinely enjoy interacting with.",
  },
];

const About = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const images = [
    { src: myImg, alt: "Developer workspace" },
    { src: myImg2, alt: "Developer portrait" },
  ];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative px-4 sm:px-6 py-24 sm:py-32 bg-navy overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] pointer-events-none" style={{ backgroundColor: 'rgba(207, 92, 54, 0.04)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-accent text-sm font-medium tracking-widest uppercase mb-4"
          >
            Get to know me
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-cream mb-6">
            About <span className="text-accent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center mb-24">
          <motion.div
            style={{ y: imageY }}
            className="lg:col-span-2 relative"
          >
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative group"
            >
              <div className="absolute -inset-3 rounded-2xl border border-accent/20 -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
              <div className="absolute -inset-3 rounded-2xl border border-accent/10 rotate-2 group-hover:rotate-0 transition-transform duration-500" />

              <div
                className="relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
                onMouseEnter={() => setIsRevealed(true)}
                onMouseLeave={() => setIsRevealed(false)}
                onClick={() => setIsRevealed((prev) => !prev)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={images[currentImage].src}
                    alt={images[currentImage].alt}
                    initial={{ opacity: 0, scale: 1.1, filter: 'blur(12px)' }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: isRevealed ? 'blur(0px)' : 'blur(12px)',
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60" />

                <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevImage}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-cream border border-cream/20"
                    style={{ backgroundColor: 'rgba(26, 26, 46, 0.7)', backdropFilter: 'blur(8px)' }}
                  >
                    <ChevronLeft size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextImage}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-cream border border-cream/20"
                    style={{ backgroundColor: 'rgba(26, 26, 46, 0.7)', backdropFilter: 'blur(8px)' }}
                  >
                    <ChevronRight size={20} />
                  </motion.button>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentImage
                          ? 'bg-accent w-8'
                          : 'bg-cream/40 w-4 hover:bg-cream/60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-5 -right-5 px-5 py-3 rounded-xl border border-accent/30 shadow-xl"
                style={{ backgroundColor: 'rgba(26, 26, 46, 0.9)', backdropFilter: 'blur(16px)' }}
              >
                <div className="text-2xl font-bold text-accent">4+</div>
                <div className="text-xs text-cream-muted">Years Exp.</div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: contentY }}
            className="lg:col-span-3 space-y-7"
          >
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-cream leading-tight">
                Building Digital <br />
                <span className="text-accent">Excellence</span>
              </h3>

              <div className="space-y-4 text-cream-dim leading-relaxed">
                <p>
                  As a software engineer, I thrive on the challenge of transforming ideas into functional applications that make a difference in people's lives. My journey began with a fascination for technology and problem-solving, and now I enjoy crafting elegant code that not only meets user needs but also enhances their experiences.
                </p>
                <p>
                  Collaborating with diverse teams, I dive deep into understanding requirements, always aiming to create innovative solutions that are both efficient and user-friendly. Continuous learning is a core part of my life, as I stay updated with the latest technologies and trends.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { Icon: MapPin, text: 'Lagos, Nigeria' },
                  { Icon: Briefcase, text: 'Freelancer' },
                  { Icon: Calendar, text: '4+ Years' },
                ].map(({ Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cream/8 text-sm text-cream-dim"
                    style={{ backgroundColor: 'rgba(36, 36, 69, 0.4)' }}
                  >
                    <Icon size={14} className="text-accent" />
                    {text}
                  </div>
                ))}
              </div>

              <motion.div className="pt-2">
                <motion.a
                  href="/Adenusi_Oluwakayode_David_CV.pdf"
                  download
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(207, 92, 54, 0.25)' }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-accent text-cream font-semibold hover:brightness-110 transition-all shadow-lg shadow-accent/15"
                >
                  <Download size={18} />
                  Download Resume
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, borderColor: 'rgba(207, 92, 54, 0.4)' }}
              className="text-center py-8 px-4 rounded-xl border border-cream/5 transition-all"
              style={{ backgroundColor: 'rgba(36, 36, 69, 0.3)' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                className="text-4xl sm:text-5xl font-bold text-accent mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-cream-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-cream mb-3">
            What I <span className="text-accent">Bring</span>
          </h3>
          <p className="text-cream-muted max-w-lg mx-auto text-sm">
            Core principles that guide every project I take on
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => {
            const { Icon, title, description } = feature;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group relative p-6 rounded-xl border border-cream/5 hover:border-accent/30 transition-all duration-300 overflow-hidden"
                style={{ backgroundColor: 'rgba(36, 36, 69, 0.35)' }}
              >
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.03] transition-colors duration-500 rounded-xl" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="text-accent" size={26} strokeWidth={1.8} />
                  </div>
                  <h4 className="text-lg font-bold text-cream mb-2">{title}</h4>
                  <p className="text-cream-muted text-sm leading-relaxed">{description}</p>
                </div>

                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-bl-xl">
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-accent/5 rotate-45 group-hover:bg-accent/10 transition-colors duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
