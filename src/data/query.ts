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

export const GET_USER = gql`
  query User($userId: ID) {
  user(id: $userId) {
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

export const GET_USERS = gql`
  query Users {
    users {
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
      role
      registeredDate
    }
  }
`;


export const GET_USER_EMAIL = gql`
  query Query($userEmailId: ID) {
    userEmail(id: $userEmailId)
  }
`

export const GET_PUBLIC_USER_DETAILS = gql`
  query PublicUserDetails($userId: ID) {
    publicUserDetails(id: $userId) {
      firstName
      lastName
  }
}
`


export const GET_USER_ADDRESS = gql`
  query Address($userId: ID) {
    user(id: $userId) {
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
  query ProductReviews($productReviewsId: ID) {
    productReviews(id: $productReviewsId) {
      id
      userId
      productId
      rating
      review
      createdAt
    }
  }
`

export const GET_REVIEWS = gql`
  query Reviews {
  reviews {
    id
    userId {
      _id
      firstName
      lastName
      email
    }
    productId {
      _id
      title
      imgs {
        url
      }
    }
    rating
    review
    createdAt
    updateAt
  }
}
`

export const GET_ORDERS = gql`
query Orders {
  orders {
    id
    orderNumber
    userId
    status
    total
    subTotal
    tax
    orderPlaced
    items {
      productId
      color
      quantity
      size
      price
      imgUrl
    }
    shippingAddress {
      street
      city
      postcode
      state
      country
    }
  }
}
`

export const GET_ORDERS_BY_USER_ID = gql`
  query UserOrders($userOrdersId: ID) {
    userOrders(id: $userOrdersId) {
      id
      orderNumber
      userId
      status
      total
      subTotal
      tax
      items {
        productId
        color
        quantity
        size
        price
        imgUrl
      }
      shippingAddress {
        street
        city
        postcode
        state
        country
      }
      orderPlaced
    }
  }

`


export const GET_ORDER_DETAILS_BY_ORDER_NUMBER = gql`
query OrderByNumber($orderNumber: String) {
  orderByNumber(orderNumber: $orderNumber) {
    id
    orderNumber
    userId
    status
    total
    subTotal
    tax
    items {
      productId
      color
      quantity
      size
      price
      imgUrl
    }
    shippingAddress {
      street
      city
      postcode
      state
      country
    }
    orderPlaced
  }
}
`

export const GET_WISH_LIST_BY_USER_ID = gql`
  query WishListByUserId($userId: ID) {
    wishListByUserId(userId: $userId) {
      id
      userId
      products {
        id
        createdAt
      }
    }
  }
`

export const GET_PRODUCT_AND_USER = gql`
  query ProductAndUser($productId: ID, $userId: ID) {
    product(id: $productId) {
      imgs {
        url
      }
      id
      title
    }
    user(id: $userId) {
      firstName
      email
      lastName
    }
  }
`