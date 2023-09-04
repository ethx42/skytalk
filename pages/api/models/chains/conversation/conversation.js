import { ConversationChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder
} from 'langchain/prompts';
import dotenv from 'dotenv';
dotenv.config()


export async function makeConversationChain(memory) {
  const model = new ChatOpenAI({modelName: 'gpt-3.5-turbo', temperature: 0.7})

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      'The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know. Answer in the same language the user is using language, the request is {text}'
    ),
    new MessagesPlaceholder('chat_history'),
    HumanMessagePromptTemplate.fromTemplate('{input}')
  ])

 const conversationChain = await new ConversationChain({
   prompt: chatPrompt,
   llm: model,
   memory,
   verbose: true,
   inputKey: ['text'],
   outputKey: 'response',
  })
  // await conversationChain.call({input: 'hey there! what company do you repressent?'})

  return conversationChain;
}


const conv = await makeConversationChain();

