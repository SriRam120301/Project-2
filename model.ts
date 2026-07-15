import { SituationalVariables, Demographics, PredictionResult, Channel } from '../types';

/**
 * A heuristic-based prediction engine that simulates a Random Forest model
 * specifically tuned for the Situational Dual-Channel Preference logic.
 * Now enhanced with trust and psychographic factors from research data.
 */
export function predictChannel(
  situation: SituationalVariables,
  demographics: Demographics,
  researchData?: any // SurveyData (optional placeholder for enhancement)
): PredictionResult {
  let score = 0; // Negative favors Offline, Positive favors Online
  const reasoning: string[] = [];

  // BASELINE: Demographics and General Habit
  const baseline = (demographics.baselinePreference - 50) / 10; // -5 to +5
  score += baseline;

  // RESEARCH FACTOR: Trust & Digital Maturity (Conceptual Enhancement)
  if (researchData?.trustLevel) {
    const trustImpact = (researchData.trustLevel - 3) * 1.5;
    score -= trustImpact; // Higher trust in offline reduces online preference
    reasoning.push(`Trust calibration applied (Offset: ${-trustImpact})`);
  }
  
  // SITUATIONAL TRIGGER: Weather
  // Bad weather strongly drives people online (+1.5 per level above 3)
  if (situation.weatherSeverity > 3) {
    const impact = (situation.weatherSeverity - 3) * 2;
    score += impact;
    reasoning.push(`Adverse weather (+${impact}) increases digital channel utility.`);
  } else if (situation.weatherSeverity < 3) {
    const impact = (3 - situation.weatherSeverity) * 1;
    score -= impact;
    reasoning.push(`Clear weather (-${impact}) encourages physical store visits.`);
  }

  // SITUATIONAL TRIGGER: Time Pressure
  // Busy schedule drives people online
  if (situation.timePressure > 3) {
    const impact = (situation.timePressure - 3) * 1.5;
    score += impact;
    reasoning.push(`Time pressure (+${impact}) favors online speed.`);
  }

  // SITUATIONAL TRIGGER: Product Urgency (The Urgency Paradox)
  // HIGH urgency actually pushes people OFFLINE because of "Need It Now" (instant gratification)
  if (situation.productUrgency > 3) {
    const impact = (situation.productUrgency - 3) * 2.5;
    score -= impact;
    reasoning.push(`High urgency (-${impact}) forces immediate offline acquisition.`);
  }

  // LOGISTICS: Distance
  // Longer distance drives people online
  if (situation.storeDistance > 5) {
    const impact = Math.min((situation.storeDistance - 5) * 0.5, 4);
    score += impact;
    reasoning.push(`Travel friction (+${impact}) makes digital shopping more efficient.`);
  } else if (situation.storeDistance < 2) {
    score -= 2;
    reasoning.push(`Physical proximity (-2) reduces offline friction.`);
  }

  // SOCIAL CONTEXT
  if (situation.socialInfluence) {
    score -= 2;
    reasoning.push(`Social interaction (-2) makes offline shopping an experience.`);
  }

  // Calculate Probability
  // sigmoid-like mapping
  const probabilityRaw = 1 / (1 + Math.exp(-score * 0.5));
  const preferredChannel: Channel = probabilityRaw >= 0.5 ? 'Online' : 'Offline';
  const probability = preferredChannel === 'Online' ? probabilityRaw : 1 - probabilityRaw;

  return {
    preferredChannel,
    probability: Math.round(probability * 100),
    reasoning,
    impactWeights: {
      situational: Math.abs(situation.weatherSeverity - 3) + Math.abs(situation.timePressure - 3) + Math.abs(situation.productUrgency - 3),
      demographic: Math.abs(baseline),
      logistics: situation.storeDistance > 5 ? situation.storeDistance / 5 : 1
    }
  };
}
