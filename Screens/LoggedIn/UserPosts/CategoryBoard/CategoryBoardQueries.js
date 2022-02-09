import { gql } from "@apollo/client";
import { USER_POST_FRAGMENT } from "../../../../Fragments";

export const CATEGORY_BOARD_QUERY = gql`
  query seeUserCategoryPost($category: String!, $offset: Int!) {
    seeUserCategoryPost(category: $category, offset: $offset) {
      ...UserPostFragment
      totalUserPostLikes
      totalUserPostComments
      deleted
    }
  }
  ${USER_POST_FRAGMENT}
`;
