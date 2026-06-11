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
    '> Building experience...',
    '> Rendering creativity...',
    '> const developer = "Yungflash";',
    '> console.log(`Welcome ${developer}!`);',
    '> Portfolio ready!',
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onLoadComplete();
          }, 200);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    const lineInterval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev < codeLines.length) {
          setDisplayedCode(current => [...current, codeLines[prev]]);
          return prev + 1;
        }
        return prev;
      });
    }, 160);

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
      className="fixed inset-0 z-[100] bg-navy flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-accent font-mono text-xs"
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

      <div className="relative z-10 w-full max-w-4xl mx-3 sm:mx-4">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-t-lg border-b px-4 py-3 flex items-center gap-2"
          style={{ backgroundColor: '#242445', borderColor: 'rgba(253, 255, 252, 0.1)' }}
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 sm:ml-4 text-cream-muted text-xs sm:text-sm font-mono truncate">
            terminal - yungflash@portfolio:~
          </span>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-b-lg p-4 sm:p-6 shadow-2xl min-h-[350px] sm:min-h-[400px] relative overflow-hidden"
          style={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(253, 255, 252, 0.05)' }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-accent font-mono leading-tight overflow-hidden"
          >
            <pre className="text-center text-[0.45rem] sm:text-xs md:text-sm hidden sm:block">
{`██╗   ██╗██╗   ██╗███╗   ██╗ ██████╗ ███████╗██╗      █████╗ ███████╗██╗  ██╗
╚██╗ ██╔╝██║   ██║████╗  ██║██╔════╝ ██╔════╝██║     ██╔══██╗██╔════╝██║  ██║
 ╚████╔╝ ██║   ██║██╔██╗ ██║██║  ███╗█████╗  ██║     ███████║███████╗███████║
  ╚██╔╝  ██║   ██║██║╚██╗██║██║   ██║██╔══╝  ██║     ██╔══██║╚════██║██╔══██║
   ██║   ╚██████╔╝██║ ╚████║╚██████╔╝██║     ███████╗██║  ██║███████║██║  ██║
   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`}
            </pre>
            <h1 className="text-center text-3xl font-bold tracking-widest sm:hidden">YUNGFLASH</h1>
          </motion.div>

          <div className="space-y-1.5 sm:space-y-2 mb-6 font-mono text-xs sm:text-sm">
            <AnimatePresence>
              {displayedCode.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-accent">$</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: 'auto' }}
                    className={`overflow-hidden whitespace-nowrap ${
                      line.includes('ready') || line.includes('Ready') ? 'text-accent' :
                      line.includes('const') || line.includes('console') ? 'text-blue-400' :
                      line.includes('Yungflash') ? 'text-accent font-bold' :
                      'text-cream-dim'
                    }`}
                  >
                    {line}
                  </motion.span>

                  {index === displayedCode.length - 1 && currentLine < codeLines.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="text-accent"
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
                className="text-accent font-mono text-sm flex items-center gap-2"
              >
                Loading Portfolio...
              </motion.span>
              <span className="text-accent font-mono text-sm font-bold">
                {progress}%
              </span>
            </div>

            <div className="relative h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#242445' }}>
              <motion.div
                className="absolute inset-0 bg-accent rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>

            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-4 text-center text-cream-muted font-mono text-xs"
            >
              {progress < 30 && '[ Initializing modules... ]'}
              {progress >= 30 && progress < 60 && '[ Compiling components... ]'}
              {progress >= 60 && progress < 90 && '[ Building experience... ]'}
              {progress >= 90 && progress < 100 && '[ Almost ready... ]'}
              {progress === 100 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-accent"
                >
                  Build successful! Launching...
                </motion.span>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 pt-4 border-t border-cream/5 flex flex-wrap gap-4 text-xs font-mono text-cream-muted"
          >
            <span>React 19</span>
            <span>TypeScript 5</span>
            <span>Tailwind CSS</span>
            <span>Framer Motion</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 text-accent/20 text-3xl sm:text-6xl font-mono">{'<'}</div>
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 text-accent/20 text-3xl sm:text-6xl font-mono">{'>'}</div>
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 text-accent/20 text-3xl sm:text-6xl font-mono">{'{'}</div>
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 text-accent/20 text-3xl sm:text-6xl font-mono">{'}'}</div>
    </motion.div>
  );
};

export default Loader;
