import { gql } from "@apollo/client";

export const COMPANYPOST_QUERY = gql`
  query seeFavoriteCompanyPosts($offset: Int!) {
    seeFavoriteCompanyPosts(offset: $offset) {
      id
      company {
        id
        companyName
        addressStep1
        addressStep2
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
        mon
        tue
        wed
        thu
        fri
        sat
        sun
      }
      dayOption
      startTime
      finishTime
      timeOption
      wageType
      wage
      contactNumber
      email
      createdAt
      totalCompanyPostLikes
      totalCompanyPostComments
    }
  }
`;
