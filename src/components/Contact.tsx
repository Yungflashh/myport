import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    { Icon: Mail, text: "kayodeadenusi29@gmail.com", href: "kayodeadenusi29@gmail.com" },
    { Icon: Phone, text: "+2349058949877", href: "tel:+2349058949877" },
    { Icon: MapPin, text: "Lagos", href: "#" }
  ];

  const socialLinks = [
    { Icon: Github, href: "https://github.com/yungflashh", label: "GitHub" },
    { Icon: Linkedin, href: "https://linkedin.com/kayodeadenusi", label: "LinkedIn" },
    { Icon: Twitter, href: "https://twitter.com", label: "Twitter" }
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20 bg-navy">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-cream">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className="text-cream-muted text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's create something amazing together!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-cream-dim mb-2 font-medium">
                  Your Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-navy-light border border-cream/10 text-cream placeholder-cream-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-cream-dim mb-2 font-medium">
                  Your Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-navy-light border border-cream/10 text-cream placeholder-cream-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-cream-dim mb-2 font-medium">
                  Your Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-navy-light border border-cream/10 text-cream placeholder-cream-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-4 rounded-lg bg-accent text-navy font-semibold flex items-center justify-center gap-2 shadow-lg shadow-accent/20 hover:brightness-110 transition-all"
              >
                Send Message
                <Send size={20} />
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="p-8 rounded-2xl border border-cream/5" style={{ backgroundColor: 'rgba(36, 36, 69, 0.5)', backdropFilter: 'blur(8px)' }}>
              <h3 className="text-2xl font-bold text-cream mb-6">Contact Information</h3>

              <div className="space-y-4">
                {contactInfo.map(({ Icon, text, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 text-cream-dim hover:text-accent transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <span>{text}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-cream/5" style={{ backgroundColor: 'rgba(36, 36, 69, 0.5)', backdropFilter: 'blur(8px)' }}>
              <h3 className="text-2xl font-bold text-cream mb-6">Follow Me</h3>

              <div className="flex gap-4">
                {socialLinks.map(({ Icon, href, label }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-all"
                    aria-label={label}
                  >
                    <Icon size={24} className="text-cream" />
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(207, 92, 54, 0.1)',
                  '0 0 40px rgba(207, 92, 54, 0.2)',
                  '0 0 20px rgba(207, 92, 54, 0.1)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="p-8 rounded-2xl border border-accent/20"
              style={{ backgroundColor: 'rgba(36, 36, 69, 0.5)', backdropFilter: 'blur(8px)' }}
            >
              <h3 className="text-xl font-bold text-cream mb-3">Available for Freelance</h3>
              <p className="text-cream-muted">
                I'm currently available for freelance work and exciting new projects. Let's discuss how we can work together!
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-8 border-t border-cream/5 text-center text-cream-muted"
        >
          <p>© 2024 Yungflash. Built with React, TypeScript & Framer Motion</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
