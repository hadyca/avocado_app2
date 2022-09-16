import { gql } from "@apollo/client";

export const NOTIFICATION_QUERY = gql`
  query seeAllNotification($offset: Int!) {
    seeAllNotification(offset: $offset) {
      id
      content
      postId
      type
      createdAt
    }
  }
`;
