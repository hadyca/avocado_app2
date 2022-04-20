import { gql } from "@apollo/client";

export const UPLOAD_COMPANY_POST_MUTATION = gql`
  mutation uploadCompanyPost(
    $fileUrl: [Upload]
    $title: String!
    $mon: Boolean!
    $tue: Boolean!
    $wed: Boolean!
    $thu: Boolean!
    $fri: Boolean!
    $sat: Boolean!
    $sun: Boolean!
    $dayOption: Boolean!
    $startTime: Int!
    $finishTime: Int!
    $timeOption: Boolean!
    $wageType: String!
    $wage: Int!
    $content: String!
  ) {
    uploadCompanyPost(
      fileUrl: $fileUrl
      title: $title
      mon: $mon
      tue: $tue
      wed: $wed
      thu: $thu
      fri: $fri
      sat: $sat
      sun: $sun
      dayOption: $dayOption
      startTime: $startTime
      finishTime: $finishTime
      timeOption: $timeOption
      wageType: $wageType
      wage: $wage
      content: $content
    ) {
      id
      company {
        id
        companyName
        aboutUs
        sector
        totalEmployees
        email
        contactNumber
        addressStep1
        addressStep2
        addressStep3
      }
      title
      workingDay {
        id
        monday
        tuesday
        wednesday
        thursday
        friday
        saturday
        sunday
      }
      dayOption
      startTime
      finishTime
      timeOption
      content
      totalCompanyPostLikes
      createdAt
      isMine
      file {
        id
        fileUrl
      }
    }
  }
`;
