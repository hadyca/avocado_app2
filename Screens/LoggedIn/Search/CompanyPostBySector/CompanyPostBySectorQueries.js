import { gql } from "@apollo/client";

export const COMPANYPOST_QUERY = gql`
  query seeCompanyPostBySector($sector: String!, $offset: Int!) {
    seeCompanyPostBySector(sector: $sector, offset: $offset) {
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
