import { gql } from "@apollo/client";

export const SENTENCE_CREATE_MUTATION = gql`
mutation CreateSentence(
    $original: String, 
    $foreign: String, 
    $pronunciation: String, 
    $audioUrl: String, 
    $languageId: Int
    ) {
    createSentence(
        original: $original, 
        foreign: $foreign, 
        pronunciation: $pronunciation, 
        audioUrl: $audioUrl, 
        languageId: $languageId
    ) {
      audioUrl
      foreign
      id
      original
      pronunciation
    }
  }
`