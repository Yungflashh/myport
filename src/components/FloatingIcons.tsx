import { useMemo } from 'react';
import { motion } from 'framer-motion';

const techLabels = [
  'React', 'TypeScript', 'JavaScript', 'Python', 'HTML', 'CSS',
  'Node.js', 'Next.js', 'Supabase', 'Java', 'SQL', 'MongoDB',
  'Git', 'Docker', 'AWS', 'GraphQL', 'Tailwind', 'Redux',
  'Express', 'PostgreSQL', 'Firebase', 'REST API', 'Vite', 'npm',
  'React Native', 'Figma', 'Linux', 'Bash', 'JSON', 'Webpack',
  'SQLite', 'Redis', 'Stripe', 'Socket.io', 'SCSS', 'Bootstrap',
  'Vercel', 'Netlify', 'GitHub', 'VS Code', 'Solidity', 'Web3',
  'Prisma', 'Zustand', 'Framer Motion', 'IPFS', 'ESLint', 'Jest',
];

interface FloatingItem {
  id: number;
  label: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  rotate: number;
  opacity: number;
}

const FloatingIcons = () => {
  const items = useMemo<FloatingItem[]>(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      label: techLabels[i % techLabels.length],
      x: Math.random() * 92 + 4,
      y: Math.random() * 92 + 4,
      size: Math.random() * 5 + 11,
      duration: Math.random() * 18 + 22,
      delay: Math.random() * 12,
      driftX: (Math.random() - 0.5) * 160,
      driftY: (Math.random() - 0.5) * 160,
      rotate: (Math.random() - 0.5) * 20,
      opacity: Math.random() * 0.06 + 0.03,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[15]">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute font-mono font-bold text-accent select-none whitespace-nowrap"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}px`,
          }}
          animate={{
            x: [0, item.driftX, -item.driftX * 0.5, item.driftX * 0.3, 0],
            y: [0, -item.driftY, item.driftY * 0.4, -item.driftY * 0.25, 0],
            rotate: [0, item.rotate, -item.rotate * 0.5, item.rotate * 0.3, 0],
            opacity: [item.opacity, item.opacity * 2, item.opacity * 1.2, item.opacity * 1.6, item.opacity],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          {item.label}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
