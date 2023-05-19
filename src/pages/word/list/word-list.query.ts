import { gql } from '@apollo/client';

export const WORDS_QUERY = gql`
  query Words {
    words {
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
