import { gql } from "@apollo/client";

export const PROFILE_QUERY = gql`
  query seeProfile($userId: Int!) {
    seeProfile(userId: $userId) {
      id
      username
      usernameEditDate
      email
      avatarUrl
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
      totalUserPosts
      totalCompanyPosts
      totalFollowers
      totalFollowing
      myCompany {
        id
        companyName
        addressStep1
        addressStep2
        addressStep3
        email
        sector
        aboutUs
        contactNumber
        totalEmployees
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
