import { gql } from '@apollo/client';

export const LANDING_GET_BY_ID_QUERY = gql`
  query Landing($id: Int) {
    landing(id: $id) {
      id
      title
      name
      slug
      content
    }
  }
`;

export const LANDING_EDIT_BY_ID_MUTATION = gql`
  mutation EditLanding(
    $id: Int!
    $title: String
    $name: String
    $slug: String
    $content: String
  ) {
    editLanding(
      id: $id
      title: $title
      name: $name
      slug: $slug
      content: $content
    ) {
      id
      title
      name
      slug
      content
    }
  }
`;

export const LANDING_DELETE_BY_ID_MUTATION = gql`
  mutation DeleteLanding($id: Int!) {
    deleteLanding(id: $id) {
      id
      title
      name
      slug
      content
    }
  }
`;
