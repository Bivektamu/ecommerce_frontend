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
// export const EDIT_PRODUCT = gql`
// mutation EditProduct($input: EditProduct) {
//   editProduct(input: $input) {
//     colors
//     description
//     featured
//     id
//     imgs {
//       fileName
//       id
//       url
//     }
//     price
//     quantity
//     sizes
//     sku
//     slug
//     stockStatus
//     title
//   }
// }
// `


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

// export const CREATE_PRODUCT = gql`
// mutation CreateProduct($input: CreateProduct) {
//   createProduct(input: $input) {
//     success
//   }
// }
// `