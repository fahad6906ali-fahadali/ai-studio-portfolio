import React from 'react';
import { Sparkles, Globe } from 'lucide-react';
import { Language } from '../types/portfolio';
import { TRANSLATIONS } from '../data/translations';

interface Props {
  language: Language;
  onToggleLanguage: () => void;
  onOpenManager: () => void;
}

export const Navbar: React.FC<Props> = ({ language, onToggleLanguage, onOpenManager }) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#080c14]/90 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-lg font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap shrink-0 group"
        >
          <span className="w-2 h-2 rounded-xs bg-cyan-400 rotate-45 transition-transform group-hover:scale-125" />
          <span className="font-display tracking-wide">{t.brandName}</span>
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#projects" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            {t.navProjects}
          </a>
          <a href="#agent-simulator" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            {t.navDemo}
          </a>
          <a href="#capabilities" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            {t.navCapabilities}
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            {t.navContact}
          </a>
        </nav>

        {/* Zone 3: Primary action + fast toggles */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            title="Switch Language / زبان تبدیل کریں"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'en' ? 'اردو' : 'EN'}</span>
          </button>

          {/* Project Manager Trigger */}
          <button
            onClick={onOpenManager}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-800/60 hover:bg-cyan-950/70 hover:border-cyan-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.btnManageProjects}</span>
          </button>

          {/* Hire Me CTA Button */}
          <a
            href="#contact"
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40 whitespace-nowrap shrink-0 text-center"
          >
            {t.btnHireMe}
          </a>
        </div>
      </div>
    </header>
  );
};
