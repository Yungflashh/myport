import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { Send, Mail, MapPin, Phone, CheckCircle, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '2349058949877';
const WHATSAPP_MESSAGE = encodeURIComponent('Hi, I want to work with you. I got referred from your portfolio.');
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm("xkoqqrlz");

  const contactInfo = [
    { Icon: Mail, text: "kayodeadenusi29@gmail.com", href: "mailto:kayodeadenusi29@gmail.com" },
    { Icon: Phone, text: "+2349058949877", href: "tel:+2349058949877" },
    { Icon: MapPin, text: "Lagos", href: "#" }
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 bg-navy">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 text-cream">
            Get In Touch
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className="text-cream-muted text-sm sm:text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's create something amazing together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {state.succeeded ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-accent/20"
                  style={{ backgroundColor: 'rgba(36, 36, 69, 0.5)', backdropFilter: 'blur(8px)' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle size={56} className="text-accent mb-6" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-cream mb-3">Thank You!</h3>
                  <p className="text-cream-dim text-base sm:text-lg mb-2">
                    Your message has been sent successfully.
                  </p>
                  <p className="text-cream-muted text-sm sm:text-base">
                    I'll review your message and reach out to you shortly. Looking forward to connecting!
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5 sm:space-y-6"
                >
                  <div>
                    <label htmlFor="name" className="block text-cream-dim mb-2 text-sm sm:text-base font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-navy-light border border-cream/10 text-cream placeholder-cream-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs sm:text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-cream-dim mb-2 text-sm sm:text-base font-medium">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-navy-light border border-cream/10 text-cream placeholder-cream-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                      placeholder="john@example.com"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs sm:text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-cream-dim mb-2 text-sm sm:text-base font-medium">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-navy-light border border-cream/10 text-cream placeholder-cream-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none text-sm sm:text-base"
                      placeholder="Tell me about your project..."
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs sm:text-sm mt-1" />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={state.submitting}
                    className="w-full py-3.5 sm:py-4 rounded-lg bg-accent text-navy font-semibold flex items-center justify-center gap-2 shadow-lg shadow-accent/20 hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {state.submitting ? 'Sending...' : 'Send Message'}
                    <Send size={18} />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="p-6 sm:p-8 rounded-2xl border border-cream/5" style={{ backgroundColor: 'rgba(36, 36, 69, 0.5)', backdropFilter: 'blur(8px)' }}>
              <h3 className="text-xl sm:text-2xl font-bold text-cream mb-5 sm:mb-6">Contact Information</h3>

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
                    className="flex items-center gap-3 sm:gap-4 text-cream-dim hover:text-accent transition-colors text-sm sm:text-base"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-accent sm:hidden" />
                      <Icon size={20} className="text-accent hidden sm:block" />
                    </div>
                    <span className="break-all">{text}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-6 sm:p-8 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all"
              style={{ backgroundColor: 'rgba(36, 36, 69, 0.5)', backdropFilter: 'blur(8px)' }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500/15 flex items-center justify-center shrink-0">
                <MessageCircle size={24} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-cream mb-1">Chat on WhatsApp</h3>
                <p className="text-cream-muted text-xs sm:text-sm">Quick response guaranteed</p>
              </div>
            </motion.a>

            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(207, 92, 54, 0.1)',
                  '0 0 40px rgba(207, 92, 54, 0.2)',
                  '0 0 20px rgba(207, 92, 54, 0.1)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="p-6 sm:p-8 rounded-2xl border border-accent/20"
              style={{ backgroundColor: 'rgba(36, 36, 69, 0.5)', backdropFilter: 'blur(8px)' }}
            >
              <h3 className="text-lg sm:text-xl font-bold text-cream mb-2 sm:mb-3">Available for Freelance</h3>
              <p className="text-cream-muted text-sm sm:text-base">
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
          className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-cream/5 text-center text-cream-muted text-xs sm:text-sm"
        >
          <p>&copy; {new Date().getFullYear()} Yungflash</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
