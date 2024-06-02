import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation LogInAdmin($input: SignInInput!) {
    logInAdmin(input: $input) {
      token
    }
  }
`;

