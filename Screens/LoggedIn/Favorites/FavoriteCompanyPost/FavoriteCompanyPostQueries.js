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
        sector
        user {
          id
          username
          avatar
        }
      }
      title
      content
      createdAt
      file {
        fileUrl
      }
      totalCompanyPostLikes
      totalCompanyPostComments
      deleted
    }
  }
`;
