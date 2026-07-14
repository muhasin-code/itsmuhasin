import { Project, Experience, TechItem, StatItem } from "./types";

// TODO Constants for personalization - easily configurable
export const GITHUB_USERNAME = "muhasin-code"; 
export const RESUME_URL = "/resume.pdf"; 
export const LINKEDIN_URL = "https://www.linkedin.com/in/muhasin-code"; 
export const UPWORK_URL = "https://www.upwork.com/freelancers/~01716acc78c5c3ab17?mp_source=share"; 
export const EMAIL_ADDRESS = "muhasin.code@gmail.com";

// Image Paths
export const PORTRAIT_IMAGE = "/profile-illustration.png";
export const PAPERLENS_IMAGE = "/src/assets/images/paperlens_preview_1784010042683.jpg";
export const CHURNGUARD_IMAGE = "/src/assets/images/churnguard_preview_1784010057128.jpg";
export const BERGIE_IMAGE = "/src/assets/images/bergie_preview_1784010068636.jpg";
export const ROBOSTOCK_IMAGE = "/src/assets/images/robostock_preview_1784010081249.jpg";

export const PROJECTS: Project[] = [
  {
    id: "paperlens",
    title: "PaperLens",
    subtitle: "Production-grade arXiv RAG Platform",
    description: "Production-grade RAG platform over arXiv ML papers, built without LangChain. Direct integration of ChromaDB, hybrid retrieval (BM25 + dense embeddings), cross-encoder reranking, and a QLoRA fine-tuned Qwen2.5-3B-Instruct model, with Langfuse observability and Ragas evaluation gating CI.",
    category: "ML/AI",
    tags: ["Python", "ChromaDB", "sentence-transformers", "FastAPI", "Ollama", "Langfuse", "Ragas", "GitHub Actions"],
    image: PAPERLENS_IMAGE,
    githubUrl: `https://github.com/${GITHUB_USERNAME}/paperlens`,
    liveUrl: `https://github.com/${GITHUB_USERNAME}/paperlens`
  },
  {
    id: "churnguard",
    title: "ChurnGuard AI",
    subtitle: "End-to-End Telecom MLOps Pipeline",
    description: "End-to-end MLOps churn prediction pipeline on a 50,000-row telecom dataset — full lifecycle from feature store to monitored deployment.",
    category: "MLOps",
    tags: ["XGBoost", "MLflow", "DVC", "Great Expectations", "Prefect", "Feast", "FastAPI", "Docker"],
    image: CHURNGUARD_IMAGE,
    githubUrl: `https://github.com/${GITHUB_USERNAME}/churnguard-ai`
  },
  {
    id: "bergie",
    title: "Bergie",
    subtitle: "Multi-Channel Sales Agent in Production",
    description: "Conversational sales agent in production at EduBerg, deployed across five channels, handling real customer conversations end-to-end.",
    category: "ML/AI",
    tags: ["Anthropic Claude API", "FastAPI", "PostgreSQL", "Redis"],
    image: BERGIE_IMAGE,
    githubUrl: "https://github.com/bloomberglab/bergie",
    liveUrl: "https://github.com/bloomberglab/bergie"
  },
  {
    id: "robostock",
    title: "RoboStock",
    subtitle: "Inventory Management System",
    description: "Inventory management system built to streamline stock tracking and reporting.",
    category: "Engineering",
    tags: ["Django", "PostgreSQL"],
    image: ROBOSTOCK_IMAGE,
    githubUrl: `https://github.com/${GITHUB_USERNAME}/robostock`
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-ibm",
    role: "IBM Data Science Professional Certificate",
    company: "Coursera / IBM",
    period: "2026",
    description: [
      "Completed the comprehensive IBM Data Science professional curriculum covering python programming, SQL database queries, data analysis, and advanced machine learning modeling.",
      "Mastered key data libraries like Pandas, NumPy, Matplotlib, Seaborn, and Scikit-Learn to build predictive pipelines.",
      "Developed multiple capstone projects analyzing real-world datasets and predicting behavioral outcomes."
    ],
    tags: ["Data Science", "Machine Learning", "Python", "SQL", "Scikit-Learn"]
  },
  {
    id: "exp-eduberg",
    role: "ML Engineer & Python Developer",
    company: "EduBerg Learning Hub LLP",
    period: "August 2025 - Present",
    description: [
      "Working as a Python Developer cum ML Engineer, placing prime importance on design, optimization, and deployment of machine learning models.",
      "Architecting intelligent conversational agents and memory-efficient production pipeline schemas.",
      "Mentoring over 150+ students in foundational programming, modern web technologies, and practical machine learning methodologies.",
      "Built, optimized, and shipped 'Bergie' — a custom, multi-channel conversational sales agent handling customer queries end-to-end."
    ],
    tags: ["ML Engineering", "Python Developer", "Conversational AI", "FastAPI", "Mentorship"]
  },
  {
    id: "exp-wqu",
    role: "Applied Data Science Lab Certificate",
    company: "WorldQuant University",
    period: "2025",
    description: [
      "Completed the rigorous, project-based Applied Data Science Lab focusing on hands-on, end-to-end Python-driven solution architectures.",
      "Constructed production-ready data pipelines and solved complex real-world data science challenges using Pandas, NumPy, Scikit-learn, and statsmodels.",
      "Executed housing price index predictions, local air quality analysis, and social media/stock market sentiment modeling."
    ],
    tags: ["Data Science", "Pandas", "Scikit-Learn", "Python", "Data Pipelines"]
  },
  {
    id: "exp-graduation",
    role: "BSc Computer Science Graduate",
    company: "University of Kerala",
    period: "2022 - 2025",
    description: [
      "Graduated with a Cumulative Grade Point Average (CGPA) of 8.5, establishing robust fundamentals in computer systems, databases, and algorithms.",
      "TrueVoice: Developed a blockchain-based Online Voting system for college elections to ensure absolute security and transparency.",
      "HostelDays: Created a Flask-based solution for room allocation and hostel management that guarantees complete operational clarity."
    ],
    tags: ["Computer Science", "Blockchain", "Flask", "Python", "SQL"]
  },
  {
    id: "exp-early",
    role: "Early Python Developer & Self-Taught Coder",
    company: "Self-Guided Exploration",
    period: "2018 - 2022",
    description: [
      "Fell in love with Python and started learning it extensively way before embarking on formal university graduation.",
      "Explored standard modules, built clean command-line tools, and automated local desktop/web scraping workflows.",
      "Cultivated a deep, intuitive strength in core programming logic, data structures, and algorithm formulation."
    ],
    tags: ["Python", "Automation", "Self-Taught", "Programming Foundations"]
  }
];

