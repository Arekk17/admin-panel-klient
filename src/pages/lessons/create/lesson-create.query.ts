import { gql } from '@apollo/client';

export const LESSON_CREATE_MUTATION = gql`
  mutation CreateLesson(
    $name: String!
    $languageId: Int
    $wordIds: [Int]
    $sentenceIds: [Int]
  ) {
    createLesson(
      name: $name
      languageId: $languageId
      wordIds: $wordIds
      sentenceIds: $sentenceIds
    ) {
      id
      name
      sentences {
        id
        original
      }
      words {
        id
        original
      }
    }
  }
`;
