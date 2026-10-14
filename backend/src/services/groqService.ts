import OpenAI from "openai";

const groqClient = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const groqService = {
  async chatCompletion(messages: Array<{ role: string; content: string }>, model: string = "llama-3.3-70b-versatile") {
    try {
      const completion = await groqClient.chat.completions.create({
        model,
        messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
        temperature: 0.7,
        max_tokens: 1024,
      });
      return completion.choices[0].message.content || "";
    } catch (error: any) {
      throw new Error(`Groq API error: ${error.message}`);
    }
  },

  async doctorRecommendation(patientQuery: string) {
    try {
      const response = await groqService.chatCompletion([
        {
          role: "system",
          content: `You are a medical assistant for MediCare Pro. Recommend doctors based on patient queries considering specialization, department, experience, and availability. Respond with JSON: {"recommendations": [{"name": string, "specialization": string, "reason": string}]}`,
        },
        { role: "user", content: patientQuery },
      ]);
      return response;
    } catch (error: any) {
      throw error;
    }
  },

  async medicalReportAnalysis(patientSymptoms: string) {
    try {
      const response = await groqService.chatCompletion([
        {
          role: "system",
          content: `You are a medical analysis assistant. Analyze patient symptoms and provide possible conditions. Respond with JSON: {"possible_conditions": [], "recommended_tests": [], "urgency": "low" | "medium" | "high"}`,
        },
        { role: "user", content: patientSymptoms },
      ]);
      return response;
    } catch (error: any) {
      throw error;
    }
  },

  async appointmentAssistant(patientInfo: string) {
    try {
      const response = await groqService.chatCompletion([
        {
          role: "system",
          content: `You are a MediCare Pro appointment assistant. Help patients book appointments by suggesting doctors, dates, and times. Respond helpfully and ask follow-up questions.`,
        },
        { role: "user", content: patientInfo },
      ]);
      return response;
    } catch (error: any) {
      throw error;
    }
  },
};

export default groqService;