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
      author {
        bookCount
        born
        id
        name
      }
      published
      title
      id
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      genres: $genres
      published: $published
    ) {
      author {
        bookCount
        born
        id
        name
      }
      id
      published
      title
      genres
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation ($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      id
      name
    }
  }
`

export const LOGIN = gql`
  mutation getToken($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
