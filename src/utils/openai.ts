import OpenAI from 'openai';
import { isJsonString } from './utils';
import dotenv from 'dotenv';
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});
  export const translateArray = async (array: string[], language: string): Promise<string[]> => {
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: `Please translate the following array into ${language}. ONLY RESPOND WITH THE VALID JSON ARRAY. IF JSON IS NOT VALID DONT RESPOND. Response Example: ["Hello", "Bye"]. Array: \n\n${array.join(
      '\n',
    )}\n\n`,
    max_tokens: 2000,
  });
  if (isJsonString(response?.choices[0].text)) {
    return JSON.parse(response?.choices[0].text);
  } else {
    console.log('Invalid JSON, trying again...');
    return translateArray(array, language);
  }
};