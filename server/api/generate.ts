import { OpenAI } from "openai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody<{ input: string; lang?: string; model?: string }>(event);
  const userInput = body.input;

  const openai = new OpenAI({
    apiKey: config.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "http://localhost:3000", // update to your deployed domain if needed
      "X-Title": "Nuxt OpenRouter SEO Generator",
    },
  });

  const langInstruction = body.lang ? `Write the title, description, and keywords in ${body.lang}.` : "";
  const model = "openai/gpt-oss-20b:free";

  const prompt = `You are an SEO expert. ${langInstruction}
Respond with ONLY valid JSON. 
Do not include markdown code fences, extra formatting or extra text.
Format:
{"title": "...", "description": "...", "keywords": "..."}
Constraints:
- Title: under 60 characters
- Description: under 160 characters
- Keywords: comma-separated list`;

  const response = await openai.chat.completions.create({
    model: body.model || model,
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: userInput,
      },
    ],
  });

  interface ResponseData {
    title: string;
    description: string;
    keywords: string;
  }

  let parsed: ResponseData = {
    title: "",
    description: "",
    keywords: "",
  };
  try {
    // Get the model output
    let text = response.choices[0]?.message?.content || "";

    // Remove accidental code fences if the model adds them
    text = text.replace(/```json|```/g, "").trim();

    // Parse JSON safely
    parsed = JSON.parse(text) as ResponseData;
  } catch (err) {
    console.error("Error parsing model response:", err);
    parsed = { title: "", description: "", keywords: "" };
  }

  return {
    data: {
      title: parsed.title || "",
      description: parsed.description || "",
      keywords: parsed.keywords || "",
    },
  };
});
