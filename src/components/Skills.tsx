import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Zap, FileCode, Database, Cloud, Container, GitBranch, Smartphone, Palette, Grid3x3, HardDrive } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: any;
  color: string;
  category: string;
  description: string;
  yearsExp: number;
  projects: number;
}

const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skills: Skill[] = [
    { 
      name: "React", 
      level: 95, 
      icon: Code, 
      color: "text-cyan-500",
      category: "Frontend",
      description: "Building modern, scalable web applications with React hooks and state management",
      yearsExp: 3,
      projects: 10
    },
    { 
      name: "TypeScript", 
      level: 90, 
      icon: FileCode, 
      color: "text-blue-500",
      category: "Language",
      description: "Type-safe development with advanced TypeScript features and patterns",
      yearsExp: 3,
      projects: 10
    },
    { 
      name: "Node.js", 
      level: 88, 
      icon: Zap, 
      color: "text-green-500",
      category: "Backend",
      description: "Server-side JavaScript with Express, REST APIs, and microservices",
      yearsExp: 3,
      projects: 8
    },
    { 
      name: "Python", 
      level: 50, 
      icon: Code, 
      color: "text-yellow-500",
      category: "Language",
      description: "Data processing, automation, and backend development with Python",
      yearsExp: 1,
      projects: 4
    },
    { 
      name: "PostgreSQL", 
      level: 50, 
      icon: Database, 
      color: "text-indigo-500",
      category: "Database",
      description: "Advanced SQL queries, optimization, and database design",
      yearsExp: 1,
      projects: 2
    },
    { 
      name: "AWS", 
      level: 20, 
      icon: Cloud, 
      color: "text-orange-500",
      category: "Cloud",
      description: "Cloud infrastructure, serverless, and DevOps with AWS services",
      yearsExp: 1,
      projects: 2
    },
    { 
      name: "Docker", 
      level: 20, 
      icon: Container, 
      color: "text-blue-600",
      category: "DevOps",
      description: "Containerization, orchestration, and deployment automation",
      yearsExp: 1,
      projects: 1
    },
    { 
      name: "GraphQL", 
      level: 50, 
      icon: GitBranch, 
      color: "text-pink-500",
      category: "API",
      description: "Modern API design with GraphQL queries, mutations, and subscriptions",
      yearsExp: 1,
      projects: 1
    },
    { 
      name: "React Native", 
      level: 85, 
      icon: Smartphone, 
      color: "text-cyan-600",
      category: "Mobile",
      description: "Cross-platform mobile development with React Native for iOS and Android",
      yearsExp: 2,
      projects: 5
    },
    { 
      name: "Tailwind CSS", 
      level: 92, 
      icon: Palette, 
      color: "text-teal-500",
      category: "Styling",
      description: "Utility-first CSS framework for rapid UI development and responsive design",
      yearsExp: 3,
      projects: 10
    },
    { 
      name: "Bootstrap", 
      level: 80, 
      icon: Grid3x3, 
      color: "text-purple-500",
      category: "Styling",
      description: "Responsive web design with Bootstrap components and grid system",
      yearsExp: 4,
      projects: 10
    },
    { 
      name: "SQLite", 
      level: 50, 
      icon: HardDrive, 
      color: "text-blue-400",
      category: "Database",
      description: "Lightweight embedded database for mobile and desktop applications",
      yearsExp: 1,
      projects: 2
    }
  ];

  const getHexPosition = (index: number, total: number) => {
    if (index === 0) return { x: 0, y: 0 };
    
    const angle = (index - 1) * (360 / (total - 1)) * (Math.PI / 180);
    const radius = 180;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  const getExperienceLevel = (years: number) => {
    if (years >= 4) return 'Expert';
    if (years >= 3) return 'Advanced';
    if (years >= 2) return 'Intermediate';
    return 'Beginner';
  };

  const getBgColor = (textColor: string) => {
    return textColor.replace('text-', 'bg-');
  };

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative overflow-hidden bg-gray-950">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
            className="inline-block mb-6"
          >
            <Zap className="text-cyan-500" size={isMobile ? 48 : 60} />
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white px-4">
            Skills & Expertise
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-cyan-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 px-4">
            {isMobile ? "Tap any skill to explore" : "Interactive skill tree - Click or hover to explore each technology"}
          </p>
          
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mx-4"
          >
            <span className="text-cyan-400 text-xs sm:text-sm">
              {isMobile ? "Tap any skill to learn more" : "Click any skill node to learn more"}
            </span>
          </motion.div>
        </motion.div>

        {isMobile ? (
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-16">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              const bgColor = getBgColor(skill.color);
              
              return (
                <motion.div
                  key={skill.name}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.05, 
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSkill(skill)}
                  className="cursor-pointer"
                >
                  <div className="relative w-full aspect-square">
                    <div className="absolute inset-0 bg-gray-800 rounded-2xl shadow-lg shadow-cyan-500/20" />

                    <div className="absolute inset-1 bg-gray-900 rounded-2xl flex flex-col items-center justify-center gap-1 p-2">
                      <Icon className={skill.color} size={24} strokeWidth={2} />
                      <div className="text-[9px] font-bold text-white text-center leading-tight">
                        {skill.name}
                      </div>
                    </div>

                    <svg className="absolute inset-0 -m-2 w-[calc(100%+16px)] h-[calc(100%+16px)]" style={{ transform: 'rotate(-90deg)' }}>
                      <motion.circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="rgba(6, 182, 212, 0.2)"
                        strokeWidth="2"
                      />
                      <motion.circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: skill.level / 100 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 + 0.3, duration: 1, ease: "easeOut" }}
                        style={{
                          strokeDasharray: '1000',
                        }}
                      />
                    </svg>

                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 + 0.5 }}
                      className={`absolute -bottom-1 -right-1 w-7 h-7 text-[10px] rounded-full ${bgColor} flex items-center justify-center font-bold text-white shadow-lg`}
                    >
                      {skill.level}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="relative flex items-center justify-center min-h-[600px]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {skills.slice(1).map((_, index) => {
                const pos = getHexPosition(index + 1, skills.length);
                return (
                  <motion.line
                    key={index}
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${pos.x}px)`}
                    y2={`calc(50% + ${pos.y}px)`}
                    stroke="#06b6d4"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                  />
                );
              })}
            </svg>

            <div className="relative" style={{ width: '600px', height: '600px' }}>
              {skills.map((skill, index) => {
                const pos = getHexPosition(index, skills.length);
                const isCenter = index === 0;
                const Icon = skill.icon;
                const bgColor = getBgColor(skill.color);
                
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.15, 
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${pos.x}px)`,
                      top: `calc(50% + ${pos.y}px)`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative cursor-pointer ${isCenter ? 'w-32 h-32' : 'w-24 h-24'}`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gray-800 rounded-2xl"
                        animate={{
                          rotate: hoveredIndex === index ? [0, 360] : 0,
                          boxShadow: hoveredIndex === index 
                            ? ['0 0 20px rgba(6, 182, 212, 0.5)', '0 0 40px rgba(6, 182, 212, 0.8)', '0 0 20px rgba(6, 182, 212, 0.5)']
                            : '0 0 10px rgba(6, 182, 212, 0.3)'
                        }}
                        transition={{ 
                          rotate: { duration: 2 },
                          boxShadow: { duration: 2, repeat: Infinity }
                        }}
                      />

                      <div className="absolute inset-1 bg-gray-900 rounded-2xl flex flex-col items-center justify-center gap-1">
                        <motion.div
                          animate={{ 
                            rotate: hoveredIndex === index ? [0, 360] : 0,
                            scale: hoveredIndex === index ? [1, 1.2, 1] : 1
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className={skill.color} size={isCenter ? 40 : 28} strokeWidth={2} />
                        </motion.div>
                        <div className={`${isCenter ? 'text-sm' : 'text-xs'} font-bold text-white text-center px-1`}>
                          {skill.name}
                        </div>
                      </div>

                      <svg className="absolute inset-0 -m-2 w-[calc(100%+16px)] h-[calc(100%+16px)]" style={{ transform: 'rotate(-90deg)' }}>
                        <motion.circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          fill="none"
                          stroke="rgba(6, 182, 212, 0.2)"
                          strokeWidth="2"
                        />
                        <motion.circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: skill.level / 100 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + 0.5, duration: 1.5, ease: "easeOut" }}
                          style={{
                            strokeDasharray: '1000',
                          }}
                        />
                      </svg>

                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 1 }}
                        className={`absolute -bottom-2 -right-2 ${isCenter ? 'w-10 h-10 text-sm' : 'w-8 h-8 text-xs'} rounded-full ${bgColor} flex items-center justify-center font-bold text-white shadow-lg`}
                      >
                        {skill.level}
                      </motion.div>

                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.div
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ scale: 1, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute inset-0 bg-cyan-500/30 rounded-2xl"
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-lg w-full rounded-2xl bg-gray-800 border-2 border-cyan-500"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      {React.createElement(selectedSkill.icon, { 
                        className: selectedSkill.color, 
                        size: isMobile ? 48 : 60,
                        strokeWidth: 2 
                      })}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{selectedSkill.name}</h3>
                      <p className="text-cyan-400 font-medium text-sm sm:text-base">{selectedSkill.category}</p>
                    </div>
                    <button
                      onClick={() => setSelectedSkill(null)}
                      className="text-gray-400 hover:text-white text-xl sm:text-2xl"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {selectedSkill.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400 text-xs sm:text-sm">Proficiency Level</span>
                      <span className="text-white font-bold text-xs sm:text-sm">{selectedSkill.level}%</span>
                    </div>
                    <div className="h-2 sm:h-3 bg-gray-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-cyan-500 rounded-full relative"
                      >
                        <motion.div
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-white/20"
                        />
                      </motion.div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
                    <div className="text-center p-2 sm:p-3 rounded-xl bg-gray-900 border border-gray-700">
                      <div className="text-xl sm:text-2xl font-bold text-white">{selectedSkill.yearsExp}</div>
                      <div className="text-[10px] sm:text-xs text-gray-400">Years</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 rounded-xl bg-gray-900 border border-gray-700">
                      <div className="text-xs sm:text-base font-bold text-white">{getExperienceLevel(selectedSkill.yearsExp)}</div>
                      <div className="text-[10px] sm:text-xs text-gray-400">Level</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 rounded-xl bg-gray-900 border border-gray-700">
                      <div className="text-xl sm:text-2xl font-bold text-white">{selectedSkill.projects}+</div>
                      <div className="text-[10px] sm:text-xs text-gray-400">Projects</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="mt-16 sm:mt-20 flex flex-wrap gap-2 sm:gap-4 justify-center px-4"
        >
          {Array.from(new Set(skills.map(s => s.category))).map((category, i) => (
            <motion.div
              key={category}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 + i * 0.1 }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs sm:text-sm"
            >
              {category}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </section>
  );
};

export default Skills;