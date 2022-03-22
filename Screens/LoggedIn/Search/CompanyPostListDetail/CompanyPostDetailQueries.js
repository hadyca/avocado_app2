import { gql } from "@apollo/client";

export const POST_DETAIL_QUERY = gql`
  query seeCompanyPost($companyPostId: Int!) {
    seeCompanyPost(companyPostId: $companyPostId) {
      id
      company {
        id
        user {
          id
          username
          avatar
        }
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
      file {
        fileUrl
      }
      title
      content
      totalCompanyPostComments
      isMine
      isLiked
      companyPostComments {
        id
        user {
          id
          username
          avatar
        }
        payload
        isMine
        createdAt
        companyPostReComments {
          id
          user {
            id
            username
            avatar
          }
          payload
          isMine
          createdAt
        }
      }
    }
  }
`;

export const DELETE_COMPANYPOST_MUTATION = gql`
  mutation deleteCompanyPost($companyPostId: Int!) {
    deleteCompanyPost(companyPostId: $companyPostId) {
      ok
      error
    }
  }
`;

export const TOGGLE_COMPANYPOST_LIKE_MUTATION = gql`
  mutation toggleCompanyPostLike($companyPostId: Int!) {
    toggleCompanyPostLike(companyPostId: $companyPostId) {
      ok
      error
    }
  }
`;
