import { gql } from "@apollo/client";

export const EDIT_COMPANYPOST_MUTATION = gql`
  mutation editCompanyPost(
    $companyPostId: Int!
    $fileUrl: [Upload]
    $title: String!
    $content: String!
  ) {
    editCompanyPost(
      companyPostId: $companyPostId
      fileUrl: $fileUrl
      title: $title
      content: $content
    ) {
      ok
      error
      id
    }
  }
`;
