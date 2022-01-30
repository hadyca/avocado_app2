import { gql } from "@apollo/client";

export const COMMENT_QUERY = gql`
  query seeUserPostComment($userPostCommentId: Int!) {
    seeUserPostComment(userPostCommentId: $userPostCommentId) {
      id
      user {
        id
        username
        avatar
      }
      payload
      userPostReComments {
        id
        user {
          id
          username
          avatar
        }
        payload
        createdAt
        updatedAt
        isMine
      }
      createdAt
      updatedAt
      isMine
    }
  }
`;
