import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  live?: string;
  gradient: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  github,
  live,
  gradient,
  index
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -180, y: 50 }}
      whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      className="relative h-[500px] cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ 
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border-2 border-white/20 shadow-2xl"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
          whileHover={{ scale: 1.05, rotateZ: 2 }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)`
            }} />
          </div>

          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />

          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-lg" />

          <div className="relative h-full flex flex-col p-6">
            <div className="absolute top-6 right-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white text-xl shadow-lg`}
              >
                {index + 1}
              </motion.div>
            </div>

            <div className="relative flex-1 rounded-xl overflow-hidden mb-4 mt-8">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-30`} />
            </div>

            <h3 className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
              {title}
            </h3>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center text-cyan-400 text-sm font-medium mt-2"
            >
              Click to flip →
            </motion.div>
          </div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 backdrop-blur-sm border-2 border-cyan-400/50 shadow-2xl"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)`
            }} />
          </div>

          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`} />

          <div className="relative h-full flex flex-col p-8">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              {title}
            </h3>

            <p className="text-gray-300 text-center mb-6 leading-relaxed flex-1">
              {description}
            </p>

            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`px-3 py-1 text-sm rounded-full bg-gradient-to-r ${gradient} text-white font-medium shadow-lg`}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              {github && (
                <motion.a
                  href={github}
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Github size={20} />
                  <span>Code</span>
                </motion.a>
              )}
              {live && (
                <motion.a
                  href={live}
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${gradient} text-white font-semibold shadow-lg hover:shadow-xl transition-all`}
                >
                  <ExternalLink size={20} />
                  <span>Live</span>
                </motion.a>
              )}
            </div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center text-cyan-300 text-sm font-medium mt-6"
            >
              ← Click to flip back
            </motion.div>
          </div>

          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-lg" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;