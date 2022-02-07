import { gql } from "@apollo/client";
import {
  USER_POST_COMMENT_FRAGMENT,
  USER_POST_FRAGMENT,
} from "../../../../Fragments";

export const POST_DETAIL_QUERY = gql`
  query seeUserPost($userPostId: Int!) {
    seeUserPost(userPostId: $userPostId) {
      ...UserPostFragment
      isLiked
      isMine
      userPostComments {
        ...UserPostCommentFragment
        userPostReComments {
          id
          user {
            id
            username
            avatar
          }
          payload
          isMine
          createdAt
        }
      }
    }
  }
  ${USER_POST_FRAGMENT}
  ${USER_POST_COMMENT_FRAGMENT}
`;

export const DELETE_USERPOST_MUTATION = gql`
  mutation deleteUserPost($userPostId: Int!) {
    deleteUserPost(userPostId: $userPostId) {
      ok
      error
    }
  }
`;

export const TOGGLE_USERPOST_LIKE_MUTATION = gql`
  mutation toggleUserPostLike($userPostId: Int!) {
    toggleUserPostLike(userPostId: $userPostId) {
      ok
      error
    }
  }
`;
