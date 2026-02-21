// import { ChatOpenAI } from "@langchain/openai";
import { ChatDeepSeek } from '@langchain/deepseek'
import { ChatPromptTemplate } from "@langchain/core/prompts";

// Import environment variables
import * as dotenv from "dotenv";
dotenv.config();

// Instantiate the model
const model = new ChatDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
  model: 'deepseek-chat',
  temperature: 0.7, // 控制生成文本的随机性，值越高越有创意
  maxTokens: 500, // 限制每次响应的最大 token 数量
  streaming: false // 启用流式输出
})

// Create Prompt Template using fromTemplate
// const prompt = ChatPromptTemplate.fromTemplate('Tell a joke about {word}');

// Create Prompt Template from fromMessages
const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a talented chef.  Create a recipe based on a main ingredient provided by the user.",
  ],
  ["human", "{word}"],
]);

const chain = prompt.pipe(model);

const response = await chain.invoke({
  word: "dog",
});

console.log(response);
