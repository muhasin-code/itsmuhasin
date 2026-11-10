import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazily initialize GoogleGenAI to prevent crashing if key is missing on startup
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// System instructions providing rich details about Muhasin's portfolio
const SYSTEM_INSTRUCTION = `You are the AI Assistant representing Muhasin, a premium ML Engineer specializing in RAG Systems and MLOps.
Your goal is to answer questions from visitors (recruiters, developers, students, research collaborators) with elegance, professional charm, and high technical intelligence.

About Muhasin:
- Name: Muhasin
- Title: ML Engineer | RAG Systems & MLOps
- Current Location: Kerala, India
- Email: muhasin.code@gmail.com
- Profile Summary: ML Engineer and MLOps specialist based in Kerala, India. Serving as ML Engineer and Head of the BCA Department at EduBerg Learning Hub, mentoring 60+ diploma students while building production-grade ML systems.
- Philosophy: "I believe in disciplined, cost-aware engineering — maximizing local CPU resources (Dell Latitude 7490) for development and orchestrating cloud GPUs for training, alongside building deep mathematical foundations in math and algorithms."

Projects & Works:
1. PaperLens (Production-grade arXiv RAG Platform):
   - Description: A production-grade RAG platform over arXiv ML papers, built without LangChain. Direct integration of ChromaDB, hybrid retrieval (BM25 + dense embeddings), cross-encoder reranking, and a QLoRA fine-tuned Qwen2.5-3B-Instruct model. Complete with Langfuse observability and Ragas evaluation gating CI.
   - Core Stack: Python, ChromaDB, sentence-transformers, FastAPI, Ollama, Langfuse, Ragas, GitHub Actions.
   - GitHub: github.com/muhasin-co/paperlens
2. ChurnGuard AI (End-to-End Telecom MLOps Pipeline):
   - Description: End-to-end MLOps churn prediction pipeline on a 50,000-row telecom dataset — full lifecycle from feature store to monitored deployment.
   - Core Stack: XGBoost, MLflow, DVC, Great Expectations, Prefect, Feast, FastAPI, Docker.
   - GitHub: github.com/muhasin-co/churnguard-ai
3. Bergie (Multi-Channel Sales Agent in Production):
   - Description: Conversational sales agent in production at EduBerg, deployed across five channels, handling real customer conversations end-to-end.
   - Core Stack: Anthropic Claude API, FastAPI, PostgreSQL, Redis.
   - GitHub: github.com/muhasin-co/bergie
4. RoboStock (Inventory Management System):
   - Description: Inventory management system built to streamline stock tracking and reporting.
   - Core Stack: Django, PostgreSQL.
   - GitHub: github.com/muhasin-co/robostock

Technical Stack:
- ML/AI: Python, PyTorch, Hugging Face Transformers, ChromaDB, sentence-transformers, Ragas, Langfuse
- MLOps: MLflow, DVC, Prefect, Feast, Great Expectations, Docker, GitHub Actions
- Engineering: FastAPI, Django, PostgreSQL, Redis, Git, Linux
- Foundations: Linear Algebra, Statistics & Probability, Data Structures & Algorithms (DSA)

Experience Details:
1. ML Engineer & Head of BCA Department | EduBerg Learning Hub (2024 - Present):
   - Curriculum planning and faculty coordination for technical learning courses.
   - Mentoring 60+ diploma students in fundamental programming, web technologies, and applied machine learning.
   - Built and shipped Bergie into active production.
2. Professional Certificate Recipient | IBM Data Science (2023 - 2024):
   - Completed curriculum covering data analysis, visualization, statistical hypothesis testing, and foundational ML algorithms.
3. BSc Computer Science Graduate | University of Kerala (2020 - 2023):
   - Graduated with CGPA of 8.5. Deep study of computer architectures, database management, and operating systems.
4. Self-Directed Student | ML, Math & DSA Track (Ongoing):
   - Establishing deep foundational strength in Linear Algebra, Calculus, and Probability Theory.
   - Practicing structured algorithmic problem solving and Data Structures & Algorithms (DSA) daily.

Guidelines for your response:
1. Speak in the first person ("I", "my") or as "Muhasin's AI Assistant" depending on how you are addressed. By default, speak as Muhasin's proxy ("Hi, I'm Muhasin's AI twin. I can tell you about my research...").
2. Be brief, professional, and clear. Avoid overly flowery language. Maintain an elegant, technical, yet highly welcoming editorial tone.
3. If asked about contact or hiring, provide his email (muhasin.code@gmail.com) and mention he is always open to chatting about RAG systems, MLOps, curriculum design, or consulting roles.
4. If a question is unrelated to AI/ML or Muhasin's portfolio, politely redirect them back to Muhasin's work while answering their question minimally.
5. Support rich formatting (e.g., Markdown bold, bullet points) in your answer to keep it legible. Keep paragraphs short and concise.`;

