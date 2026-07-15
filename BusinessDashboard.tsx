import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  CloudRain, 
  Activity, 
  Zap, 
  ArrowUpRight,
  Package,
  Truck,
  Layers,
  ArrowRight,
  BrainCircuit
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const FEATURE_IMPORTANCE = [
  { name: 'Urgency', value: 35, color: '#6366F1' },
  { name: 'Weather', value: 25, color: '#A5B4FC' },
  { name: 'Pressure', value: 18, color: '#C7D2FE' },
  { name: 'Distance', value: 12, color: '#E0E7FF' },
  { name: 'Profile', value: 10, color: '#EEF2FF' },
];

const WEATHER_DATA = [
  { severity: 1, probability: 15 },
  { severity: 2, probability: 35 },
  { severity: 3, probability: 55 },
  { severity: 4, probability: 82 },
  { severity: 5, probability: 96 },
];

export default function BusinessDashboard() {
  return (
    <div className="space-y-10 pb-12">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <KPIBox label="Channel Shift" value="+24%" sub="Online Surge" icon={<TrendingUp />} trend="up" delay={0} />
        <KPIBox label="Stock Health" value="92%" sub="Inventory Good" icon={<Package />} trend="up" delay={0.1} />
        <KPIBox label="Active Nodes" value="14.2k" sub="Peak Load" icon={<Users />} delay={0.2} />
        <KPIBox label="Fulfillment" value="98%" sub="On Time" icon={<Truck />} trend="up" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-10">
          {/* Main Chart Card */}
          <div className="cute-card overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                   <Layers size={14} className="text-indigo-400" />
                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Demand Analytics</h3>
                </div>
                <h3 className="text-3xl font-black italic tracking-tighter uppercase text-gray-800">Weather-Demand Correlation</h3>
                <p className="text-sm text-gray-400 font-bold mt-1">Predicting channel switching behavior vs. storm severity</p>
              </div>
              <div className="flex gap-2 p-2 bg-gray-50 rounded-[1.5rem] border border-gray-100">
                 <button className="px-6 py-2 bg-white text-gray-400 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest hover:text-indigo-600 transition-colors">7 Days</button>
                 <button className="px-6 py-2 bg-indigo-600 text-white rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100">Live</button>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WEATHER_DATA}>
                  <defs>
                    <linearGradient id="managerGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="severity" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }}
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '2rem', 
                      border: 'none', 
                      boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', 
                      padding: '24px',
                      fontFamily: 'Quicksand',
                      fontWeight: 'bold'
                    }}
                    cursor={{ stroke: '#6366F1', strokeWidth: 2, strokeDasharray: '4 4' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="probability" 
                    stroke="#6366F1" 
                    strokeWidth={6} 
                    fillOpacity={1} 
                    fill="url(#managerGrad)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[4rem] border-4 border-indigo-50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl">
                 <BrainCircuit size={32} />
              </div>
              <div>
                <h4 className="text-3xl font-black italic tracking-tighter uppercase text-gray-800">Research Enrichment</h4>
                <p className="text-sm text-gray-400 font-bold max-w-sm">Weight calibration currently leveraging 22 qualitative inputs for improved channel mapping accuracy.</p>
              </div>
            </div>
            <div className="px-8 py-4 bg-emerald-50 text-emerald-600 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-emerald-100">
               <Activity size={14} />
               Active Calibration
            </div>
          </div>
        </div>

        {/* Tactical Directives Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <section className="bg-indigo-950 text-white p-12 rounded-[4rem] space-y-10 shadow-3xl shadow-indigo-100 relative overflow-hidden border-8 border-white">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-20 -translate-y-20 blur-2xl" />
            
            <div className="flex items-center gap-4">
               <div className="p-3 bg-indigo-500 rounded-2xl shadow-xl shadow-indigo-400/20">
                  <Activity size={24} className="text-white" />
               </div>
               <h3 className="font-black text-xl uppercase tracking-tighter italic text-white">Tactical Directives</h3>
            </div>

            <div className="space-y-10">
              <Directive 
                icon={<CloudRain className="text-rose-400" />}
                title="Logistics Risk"
                text="High switching predicted for 18:00. Suggest activating third-party courier fallback."
              />
              <Directive 
                icon={<Users className="text-cyan-400" />}
                title="Labor Shift"
                text="Urgency trends are low. Re-assign 2 store associates to click-and-collect packing."
              />
              <Directive 
                icon={<Zap className="text-amber-400" />}
                title="Campaign Trigger"
                text="Storm detected. Auto-launch 'Home Movie Night' grocery bundles for Online App users."
              />
            </div>

            <button className="w-full py-5 bg-white text-indigo-950 rounded-[2rem] font-black tracking-widest uppercase text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-3 active:scale-95">
               EXECUTE ALL BATCHES
               <ArrowRight size={16} />
            </button>
          </section>

          <aside className="cute-card">
            <div className="flex items-center gap-2 mb-8 border-b border-gray-50 pb-6">
               <Zap size={14} className="text-indigo-400" />
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Variable Dominance</p>
            </div>
            <div className="space-y-6">
               {FEATURE_IMPORTANCE.map((f, i) => (
                 <div key={f.name} className="space-y-3">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                       <span className="text-gray-800">{f.name}</span>
                       <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">{(f.value * 1.2).toFixed(1)}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100/50 p-0.5">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${f.value}%` }}
                        transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                        className="h-full bg-indigo-500 rounded-full shadow-sm" 
                       />
                    </div>
                 </div>
               ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function KPIBox({ label, value, sub, icon, trend, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="cute-card relative group hover:scale-[1.05] transition-all duration-500 cursor-default border-4 border-transparent hover:border-indigo-50"
    >
       <div className="p-4 bg-indigo-50 text-indigo-600 rounded-[1.5rem] w-fit mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
          {icon}
       </div>
       <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{label}</p>
            <p className="text-4xl font-black italic text-gray-800">{value}</p>
            <p className="text-[11px] font-bold text-emerald-500 mt-2 flex items-center gap-1">
               {sub}
            </p>
          </div>
          {trend && (
             <div className="p-2 px-3 bg-emerald-50 text-emerald-600 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm border border-emerald-100">
                <ArrowUpRight size={12} />
                LIVE
             </div>
          )}
       </div>
    </motion.div>
  );
}

function Directive({ icon, title, text }: any) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <motion.div 
      layout
      className="space-y-4 group cursor-pointer" 
      onClick={() => setDismissed(true)}
    >
      <div className="flex items-center gap-4">
         <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-all duration-500">
            {icon}
         </div>
         <p className="font-black text-sm uppercase tracking-[0.2em] text-white italic group-hover:text-indigo-300 transition-colors">{title}</p>
      </div>
      <div className="pl-16 space-y-3">
        <p className="text-xs text-white/70 leading-relaxed font-bold group-hover:text-white transition-colors">
          {text}
        </p>
        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-400 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          Click to Acknowledge
        </p>
      </div>
    </motion.div>
  );
}
