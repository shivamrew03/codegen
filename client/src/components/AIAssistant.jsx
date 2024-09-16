import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIAssistant = ({ onSuggest }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSuggestion = async () => {
    setIsGenerating(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.VITE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Suggest a JavaScript function for..."; // Customize this prompt
      const result = await model.generateContent(prompt);
      onSuggest(result.response.text());
    } catch (error) {
      console.error("Error generating suggestion:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="ai-assistant">
      <button onClick={generateSuggestion} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Get AI Suggestion"}
      </button>
    </div>
  );
};

export default AIAssistant;
