import { gql } from '@apollo/client';

export const LEVEL_CREATE_MUTATION = gql`
  mutation CreateLevel(
    $name: String!
    $imageUrl: String
    $description: String
  ) {
    createLevel(name: $name, imageUrl: $imageUrl, description: $description) {
      id
      name
      imageUrl
      description
    }
  }
`;
