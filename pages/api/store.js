import {PineconeStore} from "langchain/vectorstores/pinecone";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {PINECONE_INDEX_NAME, PINECONE_NAME_SPACE} from "../../config/pinecone.js";
import {pinecone} from "../../utils/pineconeClient.js";

const index = pinecone.Index(PINECONE_INDEX_NAME);


export async function getVectorStore() {
  try {
    return await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({}),
      {
        pineconeIndex: index,
        textKey: 'text',
        namespace: PINECONE_NAME_SPACE,
      },
    );
  } catch (error) {
    console.error('Unable to load the store', error);
  }
}