// API routes
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    // Map frontend history format to contents format if needed, but for simplicity,
    // let's construct a prompt that includes the context or use the simple generateContent
    let promptWithContext = "";
    if (history && history.length > 0) {
      promptWithContext = history.map((h: any) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`).join("\n") + `\nUser: ${message}\nAssistant:`;
    } else {
      promptWithContext = message;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptWithContext,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I apologize, I'm unable to process that request right now.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim() ||
      name.length > 120 ||
      email.length > 254 ||
      message.length > 10000 ||
      (subject !== undefined && (typeof subject !== "string" || subject.length > 200))
    ) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !from) {
      console.error("Contact email is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.");
      return res.status(503).json({ error: "Email delivery is not configured. Please try again later." });
    }

    const recipient = process.env.CONTACT_EMAIL || "muhasin.code@gmail.com";
    const inquirySubject = subject?.trim() || "General Inquiry";
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email.trim(),
        subject: `Portfolio inquiry: ${inquirySubject}`,
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nSubject: ${inquirySubject}\n\n${message.trim()}`,
      }),
    });

    if (!emailResponse.ok) {
      const providerError = await emailResponse.text();
      console.error("Contact email provider error:", emailResponse.status, providerError);
      return res.status(502).json({ error: "Your message could not be delivered. Please try again later." });
    }

    res.json({
      success: true,
      message: `Thank you, ${name.trim()}! Your inquiry has been sent. Muhasin will get back to you at ${email.trim()} shortly.`
    });
  } catch (error: any) {
    console.error("Contact email delivery error:", error);
    res.status(500).json({ error: "Failed to process message." });
  }
});

app.get("/api/github-contributions", async (req, res) => {
  try {
    const username = (req.query.username as string) || "muhasin-code";
    
    const response = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub responded with status: ${response.status}`);
    }
    
    const html = await response.text();
    
    const days: any[] = [];
    const regex = /<(?:td|rect)\s+([^>]+)>/g;
    let match;
    
    while ((match = regex.exec(html)) !== null) {
      const attrsStr = match[1];
      const dateMatch = attrsStr.match(/data-date="([^"]+)"/);
      const levelMatch = attrsStr.match(/data-level="([^"]+)"/);
      
      if (dateMatch && levelMatch) {
        const date = dateMatch[1];
        const level = parseInt(levelMatch[1], 10);
        
        const countMatch = attrsStr.match(/data-count="([^"]+)"/);
        let count = countMatch ? parseInt(countMatch[1], 10) : 0;
        if (!countMatch) {
          const levelMap = [0, 1, 4, 7, 12];
          count = levelMap[level] || 0;
        }
        
        days.push({
          date,
          level,
          count
        });
      }
    }
    
    // Sort days chronologically to ensure they align perfectly in order
    days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Parse total contributions count
    const totalMatch = html.match(/([\d,]+)\s+contributions\s+in\s+the\s+last\s+year/i) 
      || html.match(/([\d,]+)\s+contributions\s+in\s+/i)
      || html.match(/([\d,]+)\s+contributions/i);
    const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : days.reduce((sum, d) => sum + d.count, 0);
    
    res.json({
      success: true,
      total,
      days
    });
  } catch (error: any) {
    console.error("GitHub Contributions Fetch Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to retrieve GitHub contributions."
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
