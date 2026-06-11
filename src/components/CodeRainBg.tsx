import { useRef, useMemo } from 'react';

const CODE_SNIPPETS = [
  'const app = express();',
  'useEffect(() => {}, []);',
  'npm install react',
  'interface User { id: number; }',
  'def train_model(data):',
  'import pandas as pd',
  'fn main() {',
  'func main() {',
  'SELECT * FROM users',
  '<div className="flex">',
  'contract Token is ERC20 {',
  'git commit -m "feat:"',
  'docker build -t app .',
  '<!DOCTYPE html>',
  'async function fetchData() {',
  'return await res.json();',
  'const data: string[] = [];',
  'http.ListenAndServe(":8080")',
  'display: flex;',
  'ssh deploy@server',
];

const CodeRainBg = () => {
  const lines = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      text: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
      x: (i / 20) * 95 + Math.random() * 4,
      delay: Math.random() * 15,
      duration: 14 + Math.random() * 16,
      size: 11 + Math.random() * 5,
      opacity: 0.07 + Math.random() * 0.10,
    }))
  ).current;

  const styleTag = useMemo(() => {
    const keyframes = lines
      .map(
        (l) => `
@keyframes rain-${l.id} {
  0%   { transform: translateY(-5vh); opacity: 0; }
  8%   { opacity: ${l.opacity}; }
  88%  { opacity: ${l.opacity}; }
  100% { transform: translateY(105vh); opacity: 0; }
}`
      )
      .join('');
    return keyframes;
  }, [lines]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[15]">
      <style>{styleTag}</style>
      {lines.map((line) => (
        <span
          key={line.id}
          className="absolute whitespace-nowrap font-mono text-accent"
          style={{
            left: `${line.x}%`,
            fontSize: `${line.size}px`,
            opacity: 0,
            animation: `rain-${line.id} ${line.duration}s linear ${line.delay}s infinite`,
          }}
        >
          {line.text}
        </span>
      ))}
    </div>
  );
};

export default CodeRainBg;
