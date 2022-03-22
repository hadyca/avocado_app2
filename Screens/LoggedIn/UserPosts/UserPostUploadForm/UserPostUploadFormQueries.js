import { gql } from "@apollo/client";

export const UPLOAD_USER_POST_MUTATION = gql`
  mutation uploadUserPost(
    $fileUrl: [Upload]
    $content: String!
    $category: String!
  ) {
    uploadUserPost(fileUrl: $fileUrl, content: $content, category: $category) {
      id
      user {
        username
        avatar
      }
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
