import React from 'react';
import { Box, Wrench } from 'lucide-react';
import { PHASES } from '../constants';
import { PhaseData } from '../types';

interface SidebarProps {
  activePhase: number;
  setActivePhase: (id: number) => void;
  showTools: boolean;
  setShowTools: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePhase, setActivePhase, showTools, setShowTools }) => {
  return (
    <aside className="w-full md:w-72 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 text-brand-500 mb-1">
          <Box size={28} strokeWidth={2} />
          <h1 className="text-xl font-bold tracking-tight text-white">JAKA 具身智能</h1>
        </div>
        <p className="text-xs text-slate-500 pl-10">新手实战指南</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
          实施流程
        </div>
        
        {PHASES.map((phase) => (
          <button
            key={phase.id}
            onClick={() => {
              setActivePhase(phase.id);
              setShowTools(false);
            }}
            className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              activePhase === phase.id && !showTools
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <phase.icon size={20} className={activePhase === phase.id && !showTools ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'} />
            <div className="flex flex-col">
              <span className="font-medium text-sm">Phase {phase.id}</span>
              <span className={`text-xs truncate w-40 ${activePhase === phase.id && !showTools ? 'text-brand-100' : 'text-slate-500'}`}>
                {phase.title.split('：')[1] || phase.title}
              </span>
            </div>
          </button>
        ))}

        <div className="my-4 border-t border-slate-800"></div>

        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
          资源
        </div>

        <button
          onClick={() => setShowTools(true)}
          className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            showTools
              ? 'bg-purple-600 text-white shadow-lg' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Wrench size={20} />
          <span className="font-medium text-sm">工具箱 & 检查单</span>
        </button>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3 text-xs text-slate-500">
          <p className="font-semibold text-slate-400 mb-1">Tip of the day:</p>
          “先跑通最简单的动作，建立信心最重要！”
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;