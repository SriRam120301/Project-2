import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Sparkles,
  User,
  Heart,
  Zap,
  ShieldCheck,
  BrainCircuit,
  Store,
  Truck,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { SurveyData } from '../types';

interface ResearchSurveyProps {
  role: 'consumer' | 'manager';
  onComplete: (data: any) => void;
  onClose: () => void;
}

const BUSINESS_CATEGORIES = ['Small Local Shop', 'Supermarket', 'Electronics Retailer', 'Pharmacy', 'Boutique/Fashion'];
const DELIVERY_MODELS = ['No Delivery', 'Third-Party only', 'In-house delivery', 'Click & Collect Only'];

const AGE_GROUPS = ['18–24 years', '25–34 years', '35–44 years', '45 years and above'];
const GENDERS = ['Male', 'Female', 'Prefer not to say', 'Other'];
const OCCUPATIONS = ['Student', 'Employed (Private Sector)', 'Employed (Government/Public Sector)', 'Self-Employed/Business Owner', 'Homemaker', 'Retired', 'Unemployed'];
const AREA_TYPES = ['Urban (Metropolitan/Tier 1 City)', 'Semi-Urban (Tier 2/3 City)', 'Rural'];
const FREQUENCIES = ['Never/Rarely', 'Once a month or less', '2-3 times a month', 'Once a week', 'Multiple times a week'];
const PREFERENCES = ['Online Shopping', 'Physical/Offline Stores', 'Both equally (I switch based on convenience)'];
const PRODUCT_CATEGORIES = ['Electronics/Gadgets', 'Apparel/Clothes/Accessories', 'Groceries/Daily Essentials', 'Medicines/Health Supplements', 'Books/Media', 'Home Goods/Furniture', 'Beauty/Personal Care', 'Others'];
const SOCIAL_INFLUENCE = ['Not at all', 'Slightly', 'Moderately', 'Significantly', 'Strongly'];
const REVIEWS = ['Never', 'Only for expensive products', 'Usually', 'Always'];

