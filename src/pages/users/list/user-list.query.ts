import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      name
      surname
      email
      phoneNumber
      phonePrefix
      joined
      role
    }
  }
`;
