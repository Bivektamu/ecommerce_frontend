import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation LogInAdmin($input: SignInInput!) {
    logInAdmin(input: $input) {
      token
    }
  }
`;

// export const UPLOAD_FILE = gql`
//   mutation UploadFile($file: Upload!) {
//     uploadFile(file: $file) {
//       filename
//       mimetype
//       encoding
//     }
//   }
// `;




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