import { gql } from "@apollo/client";

export const PROFILE_QUERY = gql`
  query seeProfile($userId: Int!) {
    seeProfile(userId: $userId) {
      id
      username
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
        aboutUs
        contactNumber
        totalEmployees
      }
    }
  }
`;
