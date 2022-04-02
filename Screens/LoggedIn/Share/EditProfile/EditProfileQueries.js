import { gql } from "@apollo/client";

export const EDIT_PROFILE_MUTATION = gql`
  query editProfile(
    $username: String
    $password: String
    $bio: String
    $avatar: Upload
  ) {
    editProfile(
      username: $username
      password: $password
      bio: $bio
      avatar: $avatar
    ) {
      ok
      error
    }
  }
`;
