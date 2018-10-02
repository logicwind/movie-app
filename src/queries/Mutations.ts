import gql from "graphql-tag"

const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID!) {
  deleteMovie(where: {id: $id} ) {
    id
    title
    description
    rating
    poster
  }
}
`

const CREATE_MOVIE = gql`
  mutation($title: String!, $description: String!, $rating: Float!,$releaseDate: DateTime!, $poster: String!) {
  createMovie(data: { title: $title, description: $description, rating: $rating, releaseDate: $releaseDate,poster: $poster }) {
    id
    title
    description
    rating
    poster
    releaseDate
  }
}
`

const UPDATE_MOVIE = gql`
  mutation($id: ID!, $title: String!, $description: String!, $rating: Float!,$releaseDate: DateTime!, $poster: String!) {
    updateMovie(data: { title: $title, description: $description, rating: $rating, releaseDate: $releaseDate,poster: $poster }, , where: { id: $id }) {
    id
    title
    description
    rating
    poster
    releaseDate
  }
}
`

const SELECT_MOVIE = gql`
  mutation($id: ID!, $title: String!, $description: String!, $rating: Float!,$releaseDate: DateTime!, $poster: String!) {
    selectMovie(id: $id, title: $title, description: $description, rating: $rating, releaseDate: $releaseDate,poster: $poster) @client {
      id
      title
      description
      rating
      poster
      releaseDate
    }
  }
`

export { CREATE_MOVIE, UPDATE_MOVIE, DELETE_MOVIE, SELECT_MOVIE }

