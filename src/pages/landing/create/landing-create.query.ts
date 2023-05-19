import { gql } from '@apollo/client';

export const LANDING_CREATE_MUTATION = gql`
  mutation CreateLanding(
    $title: String!
    $name: String!
    $slug: String!
    $content: String!
  ) {
    createLanding(title: $title, name: $name, slug: $slug, content: $content) {
      id
      title
      name
      slug
      content
    }
  }
`;
