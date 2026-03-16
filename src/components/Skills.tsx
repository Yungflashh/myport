import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Zap, FileCode, Database, Cloud, Container, GitBranch, Smartphone, Palette, Grid3x3, HardDrive } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: any;
  category: string;
  description: string;
  yearsExp: number;
  projects: number;
}

const categories = [
  { key: 'All', label: 'All' },
  { key: 'Frontend', label: 'Frontend' },
  { key: 'Backend', label: 'Backend' },
  { key: 'Language', label: 'Languages' },
  { key: 'Database', label: 'Databases' },
  { key: 'Other', label: 'Other' },
];

const skills: Skill[] = [
  {
    name: "React",
    level: 95,
    icon: Code,
    category: "Frontend",
    description: "Building modern, scalable web applications with React hooks and state management",
    yearsExp: 4,
    projects: 10
  },
  {
    name: "Next.js",
    level: 90,
    icon: Zap,
    category: "Frontend",
    description: "Full-stack React framework with SSR, SSG, API routes, and optimized performance",
    yearsExp: 3,
    projects: 8
  },
  {
    name: "React Native",
    level: 85,
    icon: Smartphone,
    category: "Frontend",
    description: "Cross-platform mobile development with React Native for iOS and Android",
    yearsExp: 3,
    projects: 5
  },
  {
    name: "Tailwind CSS",
    level: 92,
    icon: Palette,
    category: "Frontend",
    description: "Utility-first CSS framework for rapid UI development and responsive design",
    yearsExp: 4,
    projects: 10
  },
  {
    name: "Bootstrap",
    level: 80,
    icon: Grid3x3,
    category: "Frontend",
    description: "Responsive web design with Bootstrap components and grid system",
    yearsExp: 4,
    projects: 10
  },
  {
    name: "HTML",
    level: 95,
    icon: Code,
    category: "Frontend",
    description: "Semantic HTML5 markup, accessibility best practices, and SEO-friendly structure",
    yearsExp: 5,
    projects: 20
  },
  {
    name: "CSS",
    level: 92,
    icon: Palette,
    category: "Frontend",
    description: "Modern CSS3, animations, Flexbox, Grid, and responsive design techniques",
    yearsExp: 5,
    projects: 20
  },
  {
    name: "JavaScript",
    level: 95,
    icon: FileCode,
    category: "Language",
    description: "Advanced JavaScript including ES6+, async patterns, and DOM manipulation",
    yearsExp: 5,
    projects: 20
  },
  {
    name: "TypeScript",
    level: 90,
    icon: FileCode,
    category: "Language",
    description: "Type-safe development with advanced TypeScript features and patterns",
    yearsExp: 4,
    projects: 10
  },
  {
    name: "Python",
    level: 65,
    icon: Code,
    category: "Language",
    description: "AI/ML development, data processing, automation, and backend APIs with Python and its ecosystem",
    yearsExp: 2,
    projects: 5
  },
  {
    name: "Pandas",
    level: 55,
    icon: Database,
    category: "Other",
    description: "Data manipulation, analysis, and transformation with Pandas DataFrames and Series",
    yearsExp: 1,
    projects: 3
  },
  {
    name: "FastAPI",
    level: 50,
    icon: Zap,
    category: "Backend",
    description: "High-performance Python web framework for building APIs with automatic documentation",
    yearsExp: 1,
    projects: 2
  },
  {
    name: "Flask",
    level: 55,
    icon: Code,
    category: "Backend",
    description: "Lightweight Python web framework for building REST APIs and microservices",
    yearsExp: 1,
    projects: 3
  },
  {
    name: "Node.js",
    level: 88,
    icon: Zap,
    category: "Backend",
    description: "Server-side JavaScript with Express, REST APIs, and microservices",
    yearsExp: 4,
    projects: 8
  },
  {
    name: "Prisma",
    level: 80,
    icon: Database,
    category: "Backend",
    description: "Type-safe ORM for Node.js and TypeScript with database migrations and schema management",
    yearsExp: 2,
    projects: 5
  },
  {
    name: "GraphQL",
    level: 50,
    icon: GitBranch,
    category: "Backend",
    description: "Modern API design with GraphQL queries, mutations, and subscriptions",
    yearsExp: 1,
    projects: 1
  },
  {
    name: "PostgreSQL",
    level: 70,
    icon: Database,
    category: "Database",
    description: "Advanced SQL queries, optimization, and database design",
    yearsExp: 2,
    projects: 5
  },
  {
    name: "MongoDB",
    level: 75,
    icon: Database,
    category: "Database",
    description: "NoSQL document database for flexible, scalable data storage and aggregation pipelines",
    yearsExp: 3,
    projects: 6
  },
  {
    name: "MySQL",
    level: 65,
    icon: Database,
    category: "Database",
    description: "Relational database management with optimized queries and schema design",
    yearsExp: 2,
    projects: 4
  },
  {
    name: "SQLite",
    level: 50,
    icon: HardDrive,
    category: "Database",
    description: "Lightweight embedded database for mobile and desktop applications",
    yearsExp: 1,
    projects: 2
  },
  {
    name: "AWS",
    level: 20,
    icon: Cloud,
    category: "Other",
    description: "Cloud infrastructure, serverless, and DevOps with AWS services",
    yearsExp: 1,
    projects: 2
  },
  {
    name: "Docker",
    level: 20,
    icon: Container,
    category: "Other",
    description: "Containerization, orchestration, and deployment automation",
    yearsExp: 1,
    projects: 1
  },
];

