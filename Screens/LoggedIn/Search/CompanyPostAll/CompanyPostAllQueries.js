import { gql } from "@apollo/client";

export const COMPANYPOST_QUERY = gql`
  query seeAllCompanyPosts($offset: Int!) {
    seeAllCompanyPosts(offset: $offset) {
      id
      company {
        id
        companyName
        addressStep1
        addressStep2
        sector
        user {
          id
          username
          avatarUrl
        }
      }
      title
      content
      workingDay {
        id
      }
      dayOption
      startTime
      finishTime
      timeOption
      wageType
      wage
      createdAt
      totalCompanyPostLikes
      totalCompanyPostComments
      deleted
    }
  }
`;
