import { gql } from '@apollo/client';

export const LANDINGS_QUERY = gql`
  query Landings {
    landings {
      id
      title
      name
      slug
      content
    }
  }
`;
