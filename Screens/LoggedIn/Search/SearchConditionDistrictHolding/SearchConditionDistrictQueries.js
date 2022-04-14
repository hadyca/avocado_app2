import { gql } from "@apollo/client";

export const POST_QUERY = gql`
  query seeAllCompanyPosts {
    seeAllCompanyPosts {
      id
      company {
        id
        addressStep1
        addressStep2
      }
    }
  }
`;
