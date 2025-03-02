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
  query Products {
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

export const GET_REVIEWS_BY_PRODUCT_ID = gql`
  query ReviewsByProductId($reviewsByProductIdId: ID) {
    reviewsByProductId(id: $reviewsByProductIdId) {
      id
      customerId
      productId
      stars
      review
    }
  }
`