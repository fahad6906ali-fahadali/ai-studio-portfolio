import React, { useState } from 'react';
import { ArrowRight, MessageSquare, Terminal, Cpu, Database, Network, ChevronRight } from 'lucide-react';
import { Language } from '../types/portfolio';
import { TRANSLATIONS } from '../data/translations';

interface Props {
  language: Language;
}

export const Hero: React.FC<Props> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'architecture' | 'telemetry'>('architecture');

  const whatsappMessage = encodeURIComponent(
    language === 'ur'
      ? 'سلام علی فہد! میں نے آپ کا AFA AI Developer پورٹ فولیو دیکھا اور میں ایک اے آئی پروجیکٹ کے بارے میں بات کرنا چاہتا ہوں۔'
      : 'Hi Ali Fahad, I reviewed your AFA AI Developer portfolio and would like to discuss an AI engineering project.'
  );
  // Default WhatsApp link format (user can also reach out via email fahad6906ali@gmail.com)
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-800/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Availability Kicker */}
            <div className="inline-flex items-center gap-2 mb-6 text-xs text-cyan-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1] max-w-2xl text-balance">
              <span>{t.heroTitlePrefix} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                {t.heroTitleHighlight}
              </span>
              <span> {t.heroTitleSuffix}</span>
            </h1>

            {/* Lead copy */}
            <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/30 whitespace-nowrap cursor-pointer"
              >
                <span>{t.btnExploreProjects}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{t.btnWhatsAppDirect}</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-slate-400 hover:text-white transition-colors whitespace-nowrap"
              >
                <span>{t.btnBookMeeting}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Direct contact hint */}
            <div className="mt-8 text-xs text-slate-400 flex items-center gap-2">
              <span>Direct inquiries:</span>
              <a 
                href="mailto:fahad6906ali@gmail.com" 
                className="text-cyan-400 hover:underline font-mono"
              >
                fahad6906ali@gmail.com
              </a>
              <span aria-hidden="true">·</span>
              <span>Ali Fahad (AFA)</span>
            </div>
          </div>

          {/* Right Column: Interactive AI Neural Console */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl backdrop-blur-md">
              {/* Card top bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  </div>
                  <span className="font-mono text-xs text-slate-400 ml-2">afa-agentic-cluster // prod</span>
                </div>

                {/* View switcher tabs */}
                <div className="flex items-center p-1 bg-slate-950/80 rounded-lg border border-slate-800/80">
                  <button
                    onClick={() => setActiveTab('architecture')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === 'architecture'
                        ? 'bg-slate-800 text-cyan-300 shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Graph
                  </button>
                  <button
                    onClick={() => setActiveTab('telemetry')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === 'telemetry'
                        ? 'bg-slate-800 text-cyan-300 shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Pipeline
                  </button>
                </div>
              </div>

              {activeTab === 'architecture' ? (
                /* Dynamic Interactive Node Graph */
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-950/50 border border-cyan-800/50 text-cyan-400">
                        <Network className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-200">Dispatcher Orchestrator</div>
                        <div className="text-[11px] text-slate-400">Gemini 2.5 Flash Reasoning Core</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">STATUS: OK</span>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center -my-1 text-slate-600">
                    <span className="text-xs">↓</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="flex items-center gap-2 mb-1">
                        <Database className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-xs font-medium text-slate-300">RAG Vector Hub</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Hybrid Dense + BM25</div>
                      <div className="text-[10px] font-mono text-cyan-400 mt-1.5">2.5M Embeddings</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="flex items-center gap-2 mb-1">
                        <Cpu className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-xs font-medium text-slate-300">Edge Inference</span>
                      </div>
                      <div className="text-[11px] text-slate-400">TensorRT Quantized</div>
                      <div className="text-[10px] font-mono text-purple-400 mt-1.5">16.4ms Latency</div>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center -my-1 text-slate-600">
                    <span className="text-xs">↓</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-slate-300">Self-Correcting Verification Loop</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">Hallucination &lt; 0.3%</span>
                  </div>
                </div>
              ) : (
                /* Live Telemetry View */
                <div className="font-mono text-xs space-y-2.5 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-slate-300">
                  <div className="text-[11px] text-cyan-400 font-semibold">[STREAM_INITIALIZED] Multi-Modal Socket</div>
                  <div className="text-[11px] text-slate-400">&gt; Ingesting user prompt audio frame (PCM 16kHz)</div>
                  <div className="text-[11px] text-slate-400">&gt; Acoustic acoustic-embed vector match: 0.982 cosine</div>
                  <div className="text-[11px] text-indigo-300">&gt; Tool Call: [ExecuteFinancialAuditSchema] (args: valid)</div>
                  <div className="text-[11px] text-emerald-400">&gt; Verification Pass: zero arithmetic discrepancies</div>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                    Memory: 42MB · TTFT: 118ms · Output Tokens: 840
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Full-width 4-Column KPI Strip below the split */}
        <div className="mt-16 pt-8 border-t border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-white mb-1 tabular-nums">
              {t.kpiSystemsValue}
            </div>
            <div className="text-xs text-slate-400 font-medium">
              {t.kpiSystems}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-cyan-400 mb-1 tabular-nums">
              {t.kpiLatencyValue}
            </div>
            <div className="text-xs text-slate-400 font-medium">
              {t.kpiLatency}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-indigo-400 mb-1 tabular-nums">
              {t.kpiAccuracyValue}
            </div>
            <div className="text-xs text-slate-400 font-medium">
              {t.kpiAccuracy}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400 mb-1 tabular-nums">
              {t.kpiRetentionValue}
            </div>
            <div className="text-xs text-slate-400 font-medium">
              {t.kpiRetention}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
