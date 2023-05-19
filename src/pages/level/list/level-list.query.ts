import { gql } from '@apollo/client';

export const LEVELS_QUERY = gql`
  query Levels {
    levels {
      id
      name
      imageUrl
      description
    }
  }
`;
