import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { AdminStore } from './store/index.ts'
import { ApolloProvider } from '@apollo/client'
import client from './data/client.ts'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={AdminStore}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider >,
)
