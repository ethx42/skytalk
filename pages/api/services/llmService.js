import dotenv from 'dotenv';
import {BufferMemory, ChatMessageHistory} from 'langchain/memory';
import {ChatOpenAI} from 'langchain/chat_models/openai';
import {SequentialChain} from 'langchain/chains';
import {makeAssessmentChain} from '../models/chains/assessment/assessment.js';
import {makeQAChain} from '../models/chains/qa/qaChain.js';
import {getVectorStore} from '../store.js';

dotenv.config();

export async function getLlmResponse(question) {
  try {
    const vectorStore = await getVectorStore();
    const model = await new ChatOpenAI(
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

    const memoryBuffer = new BufferMemory({
      returnMessages: true,
      memoryKey: 'chat_history',
      chatHistory: new ChatMessageHistory(),
      inputKey: "question",
      outputKey: "text"
    })

    const assessmentChain = await makeAssessmentChain(model);
    const qaChain = await makeQAChain(model, vectorStore, memoryBuffer);

    const overAllChain = new  SequentialChain({
      chains: [assessmentChain, qaChain],
      inputVariables: ['input'],
      outputVariables: ['question', 'text'],
      verbose: true
    })

    const result = await overAllChain.call({ input: question });
    return result?.text;

  } catch (error) {
    console.log('Unable to create QA chain:', error);
  }
}
