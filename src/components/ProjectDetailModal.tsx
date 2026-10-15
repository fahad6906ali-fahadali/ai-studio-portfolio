import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, MessageSquare, ArrowUpRight } from 'lucide-react';
import { AIProject, Language } from '../types/portfolio';
import { TRANSLATIONS } from '../data/translations';
import { ProjectVisualCover } from './ProjectVisualCover';

interface Props {
  project: AIProject | null;
  language: Language;
  onClose: () => void;
  onSelectForInquiry: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<Props> = ({
  project,
  language,
  onClose,
  onSelectForInquiry
}) => {
  const t = TRANSLATIONS[language];

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  const displayTitle = (language === 'ur' && project.titleUrdu) ? project.titleUrdu : project.title;
  const displaySummary = (language === 'ur' && project.summaryUrdu) ? project.summaryUrdu : project.summary;
  const displayDesc = (language === 'ur' && project.descriptionUrdu) ? project.descriptionUrdu : project.description;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Visual Banner */}
        <div className="relative">
          <ProjectVisualCover project={project} heightClass="h-60 sm:h-72" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header Metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-2">
              <span className="uppercase">{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.client}</span>
              <span aria-hidden="true">·</span>
              <span>{project.date}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {displayTitle}
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
              {displaySummary}
            </p>
          </div>

          {/* Impact Metrics Strip */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Key Quantified Outcomes
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm font-mono text-cyan-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Architecture & Technical Solution */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-slate-200">
              System Architecture &amp; Engineering Details
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {displayDesc}
            </p>
          </div>

          {/* Technologies Used (Zero-Pill: Clean unboxed typography with separators) */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Engineered With
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-300">
              {project.tags.map((tag, idx) => (
                <React.Fragment key={tag}>
                  <span className="text-cyan-300">{tag}</span>
                  {idx < project.tags.length - 1 && (
                    <span className="text-slate-600" aria-hidden="true">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                >
                  <span>{t.btnLiveDemo}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{t.btnSourceCode}</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                onSelectForInquiry(project.title);
              }}
              className="inline-flex items-center gap-2 text-xs font-medium text-cyan-400 hover:text-cyan-300 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire About Building Similar AI Architecture →</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
