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
    reviewCount
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


const AUTHENTICATEINPUT_DETAILS = gql`
  fragment AuthenticateInput on Authenticate {
   username,
   password
}`

export const LOGIN = gql`
mutation Authenticate($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
    expiresAt
  }
}`