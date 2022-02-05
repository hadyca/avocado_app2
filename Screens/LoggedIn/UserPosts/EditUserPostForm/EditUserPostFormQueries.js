import { gql } from "@apollo/client";

export const EDIT_USERPOST_MUTATION = gql`
  mutation editUserPost(
    $userPostId: Int!
    $fileUrl: [Upload]
    $title: String!
    $content: String!
    $category: String!
  ) {
    editUserPost(
      userPostId: $userPostId
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
