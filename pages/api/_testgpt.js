const OpenAIApi = require("openai");

const handler = async (req, res) => {
  // const { prompt, promptResponse } = req.query;
  const data = req.body.data.promptAndResponse;

  console.log(data);
  const model = "text-davinci-003";
  const n = 5;

  openai.api_key = process.env.CHATGPT_KEY;

  try {
    const messages = [];

    for (let i = 0; i < n; i++) {
      const response = await openai.Completion.create({
        engine: model,
        prompt: data,
        maxTokens: 50,
        n: 1,
        stop: null,
        temperature: 0.5,
      });
      const message = response.choices[0].text.trim();
      messages.push(message);
    }

    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate responses" });
  }
};

export default handler;
