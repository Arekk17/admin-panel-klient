import { gql } from "@apollo/client";

export const USER_CREATE_MUTATION = gql `
mutation CreateUser($email: String!, $name: String!, $surname: String!, $password: String!, $phoneNumber: Int, $phonePrefix: Int) {
    createUser(email: $email, name: $name, surname: $surname, password: $password, phoneNumber: $phoneNumber, phonePrefix: $phonePrefix) {
      token
    }
  }
`