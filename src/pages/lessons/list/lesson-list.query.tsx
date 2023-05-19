import { gql } from '@apollo/client';

export const LESSON_QUERY = gql`
  query Lessons {
    lessons {
      id
      name
      language {
        name
        logo
      }
      sentences {
        id
        original
      }
      words {
        id
        original
      }
    }
  }
`;
