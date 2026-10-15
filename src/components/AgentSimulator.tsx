import React, { useState } from 'react';
import { Play, RotateCw, CheckCircle, Brain, Wrench, Eye, Sparkles } from 'lucide-react';
import { Language, AgentStep } from '../types/portfolio';
import { TRANSLATIONS } from '../data/translations';

interface Props {
  language: Language;
}

export const AgentSimulator: React.FC<Props> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const scenarios = [
    {
      id: 'financial',
      title: t.task1,
      steps: [
        {
          phase: 'thought',
          label: 'Reasoning & Planning',
          detail: 'Deconstructing user request: Target Q3 10-K filing. Need to isolate Balance Sheet Table 4A and reconcile Operating Leases with Note 12.',
          timestamp: '+14ms'
        },
        {
          phase: 'tool',
          label: 'Tool: [sec_edgar_retriever]',
          detail: 'Calling SEC Edgar API -> filing_type: "10-Q", cik: "0001018724", period: "2025-09-30". Ingesting 48 pages.',
          timestamp: '+86ms'
        },
        {
          phase: 'observation',
          label: 'Observation & Neural Rerank',
          detail: 'Retrieved 8 tabular chunks. Vector similarity: 0.941. Isolated Table 4A: Operating lease right-of-use assets = $14,280M.',
          timestamp: '+152ms'
        },
        {
          phase: 'output',
          label: 'Synthesized Verification',
          detail: 'Reconciliation verified: Operating leases correctly match Note 12 disclosure with 0 discrepancy. Generated audited report package with source citations.',
          timestamp: '+210ms'
        }
      ] as AgentStep[]
    },
    {
      id: 'vision',
      title: language === 'ur' ? 'کمپیوٹر وژن سے صنعتی مائیکرو کریک اسکیننگ' : 'Automated Edge Vision Defect Isolation',
      steps: [
        {
          phase: 'thought',
          label: 'Visual Frame Ingestion',
          detail: 'Acquiring 4K RTSP stream frame from manufacturing cell 04. Normalizing color space to YUV420 for TensorRT engine.',
          timestamp: '+4ms'
        },
        {
          phase: 'tool',
          label: 'Tool: [yolo11_edge_inference]',
          detail: 'Invoked Quantized FP16 TensorRT engine on NVIDIA Jetson Orin Nano. Executing non-maximum suppression (IoU threshold: 0.45).',
          timestamp: '+16ms'
        },
        {
          phase: 'observation',
          label: 'Observation & Segmentation',
          detail: 'Detected structural fissure at [x: 412, y: 188, w: 24, h: 62]. Confidence: 99.72%. Anomaly classified: Class 3 Surface Fracture.',
          timestamp: '+22ms'
        },
        {
          phase: 'output',
          label: 'Robotic Actuation Alert',
          detail: 'Dispatched MQTT message to PLC reject diverter arm. Logged defect telemetry to Central Quality DB with annotated bounding box.',
          timestamp: '+29ms'
        }
      ] as AgentStep[]
    },
    {
      id: 'rag',
      title: language === 'ur' ? 'انٹرپرائز نالج بیس ہائبرڈ ویکٹر سرچ' : 'Multi-Vector Enterprise Knowledge Retrieval',
      steps: [
        {
          phase: 'thought',
          label: 'Query Expansion & HyDE',
          detail: 'Synthesizing hypothetical document embedding (HyDE) for user question: "What is the failover protocol for cluster AZ-East-1?"',
          timestamp: '+32ms'
        },
        {
          phase: 'tool',
          label: 'Tool: [pinecone_hybrid_query]',
          detail: 'Executing dual search: 1536-dim text-embedding-3-large + BM25 sparse keyword matching with alpha weighting 0.7.',
          timestamp: '+94ms'
        },
        {
          phase: 'observation',
          label: 'Reciprocal Rank Fusion',
          detail: 'Fused 50 candidate passages. Applied cross-encoder reranker. Top passage found in "Disaster Recovery Playbook v4.2", page 38.',
          timestamp: '+140ms'
        },
        {
          phase: 'output',
          label: 'Grounded Answer Formulation',
          detail: 'Failover initiates within 45s via DNS health check rerouting to AZ-East-2. Cited Playbook Sec 4.1 with verifiable checksum.',
          timestamp: '+178ms'
        }
      ] as AgentStep[]
    }
  ];

  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // by default completed
  const [isRunning, setIsRunning] = useState(false);

  const currentScenario = scenarios[selectedScenarioIndex];

  const handleRunSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStepIndex(0);

    const stepInterval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev < currentScenario.steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setIsRunning(false);
          return prev;
        }
      });
    }, 600);
  };

  const getPhaseIcon = (phase: AgentStep['phase']) => {
    switch (phase) {
      case 'thought':
        return <Brain className="w-4 h-4 text-cyan-400" />;
      case 'tool':
        return <Wrench className="w-4 h-4 text-amber-400" />;
      case 'observation':
        return <Eye className="w-4 h-4 text-indigo-400" />;
      case 'output':
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="agent-simulator" className="py-16 md:py-24 border-b border-slate-800/60 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-cyan-400 font-mono tracking-wider uppercase mb-2">
            Hands-on Engineering Sandbox
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.simulatorHeading}
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.simulatorSubtitle}
          </p>
        </div>

        {/* Sandbox Console Container */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-5 sm:p-7">
          
          {/* Top Controls: Scenario Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {t.taskSelectorLabel}
              </label>
              <div className="flex flex-wrap gap-2">
                {scenarios.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setSelectedScenarioIndex(idx);
                      setActiveStepIndex(sc.steps.length - 1);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left ${
                      selectedScenarioIndex === idx
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/80'
                        : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {sc.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Run Button */}
            <div className="shrink-0">
              <button
                onClick={handleRunSimulation}
                disabled={isRunning}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow-sm shadow-cyan-500/20"
              >
                {isRunning ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{t.statusSimulating}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{t.btnRunSimulation}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Reasoning Steps Visualization */}
          <div className="space-y-4">
            {currentScenario.steps.map((step, idx) => {
              const isRevealed = idx <= activeStepIndex;
              const isCurrent = idx === activeStepIndex && isRunning;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    isRevealed
                      ? isCurrent
                        ? 'bg-slate-950 border-cyan-400/80 shadow-md shadow-cyan-950/50'
                        : 'bg-slate-950/70 border-slate-800'
                      : 'opacity-30 bg-slate-950/20 border-slate-900 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-md bg-slate-900 border border-slate-800">
                        {getPhaseIcon(step.phase)}
                      </span>
                      <span className="text-xs font-semibold text-white font-mono">
                        0{idx + 1}. {step.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-cyan-400">
                        {step.timestamp}
                      </span>
                      {isRevealed && !isCurrent && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-mono pl-8 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Telemetry Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 gap-3">
            <span>ORCHESTRATION: Gemini 2.5 + LangGraph Engine</span>
            <span>TOKEN STREAM: Active · 0 Discrepancy Rate</span>
            <span>INFRASTRUCTURE: Asynchronous Python 3.12 / FastAPI</span>
          </div>

        </div>

      </div>
    </section>
  );
};
