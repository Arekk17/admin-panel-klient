import { gql } from '@apollo/client';

export const SIGNIN_USER_MUTATION = gql`
  mutation SigninUser($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
      user {
        name
      }
    }
  }
`;
