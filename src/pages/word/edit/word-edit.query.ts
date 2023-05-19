import { gql } from '@apollo/client';

export const WORD_GET_BY_ID_QUERY = gql`
  query Word($id: Int!) {
    word(id: $id) {
      id
      original
      foreign
      pronunciation
      audioUrl
      imageUrl
      wordGroup
      language {
        id
        logo
        name
      }
    }
  }
`;

export const WORD_EDIT_BY_ID_MUTATION = gql`
  mutation EditWord(
    $id: Int!
    $original: String
    $foreign: String
    $pronunciation: String
    $audioUrl: String
    $imageUrl: String
    $wordGroup: WORDGROUP
    $languageId: Int
  ) {
    editWord(
      id: $id
      original: $original
      foreign: $foreign
      pronunciation: $pronunciation
      audioUrl: $audioUrl
      imageUrl: $imageUrl
      wordGroup: $wordGroup
      languageId: $languageId
    ) {
      id
      original
      foreign
      pronunciation
      audioUrl
      imageUrl
      wordGroup
      language {
        name
        id
        logo
      }
    }
  }
`;

export const WORD_DELETE_BY_ID_MUTATION = gql`
  mutation DeleteWord($id: Int!) {
    deleteWord(id: $id) {
      id
      original
      foreign
      pronunciation
      audioUrl
      imageUrl
      wordGroup
    }
  }
`;
