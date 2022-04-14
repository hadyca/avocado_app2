import { gql } from "@apollo/client";

export const EDIT_AVATAR_MUTATION = gql`
  mutation editProfile($avatarUrl: Upload) {
    editProfile(avatarUrl: $avatarUrl) {
      id
      avatarUrl
    }
  }
`;

export const EDIT_COMPANY_MUTATION = gql`
  mutation editCompany($sector: String) {
    editCompany(sector: $sector) {
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
  }
`;
