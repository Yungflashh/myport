import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI SaaS Platform",
    description: "Full-stack AI-powered SaaS application with real-time data processing, advanced analytics dashboard, and machine learning integration for predictive insights.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    technologies: ["React", "Node.js", "PostgreSQL", "OpenAI", "AWS"],
    github: "https://github.com",
    live: "https://soya-ai-blue.vercel.app",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with seamless payment integration, real-time inventory management, comprehensive admin dashboard, and advanced analytics.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind"],
    github: "https://github.com",
    live: "https://digitalProducts.vendorspotng.com",
  },
  {
    id: 3,
    title: "SharpLook Mobile App",
    description: "WebSocket-based service rendering mobile application, featuring escrow services for clients to vendors with real-time updates.",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80",
    technologies: ["React Native", "Socket.io", "Express", "Redis"],
    github: "https://github.com",
    live: "https://demo.com",
  },
  {
    id: 4,
    title: "Blockchain DApp",
    description: "Decentralized application for NFT marketplace with smart contracts, Web3 integration, IPFS storage, and seamless cryptocurrency transactions.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    technologies: ["React", "Solidity", "Ethers.js", "IPFS", "Hardhat"],
    github: "https://github.com",
    live: "https://demo.com",
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="px-4 sm:px-6 py-20 sm:py-28 bg-navy">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-cream">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-cream-muted text-base md:text-lg max-w-xl mx-auto">
            A selection of things I've built recently
          </p>
        </motion.div>

        {/* Project List */}
        <div className="space-y-20">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  !isEven ? 'lg:direction-rtl' : ''
                }`}
              >
                {/* Image */}
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

                  {/* Image overlay on hover */}
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center gap-4">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        initial={{ y: 10, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/20 flex items-center justify-center text-cream hover:bg-cream/20 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={20} />
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        initial={{ y: 10, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center text-accent hover:bg-accent/30 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    )}
                  </div>

                  {/* Subtle border */}
                  <div className="absolute inset-0 rounded-xl border border-cream/5 group-hover:border-accent/20 transition-colors pointer-events-none" />
                </motion.div>

                {/* Content */}
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

                  <div className={`flex flex-wrap gap-2 ${!isEven ? 'lg:justify-end' : ''}`}>
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-accent/8 text-accent/80 border border-accent/10 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={`flex items-center gap-4 pt-2 ${!isEven ? 'lg:justify-end' : ''}`}>
                    {project.github && (
                      <a
                        href={project.github}
                        className="flex items-center gap-2 text-sm text-cream-muted hover:text-accent transition-colors"
                      >
                        <Github size={18} />
                        <span>Source</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
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
        </div>
      </div>
    </section>
  );
};

export default Projects;
