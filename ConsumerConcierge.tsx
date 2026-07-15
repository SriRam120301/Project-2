import React, { useState, useMemo } from 'react';
import { 
  CloudRain, 
  Clock, 
  MapPin, 
  Zap, 
  ShoppingBag, 
  ArrowRight,
  TrendingUp,
  Leaf,
  DollarSign,
  Coffee,
  X,
  Sparkles,
  Gift,
  Store
} from 'lucide-react';
import { cn } from '../lib/utils';
import { predictChannel } from '../lib/model';
import { INITIAL_SITUATION, INITIAL_DEMOGRAPHICS } from '../constants';
import { SituationalVariables, Demographics } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { generateShoppingReport } from '../services/gemini';
import Markdown from 'react-markdown';

export default function ConsumerConcierge() {
  const [situation, setSituation] = useState<SituationalVariables>(INITIAL_SITUATION);
  const [demographics, setDemographics] = useState<Demographics>(INITIAL_DEMOGRAPHICS);
  const [category, setCategory] = useState('Groceries');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportText, setReportText] = useState<string | null>(null);

  const result = useMemo(() => predictChannel(situation, demographics), [situation, demographics]);

  const handleActivate = async () => {
    setIsGenerating(true);
    const report = await generateShoppingReport(situation, demographics, result, category);
    setReportText(report);
    setIsGenerating(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
      {/* Left: Input Panel */}
      <div className="lg:col-span-5 space-y-6">
        <section className="cute-card hover:shadow-xl transition-shadow duration-500">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-gray-800">Shopping Concierge</h2>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em] mt-1">AI-Powered Decisions</p>
            </div>
            <motion.div 
              whileHover={{ rotate: 180 }}
              className="p-3 bg-indigo-50 rounded-2xl text-indigo-500"
            >
               <Coffee size={20} />
            </motion.div>
          </div>

          <div className="space-y-10">
            <div>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-4">What's in your cart today?</p>
              <div className="flex flex-wrap gap-3">
                {['Groceries', 'Electronics', 'Medicine', 'Fashion'].map(c => (
                  <button 
                    key={c}
                    onClick={() => setCategory(c)}
                    className={cn(
                      "group relative px-6 py-4 rounded-[1.5rem] text-sm font-bold transition-all border-2 overflow-hidden",
                      category === c 
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100" 
                        : "bg-white border-gray-100 text-gray-400 hover:border-indigo-100 hover:text-indigo-400"
                    )}
                  >
                    <span className="relative z-10">{c}</span>
                    {category === c && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute inset-0 bg-indigo-600 -z-10"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <ConciergeSlider 
                label="Weather Mood"
                icon={<CloudRain size={16} />}
                value={situation.weatherSeverity}
                min={1} max={5}
                leftLabel="Sunny" rightLabel="Stormy"
                onChange={(v: number) => setSituation(s => ({ ...s, weatherSeverity: v }))}
              />
              <ConciergeSlider 
                label="How Urgent?"
                icon={<Clock size={16} />}
                value={situation.productUrgency}
                min={1} max={5}
                leftLabel="Chilled" rightLabel="Pronto!"
                onChange={(v: number) => setSituation(s => ({ ...s, productUrgency: v }))}
              />
              <ConciergeSlider 
                label="Distance to Shop"
                icon={<MapPin size={16} />}
                value={situation.storeDistance}
                min={1} max={15}
                unit="KM"
                onChange={(v: number) => setSituation(s => ({ ...s, storeDistance: v }))}
              />
            </div>
          </div>
        </section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-success text-white p-8 rounded-[2.5rem] flex gap-5 items-center shadow-xl shadow-green-100 border-4 border-white"
        >
          <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-sm">
            <Leaf size={28} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100 mb-1">Earth First</p>
            <p className="text-lg font-bold leading-tight">
              Choosing {result.preferredChannel === 'Online' ? 'Delivery' : 'Local'} saves ~12% CO2! 🌱
            </p>
          </div>
        </motion.section>
      </div>

      {/* Right: Recommendation Panel */}
      <div className="lg:col-span-7">
        <motion.div 
          layout
          className={cn(
            "h-full min-h-[600px] p-12 rounded-[4rem] text-white flex flex-col justify-between relative overflow-hidden transition-all duration-1000 shadow-3xl",
            result.preferredChannel === 'Online' 
              ? "bg-indigo-600 shadow-indigo-100" 
              : "bg-emerald-600 shadow-emerald-100"
          )}
        >
          {/* Playful Floating Elements */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-20 text-white/10"
          >
            <Sparkles size={200} strokeWidth={1} />
          </motion.div>

          <div className="relative z-10">
            <div className="flex justify-between items-start">
               <span className="px-6 py-3 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 backdrop-blur-md">
                 Smart Suggestion
               </span>
               <div className="text-right">
                 <p className="text-7xl font-black italic">{result.probability}%</p>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Confidence Level</p>
               </div>
            </div>

            <div className="mt-20 flex items-center gap-10">
              <motion.div 
                key={result.preferredChannel}
                initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: 5, opacity: 1 }}
                className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center text-indigo-600 shadow-2xl"
              >
                 {result.preferredChannel === 'Online' ? <ShoppingBag size={56} /> : <Store size={56} />}
              </motion.div>
              <div>
                <h2 className="text-7xl font-black tracking-tighter leading-[0.8] mb-4 italic uppercase">
                   {result.preferredChannel} {result.probability}%
                </h2>
                <p className="text-2xl font-bold opacity-80">Highly Recommended for {category} ✨</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-8 bg-white/10 border border-white/20 rounded-[2.5rem] flex items-center gap-6 backdrop-blur-md group hover:bg-white/20 transition-all">
                <div className="p-4 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform">
                   <Gift className="text-white" size={32} />
                </div>
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Unlock Savings</p>
                   {result.preferredChannel === 'Online' ? (
                     <button 
                       onClick={() => {
                         navigator.clipboard.writeText('OMNI-SAVE-ONLINE');
                       }}
                       className="space-y-1 text-left hover:opacity-80 transition-opacity"
                     >
                        <p className="text-lg font-black italic">OMNI-SAVE-ONLINE</p>
                        <p className="text-[10px] font-bold opacity-70 cursor-pointer">FREE DELIVERY + 10% OFF [TAP TO COPY]</p>
                     </button>
                   ) : (
                     <button 
                       onClick={() => {
                         navigator.clipboard.writeText('RETAIL-ROCKSTAR-15');
                       }}
                       className="space-y-1 text-left hover:opacity-80 transition-opacity"
                     >
                        <p className="text-lg font-black italic">RETAIL-ROCKSTAR-15</p>
                        <p className="text-[10px] font-bold opacity-70 cursor-pointer">15% INSTANT IN-STORE [TAP TO COPY]</p>
                     </button>
                   )}
                </div>
             </div>
             <div className="grid grid-cols-3 gap-4">
                <ImpactBox 
                  label="Time Save" 
                  value={result.preferredChannel === 'Online' ? '45 min' : 'Instant'} 
                  icon={<Clock size={20} />} 
                  delay={0.1}
                />
                <ImpactBox 
                  label="Est. Cost" 
                  value={result.preferredChannel === 'Online' ? '$1.99' : '$4.50'} 
                  icon={<DollarSign size={20} />} 
                  delay={0.2}
                />
                <ImpactBox 
                  label="Mood" 
                  value={situation.socialInfluence ? 'Social' : 'Focus'} 
                  icon={<Sparkles size={20} />} 
                  delay={0.3}
                />
             </div>
          </div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="relative z-10 bg-white shadow-2xl rounded-[3rem] p-10 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="max-w-md text-gray-900">
               <h4 className="text-3xl font-black tracking-tight mb-2">Ready to purchase?</h4>
               <p className="text-gray-500 font-bold leading-relaxed">
                 We've found a 15% discount for your {result.preferredChannel === 'Online' ? 'Online App' : 'Physical Store'} choice. 
                 Valid for the next 20 minutes.
               </p>
            </div>
            <button 
              id="report-button"
              onClick={handleActivate}
              disabled={isGenerating}
              className={cn(
                "group px-12 py-6 bg-brand-ink text-white rounded-full font-black uppercase tracking-widest text-sm flex items-center gap-4 transition-all hover:bg-black hover:shadow-2xl active:scale-95 disabled:bg-gray-300",
                isGenerating && "animate-pulse"
              )}
            >
              <span className="relative z-10">
                {isGenerating ? 'BREWING...' : 'ACTIVATE NOW'}
              </span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-indigo-300"
          >
             <div className="h-px flex-1 bg-white/10" />
             <span className="flex items-center gap-2">
               Research Contribution Status: 
               <span className="text-white bg-white/10 px-3 py-1 rounded-full">Pending Data</span>
             </span>
             <div className="h-px flex-1 bg-white/10" />
          </motion.div>
        </motion.div>
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {reportText && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReportText(null)}
              className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-white w-full max-w-2xl max-h-[80vh] rounded-[3.5rem] shadow-3xl relative z-10 overflow-hidden flex flex-col border-8 border-gray-50"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-indigo-50/50">
                 <div className="flex items-center gap-3">
                    <Sparkles className="text-indigo-500" />
                    <h3 className="text-xl font-black uppercase tracking-tighter italic text-indigo-600">AI Research Insight</h3>
                 </div>
                 <button 
                   onClick={() => setReportText(null)}
                   className="p-3 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-900"
                 >
                   <X size={24} />
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-10 prose prose-indigo max-w-none prose-p:font-bold prose-p:text-gray-600 prose-headings:font-black prose-headings:italic">
                 <Markdown>{reportText}</Markdown>
              </div>
              <div className="p-8 bg-gray-50 border-t border-gray-100">
                <button 
                  onClick={() => setReportText(null)}
                  className="w-full bg-indigo-600 text-white py-4 rounded-3xl font-black tracking-widest uppercase hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
                >
                  REVIEW COMPLETE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ConciergeSlider({ label, value, min, max, leftLabel, rightLabel, unit, icon, onChange }: any) {
  return (
    <div className="space-y-4 group">
      <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-indigo-400 transition-colors">
        <div className="flex items-center gap-2">
           <span className={cn("transition-transform group-hover:scale-125")}>{icon}</span>
           <span>{label}</span>
        </div>
        <span className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{leftLabel || rightLabel ? (value > 3 ? rightLabel : leftLabel) : `${value} ${unit || ''}`}</span>
      </div>
      <input 
        type="range"
        min={min} max={max}
        className="w-full h-3"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function ImpactBox({ label, value, icon, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-8 bg-white/10 border border-white/10 rounded-[2.5rem] space-y-4 hover:bg-white/20 transition-all cursor-default border-dashed"
    >
      <div className="p-3 bg-white/10 w-fit rounded-2xl ring-4 ring-white/5">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">{label}</p>
        <p className="text-xl font-black leading-tight italic">{value}</p>
      </div>
    </motion.div>
  );
}
