import { LLMChain, PromptTemplate  } from "langchain";

export const makeAssessmentChain = async (model) => {
  const firstAssessmentTemplate = `
    For the following text, extract the following information:

    Identify the type of interaction the user is engaging in.
    If the user is asking questions or seeking company information, output 'QA'.
    If the user is simply greeting, introducing, or closing the conversation, output 'Etiquette'.
    If the interaction type is not recognized, output 'other'.
    
    language: Identify the language in which the user is writing and output the name of that language.
    If the language is not recognized, output 'other'.
    
    requirement: Formulate the user's requirement as a clear, specific, and detailed question or questions. Translate this requirement into the language identified in the 'language' field.
    If interactionType is 'Etiquette' and the requirement is not identifiable, output 'None'.
    
    Note: All responses should be in the language identified in the 'language' field.
    
    Format the output with the following keys:
    interactionType
    language
    requirement
    
    text: {input}
    `

  const assessmentPrompt = new PromptTemplate({ template: firstAssessmentTemplate, inputVariables: ['input'] })

  return new LLMChain({ llm: model, prompt: assessmentPrompt, verbose: true, outputKey: 'question' })

}
