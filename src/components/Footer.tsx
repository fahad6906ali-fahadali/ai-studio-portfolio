import React from 'react';
import { Mail, MessageSquare, ArrowUp, Github, Linkedin } from 'lucide-react';
import { Language } from '../types/portfolio';
import { TRANSLATIONS } from '../data/translations';

interface Props {
  language: Language;
}

export const Footer: React.FC<Props> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappText = encodeURIComponent(
    language === 'ur'
      ? `سلام علی فہد! میں آپ کے پورٹ فولیو سے رابطہ کر رہا ہوں۔`
      : `Hi Ali Fahad, I am contacting you from your AFA AI Developer portfolio.`
  );

  return (
    <footer className="border-t border-slate-800/80 bg-[#060910] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Role */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-xs bg-cyan-400 rotate-45" />
            <span className="font-display font-bold text-white text-sm tracking-wide">
              {t.brandName}
            </span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-xs text-slate-400">{t.brandRole}</span>
          </div>

          {/* Direct channels & Links */}
          <div className="flex items-center gap-5 text-xs">
            <a
              href="mailto:fahad6906ali@gmail.com"
              className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>fahad6906ali@gmail.com</span>
            </a>

            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{t.backToTop}</span>
            </button>
          </div>

        </div>

        {/* Quiet Copyright Row */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>{t.footerCopy}</p>
          <p>Ali Fahad · AI Systems &amp; Autonomous Solutions</p>
        </div>
      </div>
    </footer>
  );
};
