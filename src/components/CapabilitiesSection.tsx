import React from 'react';
import { Cpu, Network, Search, Scan, Layers } from 'lucide-react';
import { Language } from '../types/portfolio';
import { TRANSLATIONS } from '../data/translations';

interface Props {
  language: Language;
}

export const CapabilitiesSection: React.FC<Props> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const capabilities = [
    {
      index: '01',
      title: t.cap1Title,
      desc: t.cap1Desc,
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      stack: ['Gemini 2.5', 'Claude 3.7', 'Llama 3.3', 'LoRA Fine-Tuning', 'Structured JSON']
    },
    {
      index: '02',
      title: t.cap2Title,
      desc: t.cap2Desc,
      icon: <Network className="w-5 h-5 text-indigo-400" />,
      stack: ['LangGraph', 'CrewAI', 'Memory Graphs', 'Self-Healing Loops', 'Tool Calling']
    },
    {
      index: '03',
      title: t.cap3Title,
      desc: t.cap3Desc,
      icon: <Search className="w-5 h-5 text-sky-400" />,
      stack: ['Pinecone', 'ChromaDB', 'BM25 Hybrid', 'Cross-Encoder Rerank', 'HyDE']
    },
    {
      index: '04',
      title: t.cap4Title,
      desc: t.cap4Desc,
      icon: <Scan className="w-5 h-5 text-emerald-400" />,
      stack: ['YOLOv11', 'PyTorch', 'TensorRT', 'Edge AI', 'Defect Segmentation']
    },
    {
      index: '05',
      title: t.cap5Title,
      desc: t.cap5Desc,
      icon: <Layers className="w-5 h-5 text-amber-400" />,
      stack: ['FastAPI', 'Docker', 'Redis', 'WebSockets', 'React 19', 'Tailwind']
    }
  ];

  return (
    <section id="capabilities" className="py-16 md:py-24 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-cyan-400 font-mono tracking-wider uppercase mb-2">
            Engineering Scope
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.capabilitiesHeading}
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.capabilitiesSubtitle}
          </p>
        </div>

        {/* Clean Editorial Capability Rows */}
        <div className="divide-y divide-slate-800/80 border-y border-slate-800/80">
          {capabilities.map((cap) => (
            <div
              key={cap.index}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group hover:bg-slate-900/30 px-4 -mx-4 rounded-xl transition-colors"
            >
              {/* Number and Icon */}
              <div className="md:col-span-1 flex items-center md:flex-col md:items-start gap-3">
                <span className="font-mono text-xs font-semibold text-cyan-400">
                  {cap.index}.
                </span>
                <span className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  {cap.icon}
                </span>
              </div>

              {/* Title & Description */}
              <div className="md:col-span-7">
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {cap.desc}
                </p>
              </div>

              {/* Stack unboxed with separators (Zero-Pill compliant) */}
              <div className="md:col-span-4 md:text-right">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Specialized Technologies
                </span>
                <div className="text-xs font-mono text-slate-400 flex flex-wrap md:justify-end gap-x-2.5 gap-y-1">
                  {cap.stack.map((item, idx) => (
                    <React.Fragment key={item}>
                      <span className="text-slate-300">{item}</span>
                      {idx < cap.stack.length - 1 && (
                        <span className="text-slate-600" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
