import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      published
      title
      id
      genres
    }
  }
`
