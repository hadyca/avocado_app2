import { gql } from "@apollo/client";

export const USERPOST_QUERY = gql`
  query seeFavoriteUserPosts($offset: Int!) {
    seeFavoriteUserPosts(offset: $offset) {
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
        id
        fileUrl
      }
      totalUserPostLikes
      totalUserPostComments
      deleted
    }
  }
`;
