import { gql } from '@apollo/client';

export const USER_GET_BY_ID_QUERY = gql`
  query User($id: String) {
    user(id: $id) {
      id
      email
      password
      name
      surname
      phoneNumber
      role
    }
  }
`;
export const USER_EDIT_BY_ID_MUTATION = gql`
  mutation editUser(
    $email: String
    $password: String
    $name: String
    $surname: String
    $phoneNumber: Int
    $id: String!
  ) {
    editUser(
      email: $email
      password: $password
      name: $name
      surname: $surname
      phoneNumber: $phoneNumber
      id: $id
    ) {
      id
      email
      name
      password
      phoneNumber
      surname
    }
  }
`;
export const USER_DELETE_BY_ID_MUTATION = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id
      email
      password
      name
      surname
      phoneNumber
      phonePrefix
      role
    }
  }
`;
