import { gql } from "@apollo/client";

export const SENTENCE_GET_BY_ID_QUERY = gql`
query Sentence($id: Int!) {
    sentence(id: $id) {
      id
      original
      foreign
      pronunciation
      audioUrl
      lesson {
        id
        name
      }
      language {
        id
        logo
        name
      }
    }
  }
`

export const SENTENCE_EDIT_BY_ID_MUTATION = gql`
mutation EditSentence($id: Int!, 
  $original: String, 
  $foreign: String, 
  $pronunciation: String, 
  $audioUrl: String, 
  $languageId: Int) 
  {
  editSentence(
    id: $id, 
    original: $original, 
    foreign: $foreign, 
    pronunciation: $pronunciation, 
    audioUrl: $audioUrl, 
    languageId: $languageId) 
    {
    id
    original
    foreign
    pronunciation
    audioUrl
    language {
      id
      name
      logo
    }
  }
}
`

export const SENCTENCE_DELETE_BY_ID_MUTATION = gql`
mutation DeleteSentence($id: Int!) {
    deleteSentence(id: $id) {
      id
      original
      foreign
      pronunciation
      audioUrl
      language {
        name
        logo
        id
      }
    }
  }
`