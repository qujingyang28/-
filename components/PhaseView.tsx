import React from 'react';
import { PhaseData } from '../types';
import CodeBlock from './CodeBlock';
import { AlertTriangle, Lightbulb, ChevronRight } from 'lucide-react';

interface PhaseViewProps {
  phase: PhaseData;
}

const PhaseView: React.FC<PhaseViewProps> = ({ phase }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/30 text-brand-500 text-xs font-medium mb-4 border border-brand-900/50">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
          Current Step
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          {phase.title}
        </h2>
        <p className="text-lg text-slate-400">{phase.subtitle}</p>
        
        <div className="mt-6 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-300 flex items-start gap-2">
            <span className="bg-brand-500/20 text-brand-400 p-1 rounded-md shrink-0 mt-0.5">
              <ChevronRight size={16} />
            </span>
            {phase.description}
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        {phase.steps.map((step, index) => (
          <div key={index} className="relative pl-8 border-l-2 border-slate-700 pb-8 last:border-l-0 last:pb-0">
            {/* Timeline dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-brand-500"></div>
            
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <span className="text-brand-500">0{index + 1}.</span> {step.title}
            </h3>
            
            <p className="text-slate-300 leading-relaxed mb-4">
              {step.content}
            </p>

            {step.code && <CodeBlock code={step.code} language="bash" />}

            {step.warning && (
              <div className="mt-4 p-4 rounded-lg bg-red-900/20 border border-red-900/50 flex gap-3 items-start">
                <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                <div className="text-sm text-red-200/90">
                  <span className="font-bold block text-red-400 mb-1">注意坑点</span>
                  {step.warning.split('\n').map((line, i) => (
                     <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            {step.tips && step.tips.length > 0 && (
              <div className="mt-4 p-4 rounded-lg bg-yellow-900/10 border border-yellow-900/30 flex gap-3 items-start">
                <Lightbulb className="text-yellow-500 shrink-0 mt-0.5" size={18} />
                <div className="text-sm text-yellow-200/80">
                  <span className="font-bold block text-yellow-500 mb-1">新手 Tips</span>
                  <ul className="list-disc list-inside space-y-1">
                    {step.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhaseView;