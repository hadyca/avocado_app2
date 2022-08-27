import { gql } from "@apollo/client";

export const QUESTION_MUTATION = gql`
  mutation question($type: String!, $content: String!, $email: String!) {
    question(type: $type, content: $content, email: $email) {
      ok
      error
      id
    }
  }
`;
