import { gql } from "@apollo/client";
import {
  USER_POST_COMMENT_FRAGMENT,
  USER_POST_FRAGMENT,
} from "../../../../Fragments";

export const POST_DETAIL_QUERY = gql`
  query seeUserPost($userPostId: Int!) {
    seeUserPost(userPostId: $userPostId) {
      isLiked
      isMine
      isFavorite
      ...UserPostFragment
      totalUserPostComments
      # for comment scroll
      userPostComments {
        ...UserPostCommentFragment
        userPostReComments {
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

export const TOGGLE_USERPOST_FAVORITE_MUTATION = gql`
  mutation toggleFavoriteUserPost($userPostId: Int!) {
    toggleFavoriteUserPost(userPostId: $userPostId) {
      id
      user {
        id
        username
        avatarUrl
      }
      content
      category
      totalUserPostLikes
      createdAt
      isMine
      file {
        id
        fileUrl
      }
    }
  }
`;
