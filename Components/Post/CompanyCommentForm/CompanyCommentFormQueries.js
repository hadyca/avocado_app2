import { gql } from "@apollo/client";

export const CREATE_COMMENT_MUTATION = gql`
  mutation createCompanyPostComment($companyPostId: Int!, $payload: String!) {
    createCompanyPostComment(companyPostId: $companyPostId, payload: $payload) {
      createdAt
      id
      isMine
      payload
      user {
        id
        username
        avatar
      }
    }
  }
`;

export const CREATE_RECOMMENT_MUTATION = gql`
  mutation createCompanyRePostComment(
    $companyPostCommentId: Int!
    $payload: String!
  ) {
    createCompanyRePostComment(
      companyPostCommentId: $companyPostCommentId
      payload: $payload
    ) {
      createdAt
      id
      isMine
      payload
      user {
        id
        username
        avatar
      }
    }
  }
`;
