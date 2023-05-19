import { gql } from '@apollo/client';

export const LANGUAGE_CREATE_MUTATION = gql`
  mutation CreateLanguage($name: String!, $logo: String!) {
    createLanguage(name: $name, logo: $logo) {
      id
      name
      logo
    }
  }
`;
