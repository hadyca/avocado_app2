import { gql } from "@apollo/client";

export const CREATE_COMMENT_MUTATION = gql`
  mutation createUserPostComment($userPostId: Int!, $payload: String!) {
    createUserPostComment(userPostId: $userPostId, payload: $payload) {
      ok
      error
    }
  }
`;

export const CREATE_RECOMMENT_MUTATION = gql`
  mutation createUserRePostComment(
    $userPostCommentId: Int!
    $payload: String!
  ) {
    createUserPostReComment(
      userPostCommentId: $userPostCommentId
      payload: $payload
    ) {
      ok
      error
    }
  }
`;
