import { gql } from '@apollo/client';

const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetail on Repository {
    stargazersCount,
    watchersCount,
    forksCount,
    openIssuesCount,
    url,
    ownerAvatarUrl,
    description,
    language,
    ownerName,
    name,
    id,
    ratingAverage,
    reviewCount,
    fullName
}`

export const GET_REPOSITORIES = gql`
query {
  repositories {
    edges{
        node{
            ...RepositoryDetail
        }
    }
  }
}${REPOSITORY_DETAILS}`

export const LOGIN = gql`
mutation Authenticate($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
    expiresAt
  }
}`

export const ME = gql`
query{
  me{
    username
  }
}  
`