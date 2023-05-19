import { gql } from '@apollo/client';

export const LEVEL_GET_BY_ID_QUERY = gql`
  query Level($id: Int!) {
    level(id: $id) {
      id
      name
      imageUrl
      description
    }
  }
`;

export const LEVEL_EDIT_BY_ID_MUTATION = gql`
  mutation EditLevel(
    $id: Int!
    $name: String
    $imageUrl: String
    $description: String
  ) {
    editLevel(
      id: $id
      name: $name
      imageUrl: $imageUrl
      description: $description
    ) {
      id
      name
      imageUrl
      description
    }
  }
`;

export const LEVEL_DELETE_BY_ID_MUTATION = gql`
  mutation DeleteLevel($id: Int!) {
    deleteLevel(id: $id) {
      id
      name
      imageUrl
      description
    }
  }
`;
