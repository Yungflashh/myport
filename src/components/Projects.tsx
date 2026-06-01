import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Monitor, Smartphone } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'website' | 'mobile';
  live?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI SaaS Platform",
    description: "Full-stack AI-powered SaaS application with real-time data processing, advanced analytics dashboard, and machine learning integration for predictive insights.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    technologies: ["React", "Python", "Node.js", "PostgreSQL", "OpenAI", "AWS"],
    category: "website",
    live: "https://soya-ai-blue.vercel.app",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with seamless payment integration, real-time inventory management, comprehensive admin dashboard, and advanced analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind"],
    category: "website",
    live: "https://digitalProducts.vendorspotng.com",
  },
  {
    id: 3,
    title: "FlowPay",
    description: "Recurring payment web application that automates subscription billing, invoice management, and payment scheduling with seamless Paystack integration.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    technologies: ["Next.js", "TypeScript", "Paystack", "PostgreSQL", "Tailwind"],
    category: "website",
    live: "https://flowpay-khaki.vercel.app",
  },
  {
    id: 4,
    title: "LookReal Mobile App",
    description: "WebSocket-based service rendering mobile application, featuring escrow services for clients to vendors with real-time updates.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    technologies: ["React Native", "Socket.io", "Express", "Redis"],
    category: "mobile",
    live: "https://play.google.com/store/apps/details?id=com.inuud.sharplook",
  },
  {
    id: 5,
    title: "Ikorodu Market Fair",
    description: "Full-featured marketplace platform for the Ikorodu Market Fair event, connecting customers, merchants, and sponsors with registration, product listings, and event management.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Node.js", "MongoDB"],
    category: "website",
    live: "https://www.ikdmarketfair.com",
  },
  {
    id: 6,
    title: "Vaayak Equipments",
    description: "Corporate website for a premier integrated service provider powering Nigeria's Mining, Renewable Energy, and Oil & Gas sectors with strategic procurement and global partnerships.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Node.js"],
    category: "website",
    live: "https://www.vaayak.com",
  },
  {
    id: 7,
    title: "Vozia",
    description: "Smart PDF converter and study companion app that helps users convert documents, study efficiently, and organize their learning materials with AI-powered features.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    technologies: ["React Native", "Node.js", "Python", "Firebase"],
    category: "mobile",
    live: "https://play.google.com/store/apps/details?id=com.renbostudios.vozia",
  },
  {
    id: 8,
    title: "Gadget Vault",
    description: "Device verification app that helps users check if phones and gadgets are stolen, previously used, or flagged as risky before making a purchase.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    technologies: ["React Native", "Node.js", "Express", "MongoDB"],
    category: "mobile",
    live: "https://play.google.com/store/apps/details?id=com.gadgetvault",
  },
];

const categoryFilters = [
  { key: 'All', label: 'All', icon: null },
  { key: 'website', label: 'Websites', icon: Monitor },
  { key: 'mobile', label: 'Mobile Apps', icon: Smartphone },
];

const TechTags: React.FC<{ technologies: string[]; alignRight: boolean }> = ({ technologies, alignRight }) => {
  const [expanded, setExpanded] = useState(false);
  const MOBILE_LIMIT = 4;
  const hasMore = technologies.length > MOBILE_LIMIT;

  return (
    <div className={`flex flex-wrap gap-2 ${alignRight ? 'lg:justify-end' : ''}`}>
      {technologies.map((tech, i) => (
        <span
          key={tech}
          className={`px-3 py-1 text-xs rounded-full bg-accent/8 text-accent/80 border border-accent/10 font-medium ${
            !expanded && i >= MOBILE_LIMIT ? 'hidden sm:inline-block' : ''
          }`}
        >
          {tech}
        </span>
      ))}
      {hasMore && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="px-3 py-1 text-xs rounded-full bg-accent/15 text-accent border border-accent/20 font-medium sm:hidden"
        >
          +{technologies.length - MOBILE_LIMIT} more
        </button>
      )}
    </div>
  );
};

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="px-4 sm:px-6 py-20 sm:py-28 bg-navy">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-cream">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-cream-muted text-base md:text-lg max-w-xl mx-auto">
            A selection of things I've built recently
          </p>
          <p className="text-cream-muted/50 text-xs mt-3 max-w-md mx-auto">
            Note: Images shown are illustrative placeholders. Actual client screenshots are not displayed due to privacy policy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categoryFilters.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.key
                    ? 'bg-accent text-navy shadow-lg shadow-accent/20'
                    : 'bg-navy-light border border-cream/10 text-cream-dim hover:border-accent/40'
                }`}
              >
                {Icon && <Icon size={16} />}
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        <div className="space-y-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    !isEven ? 'lg:direction-rtl' : ''
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={`relative group rounded-xl overflow-hidden ${
                      !isEven ? 'lg:order-2' : ''
                    }`}
                  >
                    <div className="aspect-[16/10] overflow-hidden rounded-xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center gap-4">
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ y: 10, opacity: 0 }}
                          whileHover={{ scale: 1.1 }}
                          className="w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center text-accent hover:bg-accent/30 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      )}
                    </div>

                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-navy/80 backdrop-blur-sm border border-cream/10 text-cream-muted flex items-center gap-1.5">
                      {project.category === 'mobile' ? <Smartphone size={12} /> : <Monitor size={12} />}
                      {project.category === 'mobile' ? 'Mobile App' : 'Website'}
                    </div>

                    <div className="absolute inset-0 rounded-xl border border-cream/5 group-hover:border-accent/20 transition-colors pointer-events-none" />
                  </motion.div>

                  <div className={`space-y-5 ${!isEven ? 'lg:order-1 lg:text-right' : ''}`}>
                    <div>
                      <span className="text-accent text-sm font-medium tracking-wider uppercase">
                        Project {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-cream mt-2">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-cream-dim leading-relaxed">
                      {project.description}
                    </p>

                    <TechTags technologies={project.technologies} alignRight={!isEven} />

                    <div className={`flex items-center gap-4 pt-2 ${!isEven ? 'lg:justify-end' : ''}`}>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-cream-muted hover:text-accent transition-colors"
                        >
                          <ExternalLink size={18} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
