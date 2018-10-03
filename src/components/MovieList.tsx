import * as React from 'react'
import { Row } from 'antd'
import { Query } from "react-apollo"
import { GET_MOVIES, GET_SELECTED_MOVIE } from '../queries/Queries'
import { SELECT_MOVIE, DELETE_MOVIE } from '../queries/Mutations'
import MovieCard from './MovieCard'

interface MovieListProps {
  client: any,
  showModal: any
}

class MovieList extends React.Component<MovieListProps, {}> {

  public deleteMovie = (id) => {
    const { client } = this.props
    client.mutate({
      mutation: DELETE_MOVIE, variables: {
        id: id
      },
      refetchQueries: {
        query: GET_MOVIES
      },
      update: (store, { data: { deleteMovie } }) => {
        const { movies } = store.readQuery({ query: GET_MOVIES })
        const deleteIndex = movies.findIndex(movie => movie.id === deleteMovie.id)
        const newMovies = [...movies.slice(0, deleteIndex), ...movies.slice(deleteIndex + 1)]
        store.writeQuery({
          query: GET_MOVIES,
          data: { movies: newMovies }
        })
      }
    })
  }

  public selectMovie = (movie) => {
    const { client } = this.props
    client.mutate({
      mutation: SELECT_MOVIE, variables: {
        ...movie
      },
      refetchQueries: {
        query: GET_SELECTED_MOVIE
      },
    })
    this.props.showModal()
  }

  public render() {
    return (
      <Query query={GET_MOVIES}>
        {({ loading, error, data }) => {
          if (loading) { return "Loading..." }
          if (error) { return `Error! ${error.message}` }

          return (
            <Row gutter={40} style={{ paddingTop: 40, }}>
              {data.movies ? data.movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} selectMovie={this.selectMovie} deleteMovie={this.deleteMovie} />
              )) : null}
            </Row>
          )
        }}
      </Query>
    )
  }
}


export default MovieList