export const TECH_ITEMS: TechItem[] = [
  // ML/AI
  { name: "PyTorch", category: "ML/AI", level: "Model Training & PyTorch Hub" },
  { name: "Transformers", category: "ML/AI", level: "Hugging Face Hub" },
  { name: "ChromaDB", category: "ML/AI", level: "Vector Store" },
  { name: "sentence-transformers", category: "ML/AI", level: "Dense Embeddings" },
  { name: "Ragas", category: "ML/AI", level: "RAG Evaluation" },
  { name: "Langfuse", category: "ML/AI", level: "LLM Observability" },
  { name: "RAG", category: "ML/AI", level: "Information Retrieval" },
  { name: "LangChain", category: "ML/AI", level: "LLM Orchestration" },
  { name: "NLP", category: "ML/AI", level: "Text Processing & NLU" },
  { name: "LLM Fine-Tuning", category: "ML/AI", level: "PEFT, LoRA & QLoRA" },
  { name: "Ollama", category: "ML/AI", level: "Local Inference & GGUF" },
  { name: "API Integration", category: "ML/AI", level: "OpenAI, Anthropic & Gemini" },

  // MLOps
  { name: "MLflow", category: "MLOps", level: "Experiment & Model Registry" },
  { name: "DVC", category: "MLOps", level: "Data & Model Versioning" },
  { name: "Prefect", category: "MLOps", level: "Data Pipeline Orchestrations" },
  { name: "Feast", category: "MLOps", level: "Feature Store" },
  { name: "Great Expectations", category: "MLOps", level: "Data Quality Verification" },
  { name: "GitHub Actions", category: "MLOps", level: "Continuous Integration Gating" },

  // Engineering
  { name: "FastAPI", category: "Engineering", level: "High Performance API Backend" },
  { name: "PostgreSQL", category: "Engineering", level: "Relational Database" },
  { name: "Redis", category: "Engineering", level: "In-Memory Caching & Broker" },
  { name: "Git", category: "Engineering", level: "Source Version Control" },
  { name: "Linux", category: "Engineering", level: "System Environment & Scripts" },
  { name: "Docker", category: "Engineering", level: "Container Virtualization" },
  { name: "Kubernetes", category: "Engineering", level: "Container Orchestration" },
  { name: "Gunicorn", category: "Engineering", level: "WSGI HTTP Server" },
  { name: "Nginx", category: "Engineering", level: "Reverse Proxy & Load Balancer" },

  // Foundations
  { name: "Python", category: "Foundations", level: "Primary Development" },
  { name: "Linear Algebra", category: "Foundations", level: "Dimensionality & Projections" },
  { name: "Statistics", category: "Foundations", level: "Probability & Hypothesis Testing" },
  { name: "DSA", category: "Foundations", level: "Structures & Algorithmic Complexity" },

  // Deployment
  { name: "AWS", category: "Deployment", level: "Cloud Platform" },
  { name: "Vercel", category: "Deployment", level: "Frontend & Serverless" },
  { name: "Render", category: "Deployment", level: "Cloud Web Services" },
  { name: "Railways", category: "Deployment", level: "PaaS Hosting" }
];

export const STATS: StatItem[] = [
  { label: "Projects Published", value: "10", suffix: "+" },
  { label: "Projects Shipped", value: "3", suffix: "+" },
  { label: "Students Mentored", value: "150", suffix: "+" },
  { label: "Year in AI", value: "2", suffix: "nd" }
];
