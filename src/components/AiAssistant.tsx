import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Bot, Sparkles, CornerDownLeft, Loader2 } from "lucide-react";
import { ChatMessage } from "../types";

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_PROMPTS = [
  "What is Muhasin's expertise?",
  "Tell me about PaperLens' RAG system",
  "How does ChurnGuard's pipeline work?",
  "What is his role at EduBerg Hub?",
];

// Lightweight custom formatter to render Markdown elegantly without heavy libraries
function formatMessage(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    let rendered = line;
    
    // Check for bullet lists
    const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
    if (isBullet) {
      rendered = line.trim().substring(2);
    }

    // Replace bold text (**text**)
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(rendered)) !== null) {
      if (match.index > lastIndex) {
        parts.push(rendered.substring(lastIndex, match.index));
      }
      parts.push(
        <strong key={match.index} className="font-bold text-brand-text">
          {match[1]}
        </strong>
      );
      lastIndex = boldRegex.lastIndex;
    }

    if (lastIndex < rendered.length) {
      parts.push(rendered.substring(lastIndex));
    }

    const finalContent = parts.length > 0 ? parts : rendered;

    if (isBullet) {
      return (
        <li key={i} className="ml-4 list-disc text-brand-sec-text mb-1 pl-1">
          {finalContent}
        </li>
      );
    }

    return (
      <p key={i} className="text-brand-sec-text mb-2 leading-relaxed last:mb-0">
        {finalContent}
      </p>
    );
  });
}

export default function AiAssistant({ isOpen, onClose }: AiAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi, I'm Muhasin's AI Twin! I have been trained on my career background, technical research, and system designs. Ask me anything about my projects like PaperLens and Bergie, or how we can collaborate!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Map chat messages into history format required by server
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        const assistantMsg: ChatMessage = {
          id: Math.random().toString(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || "Failed to communicate with AI");
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: "I'm having a brief connection issue with my neural weights. Please try again! (Make sure your GEMINI_API_KEY is configured in your Secrets panel).",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
          />

          {/* Chat Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-[480px] h-[640px] bg-brand-sec-bg border border-brand-border rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-brand-border bg-brand-bg/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-card flex items-center justify-center border border-brand-border relative">
                  <Bot className="w-5 h-5 text-brand-text" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-brand-sec-bg"></span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-brand-text flex items-center gap-1.5 text-sm md:text-base">
                    Muhasin's AI Twin
                    <Sparkles className="w-3.5 h-3.5 text-brand-text animate-pulse" />
                  </h3>
                  <span className="text-xs text-brand-muted">Active LLM Proxy State</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-brand-border hover:bg-brand-card text-brand-text cursor-pointer transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-sm ${
                      msg.role === "user"
                        ? "bg-brand-text text-brand-bg font-medium"
                        : "bg-brand-card/60 text-brand-sec-text border border-brand-border"
                    }`}
                  >
                    <div>
                      {msg.role === "user" ? (
                        <p>{msg.content}</p>
                      ) : (
                        formatMessage(msg.content)
                      )}
                    </div>
                    <span
                      className={`text-[10px] mt-2 block text-right ${
                        msg.role === "user" ? "text-brand-bg/60" : "text-brand-muted"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Loader */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl p-4 bg-brand-card/60 text-brand-sec-text border border-brand-border flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-brand-muted" />
                    <span className="text-sm text-brand-muted font-mono">Twin is synthesizing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions & Input */}
            <div className="p-4 border-t border-brand-border bg-brand-bg/40 space-y-3">
              {/* Pre-made prompts */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    disabled={isLoading}
                    onClick={() => handleSend(prompt)}
                    className="flex-shrink-0 px-3 py-1.5 text-xs rounded-full border border-brand-border bg-brand-card/30 text-brand-sec-text hover:text-brand-text hover:bg-brand-card transition-all cursor-pointer whitespace-nowrap disabled:opacity-55 disabled:cursor-not-allowed"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Muhasin's AI Twin..."
                  disabled={isLoading}
                  className="flex-1 bg-brand-card border border-brand-border rounded-full px-4 py-2.5 text-sm text-brand-text focus:outline-hidden focus:border-brand-text transition-colors disabled:opacity-55"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-full bg-brand-text text-brand-bg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
