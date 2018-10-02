import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { withClientState } from 'apollo-link-state'
import { createHttpLink } from 'apollo-link-http'
import { GET_MOVIE, GET_SELECTED_MOVIE } from '../queries/Queries'

const httpLink = createHttpLink({
  uri: 'https://api-apeast.graphcms.com/v1/cjmrnaeiu644k01cu4ez34mxv/master',
})

const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  return {
    headers: {
      ...headers,
      authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJ0b2tlbklkIjoiYjY5NTViYmMtZTcwMS00ZGQ3LWE4MjItYWNhZGVlMGU0NmNkIn0.q1vgvAuuUAYhDnPpvSrhVkh4W5c8rWIUr77NaxxYYmc',
    }
  }
})

const initialState = {
  selectedMovie: {
    id: '0',
    title: '',
    description: '',
    rating: 0,
    poster: '',
    releaseDate: '',
    __typename: 'movie'
  },
};

const selectMovie = (_, movie, { cache }) => {

  let selectedMovie = { ...movie, __typename: 'movie' }

  cache.writeQuery({
    query: GET_SELECTED_MOVIE,
    data: { selectedMovie },
  })

  return selectedMovie
}

const stateLink = withClientState({
  cache,
  defaults: initialState,
  resolvers: {
    Mutation: {
      selectMovie,
    },
  },
});

const link = ApolloLink.from([authLink, stateLink, httpLink])

const apolloClient = new ApolloClient({
  cache: cache,
  link
})

export default apolloClient
