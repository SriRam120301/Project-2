export type Channel = 'Online' | 'Offline';

export interface SituationalVariables {
  weatherSeverity: number; // 1 (Sunny) to 5 (Stormy)
  timePressure: number; // 1 (Relaxed) to 5 (Busy)
  productUrgency: number; // 1 (Can Wait) to 5 (Immediate)
  storeDistance: number; // km
  socialInfluence: boolean; // Alone vs With Friends
}

export interface Demographics {
  ageGroup: string;
  incomeLevel: string;
  baselinePreference: number; // 0 to 100 (Online %)
}

export interface PredictionResult {
  preferredChannel: Channel;
  probability: number;
  reasoning: string[];
  impactWeights: {
    situational: number;
    demographic: number;
    logistics: number;
  };
}

export interface SurveyData {
  ageGroup?: string;
  gender?: string;
  occupation?: string;
  incomeLevel?: string;
  areaType?: string;
  onlineFrequency?: string;
  offlineFrequency?: string;
  generalPreference?: string;
  categories?: string[];
  weatherSwitchLikelihood?: number;
  urgencyPreference?: string;
  distanceEffect?: string;
  outsidePreference?: number;
  deliveryDelayEffect?: number;
  timePressureImportance?: number;
  productUrgencyImportance?: number;
  weatherImportance?: number;
  distanceImportance?: number;
  socialMediaInfluence?: string;
  socialCircleInfluence?: string;
  reviewFrequency?: string;
  trustLevel?: number;
}
