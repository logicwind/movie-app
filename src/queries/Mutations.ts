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
  mutation deleteMovie($title: String!, $description: String!, $rating: Float!,$releaseDate: DateTime!, $poster: String!) {
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

export { CREATE_MOVIE, DELETE_MOVIE }

