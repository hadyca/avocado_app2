import { gql } from "@apollo/client";

export const USER_POST_FRAGMENT = gql`
  fragment UserPostFragment on UserPost {
    id
    user {
      id
      username
      avatarUrl
    }
    content
    category
    createdAt
    file {
      fileUrl
    }
  }
`;

export const USER_POST_COMMENT_FRAGMENT = gql`
  fragment UserPostCommentFragment on UserPostComment {
    id
    user {
      id
      username
      avatarUrl
    }
    payload
    isMine
    createdAt
  }
`;
