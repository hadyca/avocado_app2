import { gql } from "@apollo/client";

export const COMPANYPOST_QUERY = gql`
  query seeFavoriteCompanyPosts($offset: Int!) {
    seeFavoriteCompanyPosts(offset: $offset) {
      id
      company {
        id
        companyName
        aboutUs
        addressStep1
        addressStep2
        addressStep3
        user {
          id
          username
          avatarUrl
        }
      }
      title
      content
      createdAt
      file {
        id
        fileUrl
      }
      totalCompanyPostLikes
      totalCompanyPostComments
    }
  }
`;
