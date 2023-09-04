import dotenv from 'dotenv';
import {ConversationalRetrievalQAChain} from 'langchain/chains';
import {OpenAI} from 'langchain/llms/openai';
import {getVectorStore} from '../store.js';
import {BufferMemory} from "langchain/memory";

dotenv.config();

export async function getLlmResponse(question) {

  try {
    const vectorStore = await getVectorStore();
    const model = await new OpenAI(
      { modelName: 'gpt-3.5-turbo', temperature: 0.5 },
      {
        basePath: 'https://oai.hconeai.com/v1',
        baseOptions: {
          headers: {
            'Helicone-Auth': `Bearer ${process.env.HELICONE_API_KEY}`
          },
        }
      }
    );

    const qaChain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        memory: new BufferMemory({ returnMessages: true, memoryKey: 'chat_history' }),
        verbose: true,
      });

    const result = await qaChain
      .call({ question })
      .catch(console.error);

    return result?.text || '';
  } catch (error) {
    console.log('Unable to create QA chain:', error);
  }
}
