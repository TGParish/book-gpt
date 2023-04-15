import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  let myPrompt = "How to make money";
  // const prompt = data.promptAndResponse;
  const configuration = new Configuration({
    apiKey: process.env.CHATGPT_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: myPrompt,
    temperature: 0,
    max_tokens: 7,
  });

  res.status(200).json(response);

  // const { data } = req.body;
  // const model = "text-davinci-003";
  // const n = 5;
  // try {
  //   const messages = [];
  //   for (let i = 0; i < n; i++) {
  //     const response = await openai.completion.create({
  //       engine: model,
  //       prompt: data,
  //       maxTokens: 50,
  //       n: 1,
  //       stop: null,
  //       temperature: 0.5,
  //     });
  //     const message = response.choices[0].text.trim();
  //     messages.push(message);
  //   }
  //   res.status(200).json({ messages });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "Failed to generate responses" });
  // }
}
