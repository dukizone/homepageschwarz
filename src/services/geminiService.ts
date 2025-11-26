import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getForestTips = async (query: string): Promise<string> => {
  if (!apiKey) {
    return "Ich kann gerade keine Verbindung zum Wald-Server herstellen. Bitte prüfen Sie den API-Key.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: "Du bist 'Fritz', ein freundlicher, ortskundiger Führer für den Schwarzwald. Du hilfst Familien mit Kindern, tolle Wanderwege und Aktivitäten zu finden. Antworte kurz, herzlich und auf Deutsch. Maximal 2-3 Sätze.",
        temperature: 0.7,
      }
    });

    return response.text || "Der Wald ist heute sehr still. Versuchen Sie es später noch einmal.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Entschuldigung, ich habe den Pfad verloren. Bitte versuchen Sie es erneut.";
  }
};