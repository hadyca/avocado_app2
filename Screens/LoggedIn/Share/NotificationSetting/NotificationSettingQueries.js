import { gql } from "@apollo/client";

export const NOTI_USER_POST_LIKE_MUTATION = gql`
  mutation notificationUserPostLike($state: Boolean!) {
    notificationUserPostLike(state: $state) {
      ok
      error
    }
  }
`;
