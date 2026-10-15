import React, { useState } from 'react';
import { Bot, Network, Scan, Search, Code2, Cpu } from 'lucide-react';
import { AIProject } from '../types/portfolio';

interface Props {
  project: AIProject;
  heightClass?: string;
}

export const ProjectVisualCover: React.FC<Props> = ({ project, heightClass = 'h-52' }) => {
  const [imageFailed, setImageFailed] = useState(false);

  // If a custom image URL exists and hasn't failed, render it with fallback handler
  if (project.customImageUrl && !imageFailed) {
    return (
      <div className={`relative w-full ${heightClass} overflow-hidden bg-slate-950`}>
        <img
          src={project.customImageUrl}
          alt={project.title}
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent opacity-80" />
      </div>
    );
  }

  // Generative high-tech SVG cover themes
  switch (project.coverStyle) {
    case 'agents':
      return (
        <div className={`relative w-full ${heightClass} overflow-hidden bg-gradient-to-br from-slate-950 via-[#0c1222] to-slate-950 p-4 flex flex-col justify-between border-b border-cyan-500/10`}>
          {/* Subtle neural network background lines */}
          <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <circle cx="20%" cy="30%" r="4" fill="#06b6d4" />
            <circle cx="50%" cy="25%" r="6" fill="#818cf8" />
            <circle cx="80%" cy="35%" r="4" fill="#06b6d4" />
            <circle cx="35%" cy="70%" r="5" fill="#38bdf8" />
            <circle cx="70%" cy="75%" r="4" fill="#818cf8" />
            <line x1="20%" y1="30%" x2="50%" y2="25%" stroke="url(#cyanLine)" strokeWidth="1.5" />
            <line x1="50%" y1="25%" x2="80%" y2="35%" stroke="url(#cyanLine)" strokeWidth="1.5" />
            <line x1="20%" y1="30%" x2="35%" y2="70%" stroke="url(#cyanLine)" strokeWidth="1.5" />
            <line x1="50%" y1="25%" x2="70%" y2="75%" stroke="url(#cyanLine)" strokeWidth="1.5" />
            <line x1="35%" y1="70%" x2="70%" y2="75%" stroke="url(#cyanLine)" strokeWidth="1.5" />
          </svg>

          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                <Bot className="w-4 h-4" />
              </span>
              <span className="font-mono text-[11px] text-cyan-300 tracking-wider uppercase">Agent Orchestration</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">v2.5 · LangGraph</span>
          </div>

          <div className="z-10 font-mono text-xs text-slate-300 bg-slate-900/80 backdrop-blur-xs p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
              <span>ACTIVE_GRAPH_NODES</span>
              <span className="text-cyan-400">3 WORKERS</span>
            </div>
            <div className="text-[11px] text-slate-300 truncate">Dispatcher ➔ Researcher ➔ Validator</div>
          </div>
        </div>
      );

    case 'vision':
      return (
        <div className={`relative w-full ${heightClass} overflow-hidden bg-gradient-to-br from-[#071318] via-slate-950 to-[#071118] p-4 flex flex-col justify-between border-b border-emerald-500/10`}>
          {/* Target reticle / computer vision viewfinder */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-32 h-32 border border-dashed border-emerald-400 rounded-lg flex items-center justify-center">
              <div className="w-16 h-16 border border-emerald-500/50" />
            </div>
          </div>

          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                <Scan className="w-4 h-4" />
              </span>
              <span className="font-mono text-[11px] text-emerald-300 tracking-wider uppercase">Computer Vision</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-500/80">60 FPS · TensorRT</span>
          </div>

          <div className="z-10 font-mono text-xs text-slate-300 bg-slate-900/80 backdrop-blur-xs p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
              <span>DETECTION_LAYER</span>
              <span className="text-emerald-400">CONF: 99.7%</span>
            </div>
            <div className="text-[11px] text-slate-300 truncate">YOLOv11 Edge Quantized · [x:412 y:188]</div>
          </div>
        </div>
      );

    case 'rag':
      return (
        <div className={`relative w-full ${heightClass} overflow-hidden bg-gradient-to-br from-slate-950 via-[#100f22] to-slate-950 p-4 flex flex-col justify-between border-b border-indigo-500/10`}>
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 30,80 Q 150,20 280,70 T 420,40" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="80" cy="55" r="3" fill="#a78bfa" />
            <circle cx="210" cy="45" r="4" fill="#818cf8" />
            <circle cx="340" cy="60" r="3" fill="#a78bfa" />
          </svg>

          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-400">
                <Search className="w-4 h-4" />
              </span>
              <span className="font-mono text-[11px] text-indigo-300 tracking-wider uppercase">Semantic RAG</span>
            </div>
            <span className="font-mono text-[10px] text-indigo-400">Hybrid · RRF</span>
          </div>

          <div className="z-10 font-mono text-xs text-slate-300 bg-slate-900/80 backdrop-blur-xs p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
              <span>VECTOR_INDEX</span>
              <span className="text-indigo-400">1536-DIM</span>
            </div>
            <div className="text-[11px] text-slate-300 truncate">Pinecone Dense + BM25 Sparse Rerank</div>
          </div>
        </div>
      );

    case 'code':
      return (
        <div className={`relative w-full ${heightClass} overflow-hidden bg-gradient-to-br from-slate-950 via-[#0f172a] to-slate-950 p-4 flex flex-col justify-between border-b border-amber-500/10`}>
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-400">
                <Code2 className="w-4 h-4" />
              </span>
              <span className="font-mono text-[11px] text-amber-300 tracking-wider uppercase">Full-Stack AI Engine</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">FastAPI + React 19</span>
          </div>

          <div className="z-10 font-mono text-xs text-slate-300 bg-slate-900/80 backdrop-blur-xs p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
              <span>RECONCILIATION_ENGINE</span>
              <span className="text-amber-400">BALANCE 100%</span>
            </div>
            <div className="text-[11px] text-slate-300 truncate">Structured JSON Schema · OCR Table Reconstruct</div>
          </div>
        </div>
      );

    default: // neural
      return (
        <div className={`relative w-full ${heightClass} overflow-hidden bg-gradient-to-br from-slate-950 via-[#0a192f] to-slate-950 p-4 flex flex-col justify-between border-b border-cyan-500/10`}>
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50%" cy="50%" r="60" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="50%" cy="50%" r="90" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
          </svg>

          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                <Network className="w-4 h-4" />
              </span>
              <span className="font-mono text-[11px] text-cyan-300 tracking-wider uppercase">Neural Model</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">Gemini Live API</span>
          </div>

          <div className="z-10 font-mono text-xs text-slate-300 bg-slate-900/80 backdrop-blur-xs p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
              <span>ACOUSTIC_STREAM</span>
              <span className="text-cyan-400">&lt; 320ms</span>
            </div>
            <div className="text-[11px] text-slate-300 truncate">Bidirectional Audio + Fine-Tuned Whisper</div>
          </div>
        </div>
      );
  }
};
