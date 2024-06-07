import { gql } from "@apollo/client";

export const GET_AUTH = gql`
  query GetAuthStatus {
    getAuthStatus {
      isLoggedIn
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
