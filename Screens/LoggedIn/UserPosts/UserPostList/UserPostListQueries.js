import { gql } from "@apollo/client";
import { USER_POST_FRAGMENT } from "../../../../Fragments";

export const POST_QUERY = gql`
  query seeAllUserPosts($offset: Int!) {
    seeAllUserPosts(offset: $offset) {
      ...UserPostFragment
      totalUserPostLikes
      totalUserPostComments
    }
  }
  ${USER_POST_FRAGMENT}
`;
