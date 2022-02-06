import { gql } from "@apollo/client";

export const CATEGORY_BOARD_QUERY = gql`
  query seeUserCategoryPost($category: String!, $offset: Int!) {
    seeUserCategoryPost(category: $category, offset: $offset) {
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
      createdAt
      isMine
      file {
        fileUrl
      }
      deleted
    }
  }
`;
