import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
  fragment BookDetail on Book {
    title
    author{
      name
    }
    published
    id
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    bookCount
    born
  }
}
`

export const EDIT_AUTHOR = gql`
mutation($name: String!, $sentBornTo: Int!) {
  editAuthor(name: $name, sentBornTo: $sentBornTo) {
    name, born, bookCount
  }
}
`

export const ALL_BOOKS = gql`
query($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    ...BookDetail
  }
}
${BOOK_DETAILS}
`

export const GET_ME = gql`
query {
  me{
    username,
    favoriteGenre,
  }
}
`

export const ADD_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!){
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ){
    ...BookDetail
  }
}
${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
    }
  }
`