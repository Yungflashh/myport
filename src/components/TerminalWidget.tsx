import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type LineType = 'welcome' | 'input' | 'output' | 'error';

interface Line {
  type: LineType;
  text: string;
}

const WELCOME = `Yungflash Portfolio OS v1.0.0
Type 'help' to see available commands.
─────────────────────────────────────`;

const COMMANDS: Record<string, string> = {
  help: `Commands:
  help       → show this list
  whoami     → who is Yungflash?
  about      → background & bio
  skills     → top tech stack
  projects   → featured work
  contact    → get in touch
  hire       → let's work together
  social     → find me online
  clear      → clear terminal
  exit       → close terminal`,

  whoami: `Yungflash — Software Engineer based in Lagos, Nigeria.
I build fast, scalable, user-focused digital products.
4+ years of turning ideas into production-ready reality.`,

  about: `Name     : Adenusi Oluwakayode David
Alias    : Yungflash
Location : Lagos, Nigeria
Role     : Software Engineer / Freelancer
Stack    : React, Next.js, React Native, Node.js, TypeScript
Vibe     : Clean code. Fast products. Happy clients.`,

  skills: `Tech Stack:
  React / Next.js    ████████████████████  95%
  TypeScript         ██████████████████░░  90%
  Tailwind CSS       ██████████████████░░  92%
  React Native       █████████████████░░░  85%
  Node.js            █████████████████░░░  88%
  PostgreSQL / MongoDB ██████████████░░░░  70-75%`,

  projects: `Featured Projects:
  ▸ AI SaaS Platform    → soya-ai-blue.vercel.app
  ▸ FlowPay             → flowpay-khaki.vercel.app
  ▸ Vaayak Equipments   → vaayak.com
  ▸ Ikorodu Market Fair → ikdmarketfair.com
  ▸ LookReal App        → Play Store
  ▸ Vozia               → Play Store

Type 'hire' to discuss your project.`,

  contact: `Contact Info:
  📧  kayodeadenusi29@gmail.com
  📱  +2349058949877
  💬  WhatsApp available for quick chats

Scrolling to contact form...`,

  hire: `🚀 Excellent decision.

I'm currently available for:
  ▸ Freelance projects (web & mobile)
  ▸ Full-time / contract roles
  ▸ Technical consulting

Let's build something great together.
Redirecting to contact form...`,

  social: `Find me online:
  🐙  GitHub   → github.com/yungflashh
  💼  LinkedIn → linkedin.com/in/yungflash`,
};

const TerminalWidget = () => {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([{ type: 'welcome', text: WELCOME }]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const pushLine = (type: LineType, text: string) =>
    setLines(prev => [...prev, { type, text }]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    pushLine('input', `> ${raw.trim()}`);
    setCmdHistory(prev => [raw.trim(), ...prev]);
    setHistIdx(-1);

    if (cmd === 'clear') {
      setLines([{ type: 'welcome', text: WELCOME }]);
      return;
    }

    if (cmd === 'exit') {
      pushLine('output', 'Closing terminal...');
      setTimeout(() => setOpen(false), 600);
      return;
    }

    if (cmd === 'contact' || cmd === 'hire') {
      pushLine('output', COMMANDS[cmd]);
      setTimeout(() => {
        setOpen(false);
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 1400);
      return;
    }

    if (COMMANDS[cmd]) {
      pushLine('output', COMMANDS[cmd]);
    } else {
      pushLine('error', `command not found: ${cmd}\nType 'help' for available commands.`);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next] ?? '');
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(prev => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-6 left-6 z-[9999] w-[52px] h-[52px] rounded-full flex items-center justify-center font-mono font-bold text-sm border border-accent/30 text-accent shadow-lg shadow-accent/20"
        style={{ backgroundColor: 'rgba(26,26,46,0.92)', backdropFilter: 'blur(12px)' }}
        aria-label="Open terminal"
      >
        {'>_'}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-[76px] left-6 z-[9999] w-[min(420px,calc(100vw-3rem))] rounded-xl overflow-hidden shadow-2xl border border-cream/8"
            style={{ boxShadow: '0 0 40px rgba(207,92,54,0.15)' }}
          >
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ backgroundColor: '#242445' }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-cream-muted text-xs font-mono">
                yungflash@portfolio:~
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-cream-muted/50 hover:text-cream transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div
              className="h-72 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-2"
              style={{ backgroundColor: '#1a1a2e' }}
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div key={i}>
                  {line.type === 'welcome' && (
                    <pre className="text-accent/70 text-[10px] whitespace-pre-wrap">{line.text}</pre>
                  )}
                  {line.type === 'input' && (
                    <p className="text-accent">{line.text}</p>
                  )}
                  {line.type === 'output' && (
                    <pre className="text-cream-dim whitespace-pre-wrap">{line.text}</pre>
                  )}
                  {line.type === 'error' && (
                    <pre className="text-red-400 whitespace-pre-wrap">{line.text}</pre>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div
              className="flex items-center gap-2 px-4 py-2.5 border-t border-cream/5"
              style={{ backgroundColor: '#1e1e38' }}
            >
              <span className="text-accent font-mono text-xs shrink-0">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent text-cream font-mono text-xs outline-none placeholder-cream-muted/30 caret-accent"
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TerminalWidget;
