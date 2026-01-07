
import { GoogleGenAI, Type } from "@google/genai";
import { StyleType, ScriptOption } from "../types";

export class ScriptGeneratorService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async generateScripts(
    originalText: string,
    style: StyleType,
    context: string
  ): Promise<ScriptOption[]> {
    const prompt = `
      你是一位拥有10年经验的资深客户关系专家和顶尖文案撰写人。
      请基于用户提供的“原话”，将其转化为符合“[${style}]”风格的客户服务话术。
      
      上下文环境：${context}
      用户原话：${originalText}
      
      要求：
      1. 生成3个不同的选项。
      2. 严格遵守“[${style}]”的语气特征。
      3. 确保表达通顺、专业且具有感染力。
      4. 适合用于即时通讯工具（如微信、钉钉）或邮件。
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                content: {
                  type: Type.STRING,
                  description: "生成的客户话术内容",
                },
              },
              required: ["content"],
            },
          },
        },
      });

      const jsonStr = response.text?.trim() || "[]";
      const rawOptions = JSON.parse(jsonStr);

      return rawOptions.map((opt: any, index: number) => ({
        id: `script-${Date.now()}-${index}`,
        content: opt.content,
        style: style,
      }));
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("生成话术失败，请检查网络或稍后再试。");
    }
  }
}

export const scriptService = new ScriptGeneratorService();
