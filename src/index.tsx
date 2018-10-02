import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import App from './App'
import apolloClient from './config/apolloConfig'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App client={apolloClient} />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
