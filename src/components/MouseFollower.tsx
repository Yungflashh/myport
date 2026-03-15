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
            background: 'radial-gradient(circle at center, rgba(207, 92, 54, 0.6) 0%, rgba(207, 92, 54, 0.4) 10%, rgba(207, 92, 54, 0.2) 25%, rgba(26, 26, 46, 0.1) 45%, transparent 60%)',
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
            background: 'radial-gradient(circle at center, rgba(207, 92, 54, 0.3) 0%, rgba(36, 36, 69, 0.3) 25%, rgba(26, 26, 46, 0.2) 45%, transparent 65%)',
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
            background: 'radial-gradient(circle at center, rgba(207, 92, 54, 0.2) 0%, rgba(36, 36, 69, 0.15) 35%, rgba(26, 26, 46, 0.1) 55%, transparent 70%)',
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
              background: `rgba(207, 92, 54, 0.9)`,
              boxShadow: `0 0 15px rgba(207, 92, 54, 0.8)`,
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
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: '#FDFFFC',
            boxShadow: '0 0 20px rgba(253, 255, 252, 0.9), 0 0 40px rgba(207, 92, 54, 0.7), 0 0 60px rgba(207, 92, 54, 0.5)',
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
              background: `radial-gradient(circle at center, rgba(207, 92, 54, ${0.1 / delay}) 0%, rgba(36, 36, 69, ${0.08 / delay}) 30%, transparent 60%)`,
              filter: 'blur(40px)',
            }}
          />
        </motion.div>
      ))}

      <div
        className="fixed inset-0 pointer-events-none z-20"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(26, 26, 46, 0.88) 100%)`,
        }}
      />
    </>
  );
};

export default MouseFollower;