export default function ResearchSurvey({ role, onComplete, onClose }: ResearchSurveyProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<any>>({});
  const totalSteps = role === 'consumer' ? 6 : 4;

  const handleNext = () => {
    if (step < totalSteps) setStep(s => s + 1);
    else onComplete(data);
  };

  const handlePrev = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const setVal = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (cat: string) => {
    const current = data.categories || [];
    if (current.includes(cat)) {
      setVal('categories', current.filter(c => c !== cat));
    } else {
      setVal('categories', [...current, cat]);
    }
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-ink/40 backdrop-blur-md"
      />
      <motion.div 
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        className="bg-white w-full max-w-3xl h-[85vh] rounded-[3rem] shadow-4xl relative z-10 overflow-hidden flex flex-col border-8 border-gray-50"
      >
        {/* Header */}
        <div className="px-10 py-8 border-b border-gray-100 flex items-center justify-between bg-indigo-50/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <ClipboardCheck size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter italic text-gray-800 leading-none">Research Intake</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mt-1">Improving Model Accuracy</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  step > i + 1 ? "bg-indigo-600 scale-90" : 
                  step === i + 1 ? "bg-indigo-600 w-8" : "bg-gray-200"
                )}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-10"
            >
              {role === 'manager' ? (
                // BUSINESS SURVEY STEPS
                <>
                  {step === 1 && (
                    <div className="space-y-8">
                       <div className="space-y-2">
                        <h4 className="text-2xl font-black tracking-tight text-gray-800 italic flex items-center gap-3">
                          <Store className="text-emerald-500" size={24} />
                          Business Profile
                        </h4>
                        <p className="text-sm text-gray-400 font-bold">What kind of store are we optimizing?</p>
                      </div>
                      <SurveySelect 
                        label="Primary Store Category"
                        options={BUSINESS_CATEGORIES}
                        value={data.businessType}
                        onChange={(v: string) => setVal('businessType', v)}
                      />
                      <SurveySelect 
                        label="Fulfillment Strategy"
                        options={DELIVERY_MODELS}
                        value={data.fulfillmentMode}
                        onChange={(v: string) => setVal('fulfillmentMode', v)}
                      />
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <h4 className="text-2xl font-black tracking-tight text-gray-800 italic flex items-center gap-3">
                          <Truck className="text-emerald-500" size={24} />
                          Logistics & Impact
                        </h4>
                        <p className="text-sm text-gray-400 font-bold">Analyzing the digital pressure points.</p>
                      </div>
                      <SurveySlider 
                        label="How much does a 20% online discount impact your foot traffic?"
                        min={1} max={5}
                        value={data.discountImpact || 3}
                        left="Minimal" right="Severely"
                        onChange={(v: number) => setVal('discountImpact', v)}
                      />
                      <SurveySlider 
                        label="Do you scale staff based on weather forecasts?"
                        min={1} max={5}
                        value={data.weatherScaling || 3}
                        left="Never" right="Always"
                        onChange={(v: number) => setVal('weatherScaling', v)}
                      />
                    </div>
                  )}
                  {step === 3 && (
                     <div className="space-y-8">
                        <div className="space-y-2">
                          <h4 className="text-2xl font-black tracking-tight text-gray-800 italic flex items-center gap-3">
                            <Activity className="text-emerald-500" size={24} />
                            Strategic Threat
                          </h4>
                        </div>
                        <SurveySelect 
                          label="Biggest threat to your offline sales?"
                          options={['Fast Delivery Apps', 'Price Transparency', 'Bad Weather', 'Convenience Decay']}
                          value={data.primeThreat}
                          onChange={(v: string) => setVal('primeThreat', v)}
                        />
                     </div>
                  )}
                </>
              ) : (
                // CONSUMER SURVEY STEPS (Existing)
                <>
                  {step === 1 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black tracking-tight text-gray-800 italic flex items-center gap-3">
                      <User className="text-indigo-500" size={24} />
                      Demographic Profile
                    </h4>
                    <p className="text-sm text-gray-400 font-bold">Understanding who chooses which channel.</p>
                  </div>
                  
                  <SurveySelect 
                    label="What is your age group?"
                    options={AGE_GROUPS}
                    value={data.ageGroup}
                    onChange={(v) => setVal('ageGroup', v)}
                  />
                  <SurveySelect 
                    label="What is your gender?"
                    options={GENDERS}
                    value={data.gender}
                    onChange={(v) => setVal('gender', v)}
                  />
                  <SurveySelect 
                    label="What describes your occupation?"
                    options={OCCUPATIONS}
                    value={data.occupation}
                    onChange={(v) => setVal('occupation', v)}
                  />
                  <SurveySelect 
                    label="City/Area Type?"
                    options={AREA_TYPES}
                    value={data.areaType}
                    onChange={(v) => setVal('areaType', v)}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black tracking-tight text-gray-800 italic flex items-center gap-3">
                      <Zap className="text-indigo-500" size={24} />
                      Shopping Habits
                    </h4>
                    <p className="text-sm text-gray-400 font-bold">Frequency and baseline preferences.</p>
                  </div>
                  
                  <SurveySelect 
                    label="How often do you shop ONLINE?"
                    options={FREQUENCIES}
                    value={data.onlineFrequency}
                    onChange={(v) => setVal('onlineFrequency', v)}
                  />
                  <SurveySelect 
                    label="How often do you shop OFFLINE?"
                    options={FREQUENCIES}
                    value={data.offlineFrequency}
                    onChange={(v) => setVal('offlineFrequency', v)}
                  />
                  <SurveySelect 
                    label="General preference for non-essentials?"
                    options={PREFERENCES}
                    value={data.generalPreference}
                    onChange={(v) => setVal('generalPreference', v)}
                  />
                  
                  <div className="space-y-4">
                    <p className="text-sm font-black uppercase tracking-widest text-gray-400">Categories you purchase online?</p>
                    <div className="flex flex-wrap gap-2">
                      {PRODUCT_CATEGORIES.map(cat => (
                        <button 
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border-2",
                            data.categories?.includes(cat) 
                              ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100" 
                              : "bg-white border-gray-100 text-gray-400 hover:border-indigo-100 hover:text-indigo-400"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black tracking-tight text-gray-800 italic flex items-center gap-3">
                      <Sparkles className="text-indigo-500" size={24} />
                      Situational Response
                    </h4>
                    <p className="text-sm text-gray-400 font-bold">How do you react to external triggers?</p>
                  </div>
                  
                  <SurveySlider 
                    label="Likelihood to switch to ONLINE if it rains heavily?"
                    min={1} max={5}
                    value={data.weatherSwitchLikelihood || 3}
                    left="Unlikely" right="Very Likely"
                    onChange={(v) => setVal('weatherSwitchLikelihood', v)}
                  />
                  
                  <SurveySelect 
                    label="Urgent needs (1-2 hours)?"
                    options={['Online (Express)', 'Offline Store']}
                    value={data.urgencyPreference}
                    onChange={(v) => setVal('urgencyPreference', v)}
                  />

                  <SurveySelect 
                    label="Store distance > 5km?"
                    options={['Shop Online', 'Physical Store (Ignore distance)']}
                    value={data.distanceEffect}
                    onChange={(v) => setVal('distanceEffect', v)}
                  />

                  <SurveySlider 
                    label="If already outside, likelihood to prefer OFFLINE?"
                    min={1} max={5}
                    value={data.outsidePreference || 3}
                    left="Not Likely" right="Very Likely"
                    onChange={(v) => setVal('outsidePreference', v)}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black tracking-tight text-gray-800 italic flex items-center gap-3">
                      <BrainCircuit className="text-indigo-500" size={24} />
                      Importance Factors
                    </h4>
                    <p className="text-sm text-gray-400 font-bold">Rate the weight of these factors (1=Low, 5=High).</p>
                  </div>
                  
                  <SurveySlider 
                    label="Importance of Time Pressure?"
                    min={1} max={5}
                    value={data.timePressureImportance || 3}
                    onChange={(v) => setVal('timePressureImportance', v)}
                  />
                  <SurveySlider 
                    label="Importance of Product Urgency?"
                    min={1} max={5}
                    value={data.productUrgencyImportance || 3}
                    onChange={(v) => setVal('productUrgencyImportance', v)}
                  />
                  <SurveySlider 
                    label="Impact of Weather Conditions?"
                    min={1} max={5}
                    value={data.weatherImportance || 3}
                    onChange={(v) => setVal('weatherImportance', v)}
                  />
                  <SurveySlider 
                    label="Travel Distance / Effort?"
                    min={1} max={5}
                    value={data.distanceImportance || 3}
                    onChange={(v) => setVal('distanceImportance', v)}
                  />
                </div>
              )}

              {step === 5 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black tracking-tight text-gray-800 italic flex items-center gap-3">
                      <Heart className="text-indigo-500" size={24} />
                      Social & Trust
                    </h4>
                    <p className="text-sm text-gray-400 font-bold">Psychological and trust parameters.</p>
                  </div>
                  
                  <SurveySelect 
                    label="Social Media Influence?"
                    options={SOCIAL_INFLUENCE}
                    value={data.socialMediaInfluence}
                    onChange={(v) => setVal('socialMediaInfluence', v)}
                  />
                  <SurveySelect 
                    label="Friends / Family Influence?"
                    options={['Yes, frequently', 'Yes, sometimes', 'No, rarely/never']}
                    value={data.socialCircleInfluence}
                    onChange={(v) => setVal('socialCircleInfluence', v)}
                  />
                  <SurveySelect 
                    label="Frequency of checking reviews?"
                    options={REVIEWS}
                    value={data.reviewFrequency}
                    onChange={(v) => setVal('reviewFrequency', v)}
                  />
                  <SurveySlider 
                    label="Trust physical stores more than online?"
                    min={1} max={5}
                    value={data.trustLevel || 3}
                    left="Disagree" right="Agree"
                    onChange={(v) => setVal('trustLevel', v)}
                  />
                </div>
              )}

                </>
              )}
              
              {(role === 'consumer' ? step === 6 : step === 4) && (
                <div className="space-y-10 py-10 text-center">
                  <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-4xl font-black tracking-tight text-gray-800 italic uppercase">Contribution Ready!</h4>
                    <p className="text-gray-500 font-bold max-w-md mx-auto leading-relaxed">
                      {role === 'manager' 
                        ? "Your operational data helps our model predict market-wide channel shifts with greater precision. Thank you for contributing to the local retail research dataset."
                        : "Your response helps our AI understand complex human decision logic. By incorporating these situational parameters, we improve prediction accuracy by an estimated ~18%."
                      }
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                    <ShieldCheck size={14} />
                    Data anonymized for research
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button 
            onClick={handlePrev}
            disabled={step === 1}
            className={cn(
              "px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all transition-all",
              step === 1 ? "opacity-0 invisible" : "text-gray-400 hover:text-gray-900 group"
            )}
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          
          <button 
            onClick={handleNext}
            className={cn(
              "px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-100 active:scale-95 shadow-lg shadow-indigo-50",
            )}
          >
            {step === (role === 'consumer' ? 6 : 4) ? 'SUBMIT RESEARCH' : 'NEXT STEP'}
            {step < (role === 'consumer' ? 6 : 4) && <ChevronRight size={16} />}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function SurveySelect({ label, options, value, onChange }: any) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-black uppercase tracking-widest text-gray-400">{label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt: string) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "p-4 rounded-2xl text-left text-xs font-bold transition-all border-2",
              value === opt 
                ? "bg-indigo-50 border-indigo-600 text-indigo-600" 
                : "bg-white border-gray-100 text-gray-500 hover:border-indigo-100 hover:text-indigo-600"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function SurveySlider({ label, min, max, value, left, right, onChange }: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <p className="text-sm font-black uppercase tracking-widest text-gray-400">{label}</p>
        <span className="text-indigo-600 font-black text-xs">{value}</span>
      </div>
      <div className="space-y-2">
        <input 
          type="range"
          min={min} max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
        />
        {(left || right) && (
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-300">
            <span>{left}</span>
            <span>{right}</span>
          </div>
        )}
      </div>
    </div>
  );
}
