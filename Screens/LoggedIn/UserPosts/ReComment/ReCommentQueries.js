import { gql } from "@apollo/client";
import { USER_POST_COMMENT_FRAGMENT } from "../../../../Fragments";

export const COMMENT_QUERY = gql`
  query seeUserPostComment($userPostCommentId: Int!) {
    seeUserPostComment(userPostCommentId: $userPostCommentId) {
      ...UserPostCommentFragment
    }
  }
  ${USER_POST_COMMENT_FRAGMENT}
`;
