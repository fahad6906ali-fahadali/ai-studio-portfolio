import React, { useState, useMemo } from 'react';
import { Search, Plus, ArrowUpRight, Github, ExternalLink, Sparkles } from 'lucide-react';
import { AIProject, ProjectCategory, Language } from '../types/portfolio';
import { TRANSLATIONS } from '../data/translations';
import { ProjectVisualCover } from './ProjectVisualCover';

interface Props {
  language: Language;
  projects: AIProject[];
  onOpenDetail: (project: AIProject) => void;
  onOpenManager: () => void;
}

export const ProjectShowcase: React.FC<Props> = ({
  language,
  projects,
  onOpenDetail,
  onOpenManager
}) => {
  const t = TRANSLATIONS[language];
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Category filter buttons
  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: t.filterAll },
    { id: 'agents', label: t.filterAgents },
    { id: 'rag', label: t.filterRAG },
    { id: 'vision', label: t.filterVision },
    { id: 'llm', label: t.filterLLM },
    { id: 'fullstack', label: t.filterFullStack }
  ];

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      // Category match
      const matchesCategory =
        activeCategory === 'all' || proj.category === activeCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const titleMatch =
        proj.title.toLowerCase().includes(query) ||
        (proj.titleUrdu && proj.titleUrdu.toLowerCase().includes(query));
      const summaryMatch =
        proj.summary.toLowerCase().includes(query) ||
        (proj.summaryUrdu && proj.summaryUrdu.toLowerCase().includes(query));
      const tagMatch = proj.tags.some((tag) => tag.toLowerCase().includes(query));
      const clientMatch = proj.client.toLowerCase().includes(query);

      return matchesCategory && (titleMatch || summaryMatch || tagMatch || clientMatch);
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-cyan-400 font-mono tracking-wider uppercase mb-2">
              Selected AI Implementations
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t.projectsHeading}
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              {t.projectsSubtitle}
            </p>
          </div>

          {/* Quick Action to Manage / Add Projects */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenManager}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>{t.btnAddProject}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          
          {/* Functional Category Filter Segmented Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid (Bento Grid) */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 p-8">
            <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-semibold text-slate-300 mb-1">
              {t.noProjectsFound}
            </h3>
            <button
              onClick={onOpenManager}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t.btnAddProject}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const displayTitle =
                language === 'ur' && project.titleUrdu ? project.titleUrdu : project.title;
              const displaySummary =
                language === 'ur' && project.summaryUrdu ? project.summaryUrdu : project.summary;

              return (
                <div
                  key={project.id}
                  onClick={() => onOpenDetail(project)}
                  className="group relative rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-xl hover:shadow-cyan-950/20"
                >
                  {/* Visual Top Preview */}
                  <div>
                    <ProjectVisualCover project={project} heightClass="h-48" />

                    <div className="p-5">
                      {/* Zero-Pill Unboxed Metadata with · separator */}
                      <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-2">
                        <span className="uppercase">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.client}</span>
                        {project.featured && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-amber-300">Featured</span>
                          </>
                        )}
                      </div>

                      {/* Project Title */}
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight line-clamp-1">
                        {displayTitle}
                      </h3>

                      {/* Summary */}
                      <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                        {displaySummary}
                      </p>

                      {/* Primary Impact Metric */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                          <span className="text-slate-500">Impact:</span>
                          <span>{project.metrics[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: Tags & Case Study Trigger */}
                  <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-800/40">
                    {/* Unboxed tech tags with · separator */}
                    <div className="text-[11px] font-mono text-slate-400 truncate max-w-[65%]">
                      {project.tags.slice(0, 3).join(' · ')}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetail(project);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <span>{t.btnViewCaseStudy}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
