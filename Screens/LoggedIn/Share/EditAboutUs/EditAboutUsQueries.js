import { gql } from "@apollo/client";

export const EDIT_COMPANY_MUTATION = gql`
  mutation editCompany($aboutUs: String) {
    editCompany(aboutUs: $aboutUs) {
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
