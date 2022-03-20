import { gql } from "@apollo/client";
import {
  USER_POST_COMMENT_FRAGMENT,
  USER_POST_FRAGMENT,
} from "../../../../Fragments";

export const POST_DETAIL_QUERY = gql`
  query seeCompanyPost($companyPostId: Int!) {
    seeCompanyPost(companyPostId: $companyPostId) {
      id
      company {
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
          id {
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
  }
`;

export const DELETE_COMPANYPOST_MUTATION = gql`
  mutation deleteCompanyPost($companyPostId: Int!) {
    deleteUserPost(companyPostId: $companyPostId) {
      ok
      error
    }
  }
`;

export const TOGGLE_COMPANYPOST_LIKE_MUTATION = gql`
  mutation toggleCompanyPostLike($companyPostId: Int!) {
    toggleCompanyPostLike(companyPostId: $userPostId) {
      ok
      error
    }
  }
`;
