import { gql } from "@apollo/client";

export const EDIT_COMPANYPOST_MUTATION = gql`
  mutation editCompanyPost(
    $companyPostId: Int!
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
    $wage: String!
    $contactNumber: String!
    $email: String!
    $content: String!
  ) {
    editCompanyPost(
      companyPostId: $companyPostId
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
      contactNumber: $contactNumber
      email: $email
      content: $content
    ) {
      ok
      error
      id
    }
  }
`;
