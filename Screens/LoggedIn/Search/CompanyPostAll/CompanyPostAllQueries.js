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

export const COMPANYPOST_DISTRICT_QUERY = gql`
  query seeCompanyPostByDistrict(
    $addressStep1: String
    $addressStep2_1: String
    $addressStep2_2: String
    $addressStep2_3: String
    $addressStep2_4: String
    $addressStep2_5: String
    $offset: Int!
  ) {
    seeCompanyPostByDistrict(
      addressStep1: $addressStep1
      addressStep2_1: $addressStep2_1
      addressStep2_2: $addressStep2_2
      addressStep2_3: $addressStep2_3
      addressStep2_4: $addressStep2_4
      addressStep2_5: $addressStep2_5
      offset: $offset
    ) {
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
