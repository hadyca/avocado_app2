import { gql } from "@apollo/client";

export const PROFILE_QUERY = gql`
  query seeProfile($userId: Int!) {
    seeProfile(userId: $userId) {
      id
      username
      email
      avatarUrl
      bio
      isMe
      alertStatus
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
