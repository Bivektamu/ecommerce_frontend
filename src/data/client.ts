import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import {setContext} from '@apollo/client/link/context'
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";



// Create an upload link for handling file uploads

const uri = import.meta.env.PROD? import.meta.env.VITE_PROD_URI: import.meta.env.VITE_DEV_URI
// const devURI = 
const uploadLink = createUploadLink({
    uri
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
    cache: new InMemoryCache(),
})

export default client