import { motion } from "motion/react";
import { ArrowDown, ArrowUp, Github, Linkedin, Briefcase, Mail, Code } from "lucide-react";
import { GITHUB_USERNAME, LINKEDIN_URL, UPWORK_URL, EMAIL_ADDRESS } from "../data";

export default function Footer() {
  const EASE_SMOOTH = [0.16, 1, 0.3, 1];

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    { name: "GitHub", href: `https://github.com/${GITHUB_USERNAME}`, icon: <Github className="w-4 h-4" /> },
    { name: "LinkedIn", href: LINKEDIN_URL, icon: <Linkedin className="w-4 h-4" /> },
    { name: "Upwork", href: UPWORK_URL, icon: <Briefcase className="w-4 h-4" /> },
    { name: "Email", href: `mailto:${EMAIL_ADDRESS}`, icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <footer className="py-12 bg-brand-bg px-6 md:px-12 border-t border-brand-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Branding copyright */}
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-brand-card border border-brand-border text-brand-text">
            <Code className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-mono text-brand-muted uppercase">
            © 2026 MUHASIN. RAG & MLOps Systems.
          </span>
        </div>

        {/* Social anchors list */}
        <div className="flex items-center gap-5">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full border border-brand-border bg-brand-card/30 hover:bg-brand-card text-brand-muted hover:text-brand-text transition-all duration-300 cursor-pointer"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Back-to-top button */}
        <motion.button
          whileHover={{ y: -3 }}
          onClick={handleBackToTop}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-border bg-brand-card/40 hover:bg-brand-card text-brand-text text-xs font-semibold cursor-pointer transition-all"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 animate-pulse" />
        </motion.button>

      </div>
    </footer>
  );
}
