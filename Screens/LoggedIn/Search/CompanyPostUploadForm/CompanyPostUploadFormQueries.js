import { gql } from "@apollo/client";

export const UPLOAD_COMPANY_POST_MUTATION = gql`
  mutation uploadCompanyPost(
    $fileUrl: [Upload]
    $title: String!
    $content: String!
  ) {
    uploadCompanyPost(fileUrl: $fileUrl, title: $title, content: $content) {
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
