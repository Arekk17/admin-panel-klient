import { gql } from '@apollo/client';

export const LANGUAGES_QUERY = gql`
  query Languages {
    languages {
      id
      name
      logo
    }
  }
`;

export const GET_ALL_QUERY = gql`
  query GetALL {
    languages {
      id
      name
      logo
    }
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
