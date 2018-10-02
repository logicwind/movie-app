import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'

const httpLink = createHttpLink({
  uri: 'https://api-apeast.graphcms.com/v1/cjmrnaeiu644k01cu4ez34mxv/master',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  return {
    headers: {
      ...headers,
      authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJ0b2tlbklkIjoiYjY5NTViYmMtZTcwMS00ZGQ3LWE4MjItYWNhZGVlMGU0NmNkIn0.q1vgvAuuUAYhDnPpvSrhVkh4W5c8rWIUr77NaxxYYmc',
    }
  }
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

export default apolloClient
