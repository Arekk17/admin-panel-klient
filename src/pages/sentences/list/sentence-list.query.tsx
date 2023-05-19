import { gql } from '@apollo/client';

export const SENTENCES_QUERY = gql`
  query Sentences {
    sentences {
      audioUrl
      foreign
      id
      original
      pronunciation
      language {
        name
        logo
        id
      }
      lesson {
        id
        name
      }
    }
  }
`;
