import { gql } from '@apollo/client';

export const WORD_CREATE_MUTATION = gql`
  mutation CreateWord(
    $original: String!
    $foreign: String!
    $pronunciation: String!
    $audioUrl: String!
    $imageUrl: String!
    $wordGroup: WORDGROUP
    $languageId: Int
  ) {
    createWord(
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
    }
  }
`;
