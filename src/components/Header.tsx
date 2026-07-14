import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Sparkles } from "lucide-react";

interface HeaderProps {
  isLight: boolean;
  toggleTheme: () => void;
  openAiAssistant: () => void;
}

export default function Header({ isLight, toggleTheme, openAiAssistant }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 50);

      // Disappear smoothly when scrolling down, reappear when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contributions", href: "#contributions" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        id="navbar-header"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -120,
          x: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-1/2 z-40 transition-all duration-300 w-[calc(100%-2rem)] max-w-7xl rounded-full border border-brand-border bg-brand-bg/75 backdrop-blur-md shadow-md ${
          scrolled
            ? "top-4 py-3 bg-brand-bg/90 shadow-lg"
            : "top-6 py-4 bg-brand-bg/60"
        }`}
      >
        <div className="w-full px-6 md:px-10 flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#"
            className="font-display font-bold text-xl tracking-tight flex items-center gap-2 group"
          >
            <span className="text-brand-text tracking-wide uppercase">Muhasin</span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-text animate-pulse-slow"></div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="font-sans text-sm font-medium text-brand-sec-text hover:text-brand-text transition-colors duration-250 cursor-pointer relative py-1 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-text transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* AI Assistant Twin Trigger */}
            <button
              onClick={openAiAssistant}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border bg-brand-card/40 hover:bg-brand-text hover:text-brand-bg transition-all duration-300 group cursor-pointer text-sm font-semibold"
            >
              <Sparkles className="w-4 h-4 text-brand-text group-hover:text-brand-bg transition-colors duration-300 animate-pulse" />
              <span>Talk to AI Twin</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-brand-border bg-brand-card/40 hover:bg-brand-card text-brand-text transition-all duration-300 cursor-pointer"
              aria-label="Toggle theme"
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-4 lg:hidden">
            {/* Quick AI Trigger for Mobile */}
            <button
              onClick={openAiAssistant}
              className="p-2 rounded-full border border-brand-border bg-brand-card/40 hover:bg-brand-card text-brand-text cursor-pointer"
              aria-label="AI Twin"
            >
              <Sparkles className="w-4 h-4 text-brand-text" />
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-full border border-brand-border bg-brand-card/40 text-brand-text hover:bg-brand-card cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Slide-in Menu Panel from Right */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[300px] md:w-[400px] bg-brand-sec-bg border-l border-brand-border z-50 p-8 flex flex-col justify-between rounded-l-3xl shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-brand-border pb-6">
                <span className="font-display font-bold text-lg tracking-tight">MENU</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full border border-brand-border hover:bg-brand-card text-brand-text cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Staggered Navigation Items */}
              <nav className="flex flex-col gap-6 py-12">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleNavClick(item.href)}
                    className="text-left font-display text-2xl font-semibold text-brand-sec-text hover:text-brand-text transition-colors duration-200 py-1"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>

              {/* Bottom Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4 border-t border-brand-border pt-6"
              >
                {/* AI Assistant Link */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openAiAssistant();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-brand-text text-brand-bg font-semibold text-sm cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Talk to AI Twin</span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-brand-border bg-brand-card/40 hover:bg-brand-card text-brand-text font-semibold text-sm cursor-pointer transition-all"
                >
                  {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span>{isLight ? "Dark Mode" : "Light Mode"}</span>
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
