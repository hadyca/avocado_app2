import { gql } from "@apollo/client";

export const POST_DETAIL_QUERY = gql`
  query seeUserPost($userPostId: Int!) {
    seeUserPost(userPostId: $userPostId) {
      id
      user {
        id
        username
        avatar
      }
      title
      content
      category
      file {
        fileUrl
      }
      userPostComments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
        deleted
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
          deleted
          isMine
        }
      }
      isMine
      isLiked
      totalUserPostLikes
    }
  }
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