const MOBILE_SKILL_LIMIT = 4;

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const getExperienceLevel = (years: number) => {
    if (years >= 5) return 'Expert';
    if (years >= 3) return 'Advanced';
    if (years >= 2) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 sm:py-28 relative overflow-hidden bg-navy">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-cream">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-cream-muted text-base md:text-lg max-w-xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveCategory(cat.key); setShowAll(false); }}
              className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-accent text-navy shadow-lg shadow-accent/20'
                  : 'bg-navy-light border border-cream/10 text-cream-dim hover:border-accent/40'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, index) => {
              const hiddenOnMobile = !showAll && index >= MOBILE_SKILL_LIMIT;
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedSkill(skill)}
                  className={`group cursor-pointer p-5 rounded-xl border border-cream/5 hover:border-accent/30 transition-all duration-300 ${hiddenOnMobile ? 'hidden sm:block' : ''}`}
                  style={{ backgroundColor: 'rgba(36, 36, 69, 0.4)' }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors shrink-0">
                      <Icon className="text-accent" size={22} strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-cream">{skill.name}</h4>
                      <span className="text-xs text-cream-muted">{skill.category}</span>
                    </div>
                    <span className="text-sm font-bold text-accent">{skill.level}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1.5 bg-navy rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.05 + 0.3, ease: "easeOut" }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs text-cream-muted">
                    <span>{skill.yearsExp} {skill.yearsExp === 1 ? 'year' : 'years'}</span>
                    <span>{skill.projects}+ projects</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View more / less on mobile */}
        {filtered.length > MOBILE_SKILL_LIMIT && (
          <div className="mt-6 text-center sm:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 rounded-full text-sm font-medium bg-accent/15 text-accent border border-accent/20"
            >
              {showAll ? 'Show less' : `View all ${filtered.length} skills`}
            </motion.button>
          </div>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(26, 26, 46, 0.85)', backdropFilter: 'blur(12px)' }}
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-md w-full rounded-2xl border border-accent/20 p-7"
                style={{ backgroundColor: '#242445' }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                    {React.createElement(selectedSkill.icon, {
                      className: 'text-accent',
                      size: 28,
                      strokeWidth: 1.8,
                    })}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-cream">{selectedSkill.name}</h3>
                    <span className="text-accent text-sm">{selectedSkill.category}</span>
                  </div>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="text-cream-muted hover:text-cream text-xl leading-none"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-cream-dim text-sm leading-relaxed mb-6">
                  {selectedSkill.description}
                </p>

                <div className="mb-5">
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-cream-muted">Proficiency</span>
                    <span className="text-cream font-semibold">{selectedSkill.level}%</span>
                  </div>
                  <div className="h-2 bg-navy rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-accent rounded-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-xl bg-navy border border-cream/5">
                    <div className="text-xl font-bold text-cream">{selectedSkill.yearsExp}</div>
                    <div className="text-[11px] text-cream-muted mt-0.5">Years</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-navy border border-cream/5">
                    <div className="text-sm font-bold text-cream">{getExperienceLevel(selectedSkill.yearsExp)}</div>
                    <div className="text-[11px] text-cream-muted mt-0.5">Level</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-navy border border-cream/5">
                    <div className="text-xl font-bold text-cream">{selectedSkill.projects}+</div>
                    <div className="text-[11px] text-cream-muted mt-0.5">Projects</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(207, 92, 54, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(207, 92, 54, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>
    </section>
  );
};

export default Skills;
