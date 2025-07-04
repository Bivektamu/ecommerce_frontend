import { gql } from "@apollo/client";

export const GET_AUTH = gql`
  query GetAuthStatus {
    getAuthStatus {
      isLoggedIn
      user {
        role
        id
      }
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
    address {
        street
        city
        postcode
        state
        country
      }
  }
}
`;

export const GET_CUSTOMER_EMAIL = gql`
  query Query($customerEmailId: ID) {
    customerEmail(id: $customerEmailId)
  }
`

export const GET_CUSTOMER_NAME = gql`
  query CustomerName($customerNameId: ID) {
    customerName(id: $customerNameId) {
      firstName
      lastName
  }
}
`

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
      timeStamp
      rating
      review
    }
  }
`