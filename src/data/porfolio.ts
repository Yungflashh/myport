import type { Project, Skill, SocialLink } from  "../types"


export const projects: Project[] = [
  {
    id: 1,
    title: "AI SaaS Platform",
    description: "Full-stack AI-powered SaaS application with real-time data processing and advanced analytics dashboard.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    technologies: ["React", "Node.js", "PostgreSQL", "OpenAI", "AWS"],
    github: "https://github.com",
    live: "https://demo.com",
    gradient: "from-purple-500 via-pink-500 to-red-500"
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with payment integration, real-time inventory, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind"],
    github: "https://github.com",
    live: "https://demo.com",
    gradient: "from-cyan-500 via-blue-500 to-purple-500"
  },
  {
    id: 3,
    title: "Real-Time Chat App",
    description: "WebSocket-based chat application with end-to-end encryption and file sharing capabilities.",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80",
    technologies: ["React", "Socket.io", "Express", "Redis", "Docker"],
    github: "https://github.com",
    live: "https://demo.com",
    gradient: "from-green-500 via-teal-500 to-cyan-500"
  },
  {
    id: 4,
    title: "Blockchain DApp",
    description: "Decentralized application for NFT marketplace with smart contracts and Web3 integration.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    technologies: ["React", "Solidity", "Ethers.js", "IPFS", "Hardhat"],
    github: "https://github.com",
    live: "https://demo.com",
    gradient: "from-orange-500 via-red-500 to-pink-500"
  }
];

export const skills: Skill[] = [
  { name: "React", level: 95, icon: "⚛️", color: "from-cyan-400 to-blue-500" },
  { name: "TypeScript", level: 90, icon: "📘", color: "from-blue-400 to-indigo-500" },
  { name: "Node.js", level: 88, icon: "🟢", color: "from-green-400 to-emerald-500" },
  { name: "Python", level: 85, icon: "🐍", color: "from-yellow-400 to-green-500" },
  { name: "PostgreSQL", level: 82, icon: "🐘", color: "from-blue-500 to-purple-500" },
  { name: "AWS", level: 80, icon: "☁️", color: "from-orange-400 to-red-500" },
  { name: "Docker", level: 83, icon: "🐳", color: "from-cyan-500 to-blue-600" },
  { name: "GraphQL", level: 78, icon: "🎯", color: "from-pink-500 to-purple-500" }
];

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
  { name: "Email", url: "mailto:dev@example.com", icon: "mail" }
];