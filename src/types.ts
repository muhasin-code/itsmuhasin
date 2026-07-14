export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

export interface TechItem {
  name: string;
  category: "ML/AI" | "MLOps" | "Engineering" | "Foundations" | "Deployment";
  level: string;
}

export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
