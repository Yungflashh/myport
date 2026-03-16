import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CODE_SNIPPETS = [
  // JavaScript
  'const app = express();',
  'async function fetchData() {',
  'return await res.json();',
  'export default App;',
  'useEffect(() => {}, []);',
  'const [state, setState] = useState();',
  'npm install react',
  'console.log("Hello World");',
  // TypeScript
  'interface User { id: number; }',
  'type Props = { children: ReactNode }',
  'const data: string[] = [];',
  // Python
  'def train_model(data):',
  'import pandas as pd',
  'print("training...")',
  'class APIView(View):',
  'return JsonResponse(data)',
  // Rust
  'fn main() {',
  'let mut vec = Vec::new();',
  'impl Display for App {',
  // Go
  'func main() {',
  'http.ListenAndServe(":8080")',
  'fmt.Println("server running")',
  // SQL
  'SELECT * FROM users',
  'CREATE TABLE orders (',
  'INSERT INTO products',
  // React/JSX
  '<div className="flex">',
  'return <Component />;',
  '{items.map((item) =>',
  // Solidity
  'contract Token is ERC20 {',
  'mapping(address => uint)',
  'function mint() public {',
  // CSS
  'display: flex;',
  'background: linear-gradient(',
  '@keyframes fadeIn {',
  // Shell
  'git commit -m "feat:"',
  'docker build -t app .',
  'ssh deploy@server',
  // HTML
  '<!DOCTYPE html>',
  '<meta charset="UTF-8">',
];

interface CodeLine {
  id: number;
  text: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const CodeRainBg = () => {
  const linesRef = useRef<CodeLine[]>([]);

  if (linesRef.current.length === 0) {
    linesRef.current = Array.from({ length: 45 }, (_, i) => ({
      id: i,
      text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      x: Math.random() * 95,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 20,
      size: 12 + Math.random() * 6,
      opacity: 0.08 + Math.random() * 0.14,
    }));
  }

  const lines = linesRef.current;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[15]">
      {lines.map((line) => (
        <motion.span
          key={line.id}
          className="absolute whitespace-nowrap font-mono text-accent"
          style={{
            left: `${line.x}%`,
            fontSize: `${line.size}px`,
            opacity: 0,
          }}
          animate={{
            y: ['-5vh', '105vh'],
            opacity: [0, line.opacity, line.opacity, 0],
          }}
          transition={{
            y: { duration: line.duration, repeat: Infinity, ease: 'linear', delay: line.delay },
            opacity: {
              duration: line.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: line.delay,
              times: [0, 0.1, 0.9, 1],
            },
          }}
        >
          {line.text}
        </motion.span>
      ))}
    </div>
  );
};

export default CodeRainBg;
