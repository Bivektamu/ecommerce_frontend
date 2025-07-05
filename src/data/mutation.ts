import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
  mutation LogInAdmin($input: LogInInput!) {
    logInAdmin(input: $input) {
      token
    }
  }
`;


export const LOGIN_CUSTOMER = gql`
mutation LogInCustomer($input: LogInInput!) {
  logInCustomer(input: $input) {
    token
  }
}
`

export const CREATE_CUSTOMER = gql`
  mutation Mutation($input: CustomerInput) {
    createCustomer(input: $input) {
      id
    }
  }
`

export const UPDATE_ADDRESS = gql`
  mutation UpdateAddress($input: AddressInput) {
    updateAddress(input: $input) {
      city
      country
      postcode
      street
    }
}
`

export const CREATE_PRODUCT = gql`
mutation CreateProduct($input: CreateProduct) {
  createProduct(input: $input) {
    colors
    description
    featured
    id
    imgs {
      fileName
      id
      url
    }
    price
    quantity
    sizes
    sku
    slug
    stockStatus
    title
  }
}
`
export const EDIT_PRODUCT = gql`
mutation EditProduct($input: EditProduct) {
  editProduct(input: $input) {
    id
    title
    description
  }
}
`

export const DELETE_PRODUCT = gql`
  mutation Mutation($deleteProductId: ID) {
    deleteProduct(id: $deleteProductId) {
      success
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation CreateReview($input: CreateReview) {
    createReview(input: $input) {
      id
      customerId
      productId
      rating
      review
      timeStamp
    }
  }
`

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput) {
    createOrder(input: $input)
  }
`