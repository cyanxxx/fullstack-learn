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

const PAGE_DETAIL = gql`
  fragment PageDetail on PageInfo {
    hasPreviousPage
      hasNextPage
      startCursor
      endCursor
  }
`

const REVIEW_DETAIL = gql`
  fragment ReviewDetail on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repository {
      url
    }
  }
`

export const GET_REPOSITORIES = gql`
query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String){
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
    edges{
        node{
            ...RepositoryDetail
        }
    }
    pageInfo {
      hasNextPage
      endCursor
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
query getCurrentUser($includeReviews: Boolean = false) {
  me{
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          ...ReviewDetail
        }
        cursor
      }
      pageInfo {
        ...PageDetail
      }
    }
  }
}  
${PAGE_DETAIL}${REVIEW_DETAIL}`

export const REPOSITORY = gql`
query($repositoryId: ID!, $first: Int, $after: String){
  repository(id: $repositoryId) {
    ...RepositoryDetail,
    reviews(first: $first, after: $after) {
      edges {
        node {
         ...ReviewDetail
        }
        cursor
      } 
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
${REPOSITORY_DETAILS}${REVIEW_DETAIL}`

export const CREATE_REVIEW = gql`
mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    repositoryId
  }
}
`

export const DELETE_REVIEW = gql`
mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`