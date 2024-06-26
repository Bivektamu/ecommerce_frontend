import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from "@apollo/client";
import {setContext} from '@apollo/client/link/context'
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

// const httpLink = createHttpLink({
//     uri:'http://localhost:3000/graphql',
    
// })

// Create an upload link for handling file uploads
const uploadLink = createUploadLink({
    uri: 'http://localhost:3000/graphql',
});


const authLink = setContext((_, {headers})=> {
    const token = localStorage.getItem('token')
    
    return {
        headers: {
            ...headers,
            token: token? token : '',
            'Apollo-Require-Preflight': 'true'
        }
    }
})

// Use ApolloLink.from to concatenate multiple links
const link = ApolloLink.from([
    authLink,
    uploadLink,
    // httpLink,
]);

const client = new ApolloClient({
    link:link,
    cache: new InMemoryCache()
})

export default client