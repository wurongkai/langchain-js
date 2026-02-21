// import { ChatOpenAI } from "@langchain/openai";
import { ChatDeepSeek } from '@langchain/deepseek'
import readline from "readline";

// Import environment variables
import * as dotenv from "dotenv";
dotenv.config();

// Create a readline interface to read user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a function to call the Langchain API
async function chatCompletion(text) {
  // const model = new ChatOpenAI({
  //   modelName: "gpt-3.5-turbo",
  //   temperature: 0.9,
  // });
  // 初始化 DeepSeek 模型（全局单例，避免重复实例化）
  const model = new ChatDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY,
    model: 'deepseek-chat',
    temperature: 0.7, // 控制生成文本的随机性，值越高越有创意
    maxTokens: 500, // 限制每次响应的最大 token 数量
    streaming: false // 启用流式输出
  })

  const response = await model.invoke(text);

  console.log("AI:", response.content);
}

// Create a function to ask for user input
function getPrompt() {
  rl.question("Enter your prompt: ", (input) => {
    if (input.toUpperCase() === "EXIT") {
      rl.close();
    } else {
      chatCompletion(input).then(() => getPrompt()); // Call getPrompt again to ask for the next input
    }
  });
}

getPrompt(); // Start the prompt
