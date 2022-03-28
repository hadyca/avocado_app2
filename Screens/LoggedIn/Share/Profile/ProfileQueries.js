import { gql } from "@apollo/client";

export const PROFILE_QUERY = gql`
  query seeProfile($userId: Int!) {
    seeProfile(userId: $userId) {
      id
      username
      email
      avatar
      bio
      isMe
      isFollowing
      following {
        id
        username
      }
      followers {
        id
        username
      }
      totalFollowers
      totalFollowing
      myCompany {
        id
        companyName
      }
    }
  }
`;

export const COMPANYPOST_QUERY = gql`
  query seeCompanyAllPosts($companyId: Int!, $offset: Int!) {
    seeCompanyAllPosts(companyId: $companyId, offset: $offset) {
      id
      title
    }
  }
`;
