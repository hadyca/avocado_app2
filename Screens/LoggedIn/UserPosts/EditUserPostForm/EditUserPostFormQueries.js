import { gql } from "@apollo/client";

export const EDIT_USERPOST_MUTATION = gql`
  mutation editUserPost(
    $userPostId: Int!
    $fileUrl: [Upload]
    $content: String!
    $category: String!
  ) {
    editUserPost(
      userPostId: $userPostId
      fileUrl: $fileUrl
      content: $content
      category: $category
    ) {
      ok
      error
      id
    }
  }
`;
