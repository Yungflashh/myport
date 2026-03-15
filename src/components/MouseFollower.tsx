import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MouseFollower: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      setIsMoving(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.05s, top 0.05s',
        }}
      >
        <motion.div
          animate={{
            scale: isMoving ? [1, 1.2, 1] : 1,
            opacity: isMoving ? [0.9, 1, 0.9] : 0.8,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 w-96 h-96 -ml-48 -mt-48"
          style={{
            background: 'radial-gradient(circle at center, rgba(240, 249, 255, 0.9) 0%, rgba(125, 211, 252, 0.7) 10%, rgba(56, 189, 248, 0.5) 20%, rgba(14, 165, 233, 0.3) 35%, transparent 60%)',
            filter: 'blur(2px)',
          }}
        />

        <motion.div
          animate={{
            scale: isMoving ? [1, 1.15, 1] : 1,
            rotate: [0, 360],
          }}
          transition={{ 
            rotate: { duration: 4, ease: "linear", repeat: Infinity },
            scale: { duration: 0.3 }
          }}
          className="absolute inset-0 w-[500px] h-[500px] -ml-[250px] -mt-[250px]"
          style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.5) 0%, rgba(30, 58, 138, 0.4) 20%, rgba(120, 113, 108, 0.3) 40%, transparent 65%)',
            filter: 'blur(20px)',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          className="absolute inset-0 w-[600px] h-[600px] -ml-[300px] -mt-[300px]"
          style={{
            background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.35) 0%, rgba(29, 78, 216, 0.25) 30%, rgba(161, 130, 98, 0.2) 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: 0,
              top: 0,
              background: `rgba(${i % 2 === 0 ? '59, 130, 246' : '161, 130, 98'}, 0.9)`,
              boxShadow: `0 0 15px rgba(${i % 2 === 0 ? '59, 130, 246' : '161, 130, 98'}, 0.8)`,
            }}
            animate={{
              x: [0, Math.cos((i * Math.PI) / 4) * 120],
              y: [0, Math.sin((i * Math.PI) / 4) * 120],
              opacity: [1, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div
        className="fixed pointer-events-none z-[60]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <motion.div
          animate={{
            scale: isMoving ? [1, 1.5, 1] : [1, 1.2, 1],
          }}
          transition={{ duration: 0.4, repeat: Infinity }}
          className="w-3 h-3 rounded-full bg-cyan-100"
          style={{
            boxShadow: '0 0 20px rgba(224, 242, 254, 0.9), 0 0 40px rgba(59, 130, 246, 0.7), 0 0 60px rgba(37, 99, 235, 0.5)',
          }}
        />
      </div>

      {[1, 2, 3].map((delay) => (
        <motion.div
          key={delay}
          className="fixed pointer-events-none z-40"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{
            type: "spring",
            stiffness: 100 - delay * 20,
            damping: 20 + delay * 5,
            mass: 0.5 + delay * 0.2,
          }}
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="w-[300px] h-[300px]"
            style={{
              background: `radial-gradient(circle at center, rgba(59, 130, 246, ${0.15 / delay}) 0%, rgba(30, 64, 175, ${0.1 / delay}) 30%, transparent 60%)`,
              filter: 'blur(40px)',
            }}
          />
        </motion.div>
      ))}

      <div
        className="fixed inset-0 pointer-events-none z-20"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(5, 8, 15, 0.88) 100%)`,
        }}
      />
    </>
  );
};

export default MouseFollower;