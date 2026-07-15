import { GoogleGenAI } from "@google/genai";
import { SituationalVariables, Demographics, PredictionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export async function generateShoppingReport(
  situation: SituationalVariables,
  demographics: Demographics,
  result: PredictionResult,
  category: string
) {
  const prompt = `
    You are a professional Retail Strategy Analyst. 
    Analyze this shopping scenario and provide a structured, professional decision report.
    
    Category: ${category}
    Channel Prediction: ${result.preferredChannel} (${result.probability}% confidence)
    
    Data Parameters:
    - Weather Severity: ${situation.weatherSeverity}/5
    - Product Urgency: ${situation.productUrgency}/5
    - Store Distance: ${situation.storeDistance}km
    - Social Context: ${situation.socialInfluence ? 'Active' : 'Neutral'}
    
    Prediction Logic:
    ${result.reasoning.join('\n')}
    
    Required Report Structure:
    1. Executive Summary: Why this channel was selected based on situational data.
    2. Strategic Advantages: 3 bullet points on efficiency and cost-benefit.
    3. Sustainability Impact: A professional assessment of the ecological footprint.
    4. Promotional Activation: Explicitly state the coupon code "${result.preferredChannel === 'Online' ? 'OMNI-SAVE-ONLINE' : 'RETAIL-ROCKSTAR-15'}" and its benefits.
    
    Maintain a professional, data-driven, and authoritative tone. Use minimal emojis (only for emphasis).
    Return the response as a clean string (Markdown format).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oops! My brain is a bit fuzzy right now. 🍪 But basically, you should definitely go with the " + result.preferredChannel + " option! 💖";
  }
}
