import { gql } from "@apollo/client";

export const UPLOAD_USER_POST_MUTATION = gql`
  mutation uploadUserPost(
    $fileUrl: [Upload]
    $title: String!
    $content: String!
    $category: String!
  ) {
    uploadUserPost(
      fileUrl: $fileUrl
      title: $title
      content: $content
      category: $category
    ) {
      id
      user {
        username
        avatar
      }
      title
      content
      category
      totalUserPostLikes
      createdAt
      isMine
      file {
        fileUrl
      }
    }
  }
`;
