import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "AI SaaS Platform",
      description: "Full-stack AI-powered SaaS application with real-time data processing, advanced analytics dashboard, and machine learning integration for predictive insights.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      technologies: ["React", "Node.js", "PostgreSQL", "OpenAI", "AWS"],
      github: "https://github.com",
      live: "https://soya-ai-blue.vercel.app",
      gradient: "from-blue-500 via-cyan-500 to-blue-600"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with seamless payment integration, real-time inventory management, comprehensive admin dashboard, and advanced analytics.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind"],
      github: "https://github.com",
      live: "https://digitalProducts.vendorspotng.com",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500"
    },
    {
      id: 3,
      title: "SharpLook Mobile App",
      description: "WebSocket-based Service rendering mobile Application, featuring escrow services, for Clients to Vendor",
      image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80",
      technologies: ["React Native", "Socket.io", "Express", "Redis"],
      github: "https://github.com",
      live: "https://demo.com",
      gradient: "from-green-500 via-teal-500 to-cyan-500"
    },
    {
      id: 4,
      title: "Blockchain DApp",
      description: "Decentralized application for NFT marketplace with smart contracts, Web3 integration, IPFS storage, and seamless cryptocurrency transactions.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      technologies: ["React", "Solidity", "Ethers.js", "IPFS", "Hardhat"],
      github: "https://github.com",
      live: "https://demo.com",
      gradient: "from-orange-500 via-amber-500 to-yellow-500"
    }
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <span className="text-6xl">🃏</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Click any card to flip and explore the details
          </p>
          
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/30"
          >
            <span className="text-cyan-400">⚡</span>
            <span className="text-gray-300 text-sm">Interactive Card Deck</span>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm">
            💡 Pro tip: Click on any card to reveal more information
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;