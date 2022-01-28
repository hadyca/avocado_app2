import { gql } from "@apollo/client";

export const POST_QUERY = gql`
  query seeAllUserPosts($offset: Int!) {
    seeAllUserPosts(offset: $offset) {
      id
      user {
        username
        avatar
      }
      title
      content
      category
      totalUserPostLikes
      totalUserPostComments
      isMine
      file {
        fileUrl
      }
      deleted
    }
  }
`;
