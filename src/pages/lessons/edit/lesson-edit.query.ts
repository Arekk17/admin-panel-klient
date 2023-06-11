import { gql } from '@apollo/client'

export const LESSON_GET_BY_ID_QUERY = gql`
query Lesson($id: Int) {
  lesson(id: $id) {
    id
    name
    language {
      id
      name
      logo
    }
    sentences {
      id
      foreign
      pronunciation
    }
    words {
      id
      original
      foreign
    }
  }
}`

export const LESSON_EDIT_BY_ID_MUTATION = gql`
mutation EditLesson(
  $id: Int!, 
  $name: String, 
  $languageId: Int, 
  $sentenceIds: [Int], 
  $wordIds: [Int]) {
  editLesson(
    id: $id, 
    name: $name, 
    languageId: $languageId, 
    sentenceIds: $sentenceIds, 
    wordIds: $wordIds) 
    {
    id
    language {
      id
      name
      logo
    }
    name
    sentences {
      id
      original
      foreign
    }
    words {
      id
      original
      foreign
    }
  }
}`

export const LESSON_DELETE_BY_ID_MUTATION = gql`
mutation DeleteLesson($id: Int!) {
  deleteLesson(id: $id) {
    id
    name
  }
}`