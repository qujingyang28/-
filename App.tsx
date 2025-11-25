import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PhaseView from './components/PhaseView';
import Toolbox from './components/Toolbox';
import { PHASES } from './constants';

export default function App() {
  const [activePhaseId, setActivePhaseId] = useState<number>(1);
  const [showTools, setShowTools] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentPhase = PHASES.find(p => p.id === activePhaseId) || PHASES[0];

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-brand-500/30">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar 
          activePhase={activePhaseId} 
          setActivePhase={setActivePhaseId} 
          showTools={showTools}
          setShowTools={setShowTools}
        />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-800 z-50 px-4 py-3 flex justify-between items-center">
        <div className="font-bold text-white">JAKA AI Guide</div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-900 pt-16 px-4 overflow-y-auto">
           <nav className="space-y-2">
             {PHASES.map((phase) => (
               <button
                 key={phase.id}
                 onClick={() => {
                   setActivePhaseId(phase.id);
                   setShowTools(false);
                   setMobileMenuOpen(false);
                 }}
                 className={`w-full text-left px-4 py-3 rounded-lg border border-slate-800 ${
                   activePhaseId === phase.id && !showTools ? 'bg-brand-600 text-white' : 'text-slate-400'
                 }`}
               >
                 {phase.title}
               </button>
             ))}
             <button
                onClick={() => {
                  setShowTools(true);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg border border-slate-800 mt-4 ${
                   showTools ? 'bg-purple-600 text-white' : 'text-slate-400'
                 }`}
             >
               工具箱
             </button>
           </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 md:ml-0 mt-16 md:mt-0 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          {showTools ? (
            <Toolbox />
          ) : (
            <PhaseView phase={currentPhase} />
          )}
        </div>
        
        <footer className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-600 text-sm">
          <p>JAKA Palletizing Robot Project &copy; {new Date().getFullYear()}</p>
          <p className="mt-1">Based on LeRobot & Diffusion Policy</p>
        </footer>
      </main>
    </div>
  );
}