import { gql } from '@apollo/client';

export const LANGUAGE_EDIT_BY_ID_MUTATION = gql`
  mutation EditLanguage($id: Int!, $name: String, $logo: String) {
    editLanguage(id: $id, name: $name, logo: $logo) {
      id
      logo
      name
    }
  }
`;

export const LANGUAGE_GET_BY_ID_QUERY = gql`
  query Language($id: Int!) {
    language(id: $id) {
      id
      name
      logo
    }
  }
`;

export const LANGUAGE_DELTE_BY_ID_MUTATION = gql`
  mutation DeleteLanguage($id: Int!) {
    deleteLanguage(id: $id) {
      id
      logo
      name
    }
  }
`;
