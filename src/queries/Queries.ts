import gql from "graphql-tag"

const GET_MOVIES = gql`
  {
  movies {
    id
    title
    description
    rating
    poster
    releaseDate
  }
}
`

const GET_MOVIE = gql`
query getMovie($id: ID!) {
  movie(where: {id: $id}) {
    id
    title
    description
    rating
    poster
    releaseDate
  }
}
`

const GET_SELECTED_MOVIE = gql`
  {
    selectedMovie @client {
      id
      title
      description
      rating
      poster
      releaseDate
    }
  }
`

export { GET_MOVIES, GET_MOVIE, GET_SELECTED_MOVIE }
