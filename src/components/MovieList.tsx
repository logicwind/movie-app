import * as React from 'react'
const { Meta } = Card
import { Card } from 'antd'
import { Col, Icon, Popconfirm, Row } from 'antd'
import { Query } from "react-apollo"
import { GET_MOVIES } from '../queries/Queries'
import { DELETE_MOVIE } from '../queries/Mutations'

interface MovieListProps {
  client: Object
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


  public render() {
    return (
      <Query query={GET_MOVIES}>
        {({ loading, error, data }) => {
          if (loading) { return "Loading..." }
          if (error) { return `Error! ${error.message}` }

          return (
            <Row gutter={40} style={{ paddingTop: 40, }}>
              {data.movies ? data.movies.map(movie => (

                <Col xs={{ span: 12 }} lg={{ span: 6 }} style={{ height: 800 }} key={movie.id}>
                  <div>
                    <Card
                      key={movie.id}
                      style={{ width: 300 }}
                      cover={<img alt={movie.title} src={movie.poster} />}
                      actions={[
                      // <Icon key="edit" type="edit" />,
                      <Popconfirm key="delete" title="Are you sure delete this movie?" onConfirm={e => this.deleteMovie(movie.id)} okText="Yes" cancelText="No">
                        <a href="#"><Icon type="delete" /></a>
                      </Popconfirm>]}
                    >
                      <Meta
                        title={movie.title}
                        description={<div>{movie.description}
                          <br /><b>rating</b>: {movie.rating}/10
                          <br /><b>release date</b>: {new Date(movie.releaseDate).toString()}</div>}
                      />
                    </Card>
                  </div>
                </Col>
              )) : null}
            </Row>
          )
        }}
      </Query>
    )
  }
}


export default MovieList
