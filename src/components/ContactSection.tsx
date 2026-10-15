import React, { useState } from 'react';
import { MessageSquare, Mail, Send, CheckCircle2, Copy, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Language, ClientInquiry } from '../types/portfolio';
import { TRANSLATIONS } from '../data/translations';

interface Props {
  language: Language;
  preselectedProject?: string | null;
}

export const ContactSection: React.FC<Props> = ({ language, preselectedProject }) => {
  const t = TRANSLATIONS[language];

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState(
    preselectedProject ? `Custom Architecture based on: ${preselectedProject}` : ''
  );
  const [budgetRange, setBudgetRange] = useState('');
  const [timeline, setTimeline] = useState('');
  const [projectBrief, setProjectBrief] = useState(
    preselectedProject ? `We are interested in building an AI system similar to "${preselectedProject}". Specific requirements:` : ''
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // WhatsApp click handler with prefilled text
  const whatsappText = encodeURIComponent(
    language === 'ur'
      ? `سلام علی فہد! میں آپ کے AFA AI Developer پورٹ فولیو سے رابطہ کر رہا ہوں۔ میں ایک اے آئی پروجیکٹ پر گفتگو کرنا چاہتا ہوں۔`
      : `Hi Ali Fahad, I am contacting you through your AFA AI Developer portfolio. I would like to consult on an AI engineering project.`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappText}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newInquiry: ClientInquiry = {
      id: `inquiry-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || undefined,
      serviceNeeded: serviceNeeded || 'General AI Consulting',
      budgetRange: budgetRange || 'Flexible',
      timeline: timeline || 'Standard',
      projectBrief: projectBrief.trim(),
      createdAt: new Date().toISOString()
    };

    // Store in localStorage so user never loses leads
    try {
      const existingInquiries = JSON.parse(localStorage.getItem('afa_inquiries') || '[]');
      existingInquiries.push(newInquiry);
      localStorage.setItem('afa_inquiries', JSON.stringify(existingInquiries));
    } catch {
      // LocalStorage access safe fallback
    }

    setIsSubmitted(true);
  };

  const handleCopySummary = () => {
    const summaryText = `Project Inquiry for AFA AI Developer
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Service: ${serviceNeeded}
Budget: ${budgetRange}
Timeline: ${timeline}
Brief: ${projectBrief}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-cyan-400 font-mono tracking-wider uppercase mb-2">
            Start a Collaboration
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.contactHeading}
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Fast-Track Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Connect Box */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {t.directChatHeading}
                </h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  {t.directChatDesc}
                </p>
              </div>

              {/* WhatsApp Primary Fast-Connect Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold text-xs transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-emerald-200">{t.whatsappBtn}</div>
                    <div className="text-[11px] text-emerald-400/80 font-normal">Fastest Response (Avg &lt; 30 mins)</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Direct Email Button */}
              <a
                href="mailto:fahad6906ali@gmail.com?subject=AI%20Engineering%20Project%20Inquiry"
                className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-semibold text-xs transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-cyan-200">{t.emailBtn}</div>
                    <div className="text-[11px] text-cyan-400/80 font-mono font-normal">fahad6906ali@gmail.com</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Trust markers (Adjacency rule) */}
              <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Strict NDA and Intellectual Property protection assured.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Available for immediate sprint onboarding &amp; custom contracts.</span>
                </div>
              </div>
            </div>

            {/* Quick Profile Bio Card */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center font-display font-bold text-slate-950 text-sm">
                  AFA
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Ali Fahad (AFA)</h4>
                  <p className="text-xs text-slate-400">Lead AI &amp; Machine Learning Engineer</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'ur'
                  ? 'میں کلائنٹس اور کمپنیوں کے لیے ہائی پرفارمنس اے آئی ماڈلز، خودکار ایجنٹس اور فل اسٹیک پراڈکٹس بناتا ہوں جو پیچیدہ مسائل کو آسان بناتی ہیں۔'
                  : 'Dedicated to helping ambitious companies build production-grade AI applications with verified accuracy, resilient architecture, and measurable ROI.'}
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Proposal Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
              
              {isSubmitted ? (
                /* Success State */
                <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {t.formSuccessTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      {t.formSuccessDesc}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-left text-xs font-mono text-slate-400 space-y-1">
                    <div className="text-slate-300 font-semibold mb-1">Inquiry Record:</div>
                    <div>Name: {name}</div>
                    <div>Email: {email}</div>
                    <div>Service: {serviceNeeded || 'AI Engineering'}</div>
                    <div>Budget: {budgetRange || 'Standard'}</div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? t.copiedText : t.btnCopyBrief}</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setName('');
                        setEmail('');
                        setProjectBrief('');
                      }}
                      className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {t.btnSendAnother}
                    </button>
                  </div>
                </div>
              ) : (
                /* Proposal Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight mb-1">
                      {t.formHeading}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Fill out this brief to receive a customized architecture proposal and pricing estimate.
                    </p>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {t.formName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe / علی خان"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {t.formEmail} *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@company.com"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company and Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {t.formCompany}
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Startup or Organization"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {t.formService}
                      </label>
                      <select
                        value={serviceNeeded}
                        onChange={(e) => setServiceNeeded(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-cyan-400 transition-colors"
                      >
                        <option value="">{t.formServicePlaceholder}</option>
                        <option value="Autonomous Multi-Agent Workflow">{t.formServiceOpt1}</option>
                        <option value="Enterprise RAG & Semantic Search">{t.formServiceOpt2}</option>
                        <option value="Computer Vision & Edge Pipeline">{t.formServiceOpt3}</option>
                        <option value="Custom Fine-Tuning & LLMs">{t.formServiceOpt4}</option>
                        <option value="Full-Stack AI Application Development">{t.formServiceOpt5}</option>
                        <option value="AI Advisory & Code Audit">{t.formServiceOpt6}</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget and Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {t.formBudget}
                      </label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-cyan-400 transition-colors"
                      >
                        <option value="">Select Budget Range...</option>
                        <option value="$1,000 - $3,000">{t.formBudgetOpt1}</option>
                        <option value="$3,000 - $7,500">{t.formBudgetOpt2}</option>
                        <option value="$7,500 - $15,000+">{t.formBudgetOpt3}</option>
                        <option value="Monthly Retainer">{t.formBudgetOpt4}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {t.formTimeline}
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-cyan-400 transition-colors"
                      >
                        <option value="">Select Target Timeline...</option>
                        <option value="Urgent (1–2 weeks)">{t.formTimelineOpt1}</option>
                        <option value="Standard (3–6 weeks)">{t.formTimelineOpt2}</option>
                        <option value="Strategic / Ongoing">{t.formTimelineOpt3}</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Brief */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {t.formBrief}
                    </label>
                    <textarea
                      rows={3}
                      value={projectBrief}
                      onChange={(e) => setProjectBrief(e.target.value)}
                      placeholder={t.formBriefPlaceholder}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-400 transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.formSubmit}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
