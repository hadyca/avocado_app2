import { gql } from "@apollo/client";

export const EDIT_AVATAR_MUTATION = gql`
  mutation editProfile($avatarUrl: Upload) {
    editProfile(avatarUrl: $avatarUrl) {
      id
      avatarUrl
    }
  }
`;
