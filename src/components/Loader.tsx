import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onLoadComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);

  const codeLines = [
    '> Initializing portfolio...',
    '> Loading dependencies...',
    '> npm install @yungflash/awesome',
    '> Compiling components...',
    '> [████████░░] 80%',
    '> Building experience...',
    '> Rendering creativity...',
    '> const developer = "Yungflash";',
    '> console.log(`Welcome ${developer}!`);',
    '> ✓ Portfolio ready!',
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onLoadComplete();
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    const lineInterval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev < codeLines.length) {
          setDisplayedCode(current => [...current, codeLines[prev]]);
          return prev + 1;
        }
        return prev;
      });
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
    };
  }, [onLoadComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400 font-mono text-xs"
            style={{ left: `${i * 5}%` }}
            animate={{
              y: ['-100%', '100vh'],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
          >
            {Array.from({ length: 20 }, () => 
              String.fromCharCode(33 + Math.floor(Math.random() * 94))
            ).join('\n')}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-4">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-t-lg border-b border-gray-700 px-4 py-3 flex items-center gap-2"
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-4 text-gray-400 text-sm font-mono">
            terminal - yungflash@portfolio:~
          </span>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900 rounded-b-lg p-6 shadow-2xl border border-gray-800 min-h-[400px] relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-cyan-400 font-mono text-xs md:text-sm leading-tight"
          >
            <pre className="text-center">
{`
██╗   ██╗██╗   ██╗███╗   ██╗ ██████╗ ███████╗██╗      █████╗ ███████╗██╗  ██╗
╚██╗ ██╔╝██║   ██║████╗  ██║██╔════╝ ██╔════╝██║     ██╔══██╗██╔════╝██║  ██║
 ╚████╔╝ ██║   ██║██╔██╗ ██║██║  ███╗█████╗  ██║     ███████║███████╗███████║
  ╚██╔╝  ██║   ██║██║╚██╗██║██║   ██║██╔══╝  ██║     ██╔══██║╚════██║██╔══██║
   ██║   ╚██████╔╝██║ ╚████║╚██████╔╝██║     ███████╗██║  ██║███████║██║  ██║
   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`}
            </pre>
          </motion.div>

          <div className="space-y-2 mb-6 font-mono text-sm">
            <AnimatePresence>
              {displayedCode.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-green-400">$</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: 'auto' }}
                    className={`overflow-hidden whitespace-nowrap ${
                      line.includes('✓') ? 'text-green-400' :
                      line.includes('const') || line.includes('console') ? 'text-blue-400' :
                      line.includes('Yungflash') ? 'text-cyan-400 font-bold' :
                      'text-gray-300'
                    }`}
                  >
                    {line}
                  </motion.span>
                  
                  {index === displayedCode.length - 1 && currentLine < codeLines.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="text-cyan-400"
                    >
                      ▋
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <motion.span
                animate={{ opacity: [0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-cyan-400 font-mono text-sm flex items-center gap-2"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  ⚙
                </motion.span>
                Loading Portfolio...
              </motion.span>
              <span className="text-green-400 font-mono text-sm font-bold">
                {progress}%
              </span>
            </div>

            <div className="relative h-6 bg-gray-800 rounded border border-gray-700 overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(6, 182, 212, 0.3) 2px, rgba(6, 182, 212, 0.3) 4px)`
              }} />

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  key={progress}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-white font-mono text-xs font-bold drop-shadow-lg"
                >
                  {'█'.repeat(Math.floor(progress / 5))}
                  {'░'.repeat(20 - Math.floor(progress / 5))}
                </motion.span>
              </div>
            </div>

            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-4 text-center text-gray-500 font-mono text-xs"
            >
              {progress < 30 && '[ Initializing modules... ]'}
              {progress >= 30 && progress < 60 && '[ Compiling components... ]'}
              {progress >= 60 && progress < 90 && '[ Building experience... ]'}
              {progress >= 90 && progress < 100 && '[ Almost ready... ]'}
              {progress === 100 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-400"
                >
                  ✓ Build successful! Launching...
                </motion.span>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 pt-4 border-t border-gray-800 flex flex-wrap gap-4 text-xs font-mono text-gray-600"
          >
            <span>⚡ React 18.2.0</span>
            <span>📘 TypeScript 5.0</span>
            <span>🎨 Tailwind CSS</span>
            <span>✨ Framer Motion</span>
          </motion.div>
        </motion.div>
      </div>

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-cyan-400/20 font-mono text-xs"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 20}%`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3
          }}
        >
          {['</>','{}','()','[]','//','=>','++','&&'][i]}
        </motion.div>
      ))}

      <div className="absolute top-8 left-8 text-cyan-400/30 text-6xl font-mono">{'<'}</div>
      <div className="absolute top-8 right-8 text-cyan-400/30 text-6xl font-mono">{'>'}</div>
      <div className="absolute bottom-8 left-8 text-cyan-400/30 text-6xl font-mono">{'{'}</div>
      <div className="absolute bottom-8 right-8 text-cyan-400/30 text-6xl font-mono">{'}'}</div>
    </motion.div>
  );
};

export default Loader;