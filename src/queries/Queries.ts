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

export { GET_MOVIES }
