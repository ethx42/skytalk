import {ConversationalRetrievalQAChain} from "langchain/chains";

export async function makeQAChain(model, vectorStore, memory) {
  return ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      memory,
      verbose: true,
    });
}
