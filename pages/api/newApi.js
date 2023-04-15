import { Configuration, OpenAIApi } from "openai";

// pages/api/example.js

export const config = {
  api: {
    bodyParser: true,
  },
};

// The handler function goes here

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // const { data } = req.body;
  // console.log(req.body.data);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.data,
    max_tokens: 100,
    n: 5,
    temperature: 0.2,
  });

  // console.log(completion.data);

  if (!completion.data.choices || completion.data.choices.length === 0) {
    return res.status(400).json({ error: "Unable to generate response" });
  }

  res.status(200).json({ completion: completion.data });
}
