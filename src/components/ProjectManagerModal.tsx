import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Edit3, RotateCcw, Check, Sparkles } from 'lucide-react';
import { AIProject, ProjectCategory, Language } from '../types/portfolio';
import { TRANSLATIONS } from '../data/translations';

interface Props {
  isOpen: boolean;
  language: Language;
  projects: AIProject[];
  onClose: () => void;
  onSaveProject: (project: AIProject) => void;
  onDeleteProject: (id: string) => void;
  onResetDefaults: () => void;
}

export const ProjectManagerModal: React.FC<Props> = ({
  isOpen,
  language,
  projects,
  onClose,
  onSaveProject,
  onDeleteProject,
  onResetDefaults
}) => {
  const t = TRANSLATIONS[language];

  // Mode: 'list' | 'form'
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [titleUrdu, setTitleUrdu] = useState('');
  const [category, setCategory] = useState<AIProject['category']>('agents');
  const [summary, setSummary] = useState('');
  const [summaryUrdu, setSummaryUrdu] = useState('');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('');
  const [metricsText, setMetricsText] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [coverStyle, setCoverStyle] = useState<AIProject['coverStyle']>('agents');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setTitleUrdu('');
    setCategory('agents');
    setSummary('');
    setSummaryUrdu('');
    setDescription('');
    setClient('');
    setMetricsText('');
    setTagsText('');
    setCoverStyle('agents');
    setCustomImageUrl('');
    setGithubUrl('');
    setLiveDemoUrl('');
    setFeatured(false);
    setEditingId(null);
  };

  const handleStartAdd = () => {
    resetForm();
    setViewMode('form');
  };

  const handleStartEdit = (proj: AIProject) => {
    setEditingId(proj.id);
    setTitle(proj.title);
    setTitleUrdu(proj.titleUrdu || '');
    setCategory(proj.category);
    setSummary(proj.summary);
    setSummaryUrdu(proj.summaryUrdu || '');
    setDescription(proj.description);
    setClient(proj.client);
    setMetricsText(proj.metrics.join(', '));
    setTagsText(proj.tags.join(', '));
    setCoverStyle(proj.coverStyle);
    setCustomImageUrl(proj.customImageUrl || '');
    setGithubUrl(proj.githubUrl || '');
    setLiveDemoUrl(proj.liveDemoUrl || '');
    setFeatured(proj.featured);
    setViewMode('form');
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      setStatusMessage('Please fill in at least the project title and summary.');
      return;
    }

    const parsedMetrics = metricsText
      .split(',')
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    const parsedTags = tagsText
      .split(',')
      .map((tg) => tg.trim())
      .filter((tg) => tg.length > 0);

    const newOrUpdatedProject: AIProject = {
      id: editingId || `afa-user-${Date.now()}`,
      title: title.trim(),
      titleUrdu: titleUrdu.trim() || undefined,
      category,
      summary: summary.trim(),
      summaryUrdu: summaryUrdu.trim() || undefined,
      description: description.trim() || summary.trim(),
      client: client.trim() || 'Internal AI Research',
      metrics: parsedMetrics.length > 0 ? parsedMetrics : ['Production Deployed'],
      tags: parsedTags.length > 0 ? parsedTags : ['AI', 'Python'],
      coverStyle,
      customImageUrl: customImageUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      liveDemoUrl: liveDemoUrl.trim() || undefined,
      featured,
      date: new Date().toISOString().slice(0, 7)
    };

    onSaveProject(newOrUpdatedProject);
    setStatusMessage('Project saved successfully!');
    setTimeout(() => {
      setStatusMessage(null);
      setViewMode('list');
      resetForm();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">{t.managerTitle}</h2>
              <p className="text-xs text-slate-400">{t.managerDesc}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {viewMode === 'list' ? (
            /* LIST VIEW */
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={handleStartAdd}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.btnAddNew}</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Restore initial sample benchmark projects?')) {
                      onResetDefaults();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.btnResetDefault}</span>
                </button>
              </div>

              {/* Projects List Table */}
              <div className="rounded-xl border border-slate-800 overflow-hidden divide-y divide-slate-800/80 bg-slate-950/50">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-1">
                        <span className="uppercase">{proj.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{proj.client}</span>
                        {proj.featured && (
                          <span className="text-[10px] text-amber-300 font-sans font-medium px-1.5 py-0.2 bg-amber-950/60 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-white truncate">
                        {language === 'ur' && proj.titleUrdu ? proj.titleUrdu : proj.title}
                      </h4>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {proj.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleStartEdit(proj)}
                        className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title={t.btnEdit}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(t.confirmDelete)) {
                            onDeleteProject(proj.id);
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title={t.btnDelete}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* FORM VIEW */
            <form onSubmit={handleSaveSubmit} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-sm font-semibold text-cyan-300">
                  {editingId ? 'Edit Project Details' : 'Add New AI Project'}
                </span>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Back to Project List
                </button>
              </div>

              {statusMessage && (
                <div className="p-3 rounded-lg bg-cyan-950/70 border border-cyan-800 text-cyan-200 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Title & Urdu Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.fieldTitle} *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Real-Time Vision Quality Inspector"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.fieldTitleUrdu}
                  </label>
                  <input
                    type="text"
                    value={titleUrdu}
                    onChange={(e) => setTitleUrdu(e.target.value)}
                    placeholder="مثال: ریئل ٹائم کمپیوٹر وژن کوالٹی انسپکٹر"
                    dir="rtl"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-hidden font-sans"
                  />
                </div>
              </div>

              {/* Category & Client */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.fieldCategory} *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as AIProject['category'])}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-hidden"
                  >
                    <option value="agents">Autonomous Agents</option>
                    <option value="rag">RAG &amp; Vector Search</option>
                    <option value="vision">Computer Vision</option>
                    <option value="llm">LLM &amp; Voice NLP</option>
                    <option value="fullstack">Full-Stack AI Apps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.fieldClient}
                  </label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. Enterprise Client / FinTech Startup"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Short Summary (EN & UR) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.fieldSummary} *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Brief 1-2 sentence overview of the project's core AI capability..."
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.fieldSummaryUrdu}
                  </label>
                  <textarea
                    rows={2}
                    value={summaryUrdu}
                    onChange={(e) => setSummaryUrdu(e.target.value)}
                    placeholder="پروجیکٹ کا مختصر خلاصہ اردو میں..."
                    dir="rtl"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-hidden font-sans"
                  />
                </div>
              </div>

              {/* Detailed Case Study */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {t.fieldDescription}
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Elaborate on the technical challenge, AI models used, training/fine-tuning approach, and system architecture..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-hidden leading-relaxed"
                />
              </div>

              {/* Metrics & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.fieldMetrics}
                  </label>
                  <input
                    type="text"
                    value={metricsText}
                    onChange={(e) => setMetricsText(e.target.value)}
                    placeholder="e.g. -60% Latency, 99.4% Accuracy, 15k Queries/day"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.fieldTags}
                  </label>
                  <input
                    type="text"
                    value={tagsText}
                    onChange={(e) => setTagsText(e.target.value)}
                    placeholder="e.g. Gemini 2.5, LangGraph, PyTorch, FastAPI"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              {/* Visual Cover Style & Custom Image URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.fieldStyle}
                  </label>
                  <select
                    value={coverStyle}
                    onChange={(e) => setCoverStyle(e.target.value as AIProject['coverStyle'])}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-hidden"
                  >
                    <option value="agents">High-Tech Agent Graph Theme</option>
                    <option value="vision">Computer Vision Reticle Theme</option>
                    <option value="rag">Semantic RAG &amp; Vector Theme</option>
                    <option value="neural">Neural Network Ring Theme</option>
                    <option value="code">Full-Stack Code &amp; API Theme</option>
                    <option value="custom">Custom Image URL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.fieldCustomImage}
                  </label>
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="https://... (direct image URL)"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* GitHub and Live Demo Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.fieldGithub}
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/your-username/repo"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.fieldLiveDemo}
                  </label>
                  <input
                    type="url"
                    value={liveDemoUrl}
                    onChange={(e) => setLiveDemoUrl(e.target.value)}
                    placeholder="https://demo.example.com"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-cyan-400 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-400"
                />
                <label htmlFor="featured-check" className="text-xs text-slate-300">
                  {t.fieldFeatured}
                </label>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.btnCancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                >
                  {t.btnSaveProject}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
