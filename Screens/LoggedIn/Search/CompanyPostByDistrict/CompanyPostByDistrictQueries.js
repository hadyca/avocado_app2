import { gql } from "@apollo/client";

export const COMPANYPOST_QUERY = gql`
  query seeCompanyPostByDistrict($addressStep2: String!, $offset: Int!) {
    seeCompanyPostByDistrict(addressStep2: $addressStep2, offset: $offset) {
      id
      company {
        id
        companyName
        aboutUs
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
