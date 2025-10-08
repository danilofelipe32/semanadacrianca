
import { GoogleGenAI, Type } from '@google/genai';
import type { PartyTheme } from '../types';

// Ensure the API key is available
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      themeName: {
        type: Type.STRING,
        description: 'O nome criativo e divertido do tema da festa.',
      },
      description: {
        type: Type.STRING,
        description: 'Uma breve descrição de 2-3 frases sobre o tema, sugerindo atividades ou decorações.',
      },
    },
    required: ['themeName', 'description'],
  },
};

export async function generatePartyThemes(suggestion?: string): Promise<PartyTheme[]> {
  try {
    let prompt = `
      Crie uma lista com 6 sugestões de temas de festa para a semana da criança.
      Os temas devem ser variados, criativos e adequados para crianças de 5 a 10 anos.
      Para cada tema, forneça um nome criativo e uma breve descrição.
    `;

    if (suggestion && suggestion.trim() !== '') {
      prompt = `
        Crie uma lista com 6 sugestões de temas de festa para a semana da criança, incluindo pelo menos uma sugestão que envolva o tema "${suggestion}".
        Os outros temas devem ser variados, criativos e adequados para crianças de 5 a 10 anos.
        Para cada tema, forneça um nome criativo e uma breve descrição.
      `;
    }


    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const themes: PartyTheme[] = JSON.parse(jsonText);
    
    return themes;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate party themes from Gemini API.");
  }
}
