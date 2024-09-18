import { gql } from "@apollo/client";

export const GET_AUTH = gql`
  query GetAuthStatus {
    getAuthStatus {
      isLoggedIn
      userRole
    }
  }
`;

export const GET_CUSTOMER = gql`
  query Customer($customerId: ID) {
  customer(id: $customerId) {
    id
    firstName
    lastName
    email
    password
  }
}
`;

export const GET_PRODUCTS = gql`
  query Query {
  products {
    id
    title
    slug
    description
    colors
    sizes
    price
    quantity
    imgs {
      fileName
      id
      url
    }
    category
    sku
    stockStatus
    featured
  }
}
`
