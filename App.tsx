import React, { useState } from 'react';
import { 
  ShoppingBag, 
  BarChart3, 
  HelpCircle,
  Command,
  Settings,
  Sparkles,
  X,
  BookOpen,
  Mail,
  Github,
  CheckCircle2
} from 'lucide-react';
import { cn } from './lib/utils';
import ConsumerConcierge from './components/ConsumerConcierge';
import BusinessDashboard from './components/BusinessDashboard';
import { motion, AnimatePresence } from 'motion/react';

import ResearchSurvey from './components/ResearchSurvey';
import { SurveyData } from './types';

type Role = 'consumer' | 'manager';

export default function App() {
  const [role, setRole] = useState<Role>('consumer');
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [hasCompletedSurvey, setHasCompletedSurvey] = useState(false);
  const [researchMode, setResearchMode] = useState(true);
  
  const handleSurveyComplete = (data: any) => {
    console.log('Survey Data Collected:', data);
    setHasCompletedSurvey(true);
    setShowSurvey(false);
  };
  
  return (
    <div className="min-h-screen font-sans bg-brand-bg transition-colors duration-500">
      {/* Top Navbar */}
      <nav className="h-24 px-10 bg-white/60 backdrop-blur-2xl sticky top-0 z-[100] flex items-center justify-between border-b border-gray-100/50 shadow-sm shadow-indigo-50/50">
        <div className="flex items-center gap-4 group cursor-default">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-14 h-14 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200"
          >
             <Command size={28} />
          </motion.div>
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none text-gray-800">OmniPredict</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mt-1">Contextual AI Research</p>
          </div>
        </div>

        {/* Role Toggle */}
        <div className="p-2 bg-gray-50/80 backdrop-blur-md rounded-[2rem] flex gap-2 border border-white shadow-inner">
          <button 
            onClick={() => setRole('consumer')}
            className={cn(
              "px-10 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3",
              role === 'consumer' 
                ? "bg-white text-indigo-600 shadow-xl shadow-indigo-100 scale-105" 
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            <ShoppingBag size={16} />
            Consumer
          </button>
          <button 
            onClick={() => setRole('manager')}
            className={cn(
              "px-10 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3",
              role === 'manager' 
                ? "bg-white text-emerald-600 shadow-xl shadow-emerald-100 scale-105" 
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            <BarChart3 size={16} />
            Business
          </button>
        </div>

        <div className="flex items-center gap-4">
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             onClick={() => setShowSurvey(true)}
             className={cn(
               "hidden md:flex items-center gap-3 px-6 py-3 border rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm transition-all cursor-pointer",
               hasCompletedSurvey 
                 ? "bg-green-50 border-green-100 text-green-600 shadow-green-50" 
                 : "bg-white border-indigo-50 text-indigo-600 shadow-indigo-50 hover:bg-indigo-50"
             )}
           >
              {hasCompletedSurvey ? (
                <>
                  <CheckCircle2 size={14} className="animate-pulse" />
                  Insight Contributed
                </>
              ) : (
                <>
                  <Sparkles size={14} className="animate-pulse" />
                  Contribute Research
                </>
              )}
           </motion.div>
           <button 
             onClick={() => setShowSettings(true)}
             className="p-4 hover:bg-white rounded-2xl text-gray-400 hover:text-indigo-600 transition-all hover:shadow-xl hover:shadow-indigo-50 border border-transparent hover:border-indigo-50"
           >
              <Settings size={22} />
           </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-10 mt-8">
        <header className="mb-16">
           <motion.div 
             initial={{ x: -20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             className="flex items-center gap-3 mb-4 text-indigo-600"
           >
              <div className="w-8 h-[3px] bg-indigo-600 rounded-full" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em]">
                {role === 'consumer' ? 'Decision Engine' : 'Strategic Portfolio'}
              </span>
           </motion.div>
           <motion.h2 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="text-7xl font-black tracking-tighter uppercase leading-[0.9] text-gray-800 italic"
           >
             {role === 'consumer' ? 'Where should we\nshop today?' : 'Predicting the\nChannel Shift'}
           </motion.h2>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -30 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {role === 'consumer' ? <ConsumerConcierge /> : <BusinessDashboard />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowHelp(true)}
        className="fixed bottom-12 right-12 w-20 h-20 bg-white text-indigo-600 rounded-[2.5rem] shadow-3xl flex items-center justify-center z-50 border-4 border-indigo-50 group transition-all hover:shadow-indigo-200"
      >
         <HelpCircle size={32} className="group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelp(false)}
              className="absolute inset-0 bg-brand-ink/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-[4rem] shadow-4xl relative z-10 overflow-hidden flex flex-col border-8 border-gray-50"
            >
              <div className="p-12 text-center space-y-8">
                 <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
                    <BookOpen size={40} />
                 </div>
                 <div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Project Abstract</h3>
                    <p className="text-gray-500 font-bold leading-relaxed">
                      OmniPredict is a research framework investigating how situational factors—like weather, urgency, and distance—impact the human decision to shop online vs. offline.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <a href="mailto:research@omnipredict.ai" className="p-6 bg-gray-50 rounded-[2rem] flex flex-col items-center gap-3 hover:bg-indigo-50 transition-colors group">
                       <Mail size={24} className="text-gray-400 group-hover:text-indigo-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-indigo-500">Contact Team</span>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="p-6 bg-gray-50 rounded-[2rem] flex flex-col items-center gap-3 hover:bg-indigo-50 transition-colors group">
                       <Github size={24} className="text-gray-400 group-hover:text-indigo-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-indigo-500">View Source</span>
                    </a>
                 </div>
                 <button 
                  onClick={() => setShowHelp(false)}
                  className="w-full bg-brand-ink text-white py-5 rounded-[2rem] font-black tracking-widest uppercase hover:bg-black transition-all shadow-xl active:scale-95"
                >
                  DISMISS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-brand-ink/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-[4rem] shadow-4xl relative z-10 overflow-hidden flex flex-col border-8 border-gray-50"
            >
              <div className="p-12 space-y-8">
                 <div className="flex justify-between items-center mb-8">
                   <h3 className="text-3xl font-black uppercase tracking-tighter italic">Platform Settings</h3>
                   <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-gray-50 rounded-full">
                     <X size={24} />
                   </button>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <div>
                        <p className="text-sm font-black text-gray-800">Advanced Research Mode</p>
                        <p className="text-[10px] text-gray-400 font-bold">Use qualitative survey data in model weights</p>
                      </div>
                      <button 
                        onClick={() => setResearchMode(!researchMode)}
                        className={cn(
                          "w-12 h-6 rounded-full transition-colors relative",
                          researchMode ? "bg-indigo-600" : "bg-gray-200"
                        )}
                      >
                        <motion.div 
                          animate={{ x: researchMode ? 24 : 4 }}
                          className="w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm"
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <div>
                        <p className="text-sm font-black text-gray-800">Dynamic UI Scaling</p>
                        <p className="text-[10px] text-gray-400 font-bold">Adjust transitions based on device performance</p>
                      </div>
                      <div className="w-12 h-6 rounded-full bg-indigo-600 relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" />
                      </div>
                    </div>
                 </div>

                 <button 
                  onClick={() => setShowSettings(false)}
                  className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-black tracking-widest uppercase hover:bg-indigo-700 transition-all shadow-xl active:scale-95"
                >
                  SAVE CHANGES
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Survey Modal */}
      <AnimatePresence>
        {showSurvey && (
          <ResearchSurvey 
            role={role}
            onComplete={handleSurveyComplete}
            onClose={() => setShowSurvey(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
