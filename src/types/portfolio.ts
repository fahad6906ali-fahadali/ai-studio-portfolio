export type ProjectCategory = 'all' | 'llm' | 'agents' | 'vision' | 'rag' | 'fullstack';

export type Language = 'en' | 'ur';

export interface AIProject {
  id: string;
  title: string;
  titleUrdu?: string;
  category: 'llm' | 'agents' | 'vision' | 'rag' | 'fullstack';
  summary: string;
  summaryUrdu?: string;
  description: string;
  descriptionUrdu?: string;
  client: string;
  metrics: string[];
  tags: string[];
  coverStyle: 'neural' | 'agents' | 'vision' | 'rag' | 'code' | 'custom';
  customImageUrl?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  featured: boolean;
  date: string;
}

export interface ClientInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  serviceNeeded: string;
  budgetRange: string;
  timeline: string;
  projectBrief: string;
  createdAt: string;
}

export interface AgentStep {
  phase: 'thought' | 'tool' | 'observation' | 'output';
  label: string;
  detail: string;
  timestamp: string;
}
