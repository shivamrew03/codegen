import { GoogleGenerativeAI } from "@google/generative-ai";

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateMethodSuggestion(methodName, returnType, params, description) {
    const prompt = `Generate a function definition for a method named ${methodName} with return type ${returnType} and parameters ${params}. Description: ${description}`;
    const result = await this.model.generateContent([prompt]);
    return result.response.text();
  }
}

export default new AIService();
