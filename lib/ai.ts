import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateContent(userPrompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "model",
          parts: [
            {
              text: "Be sarcastic and funny, be rude as much as you can.",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: userPrompt,
            },
          ],
        },
      ],
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response";
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
