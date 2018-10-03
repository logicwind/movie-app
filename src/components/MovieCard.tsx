import * as React from 'react'
import { Card } from 'antd'
import { Col, Icon, Popconfirm } from 'antd'
const { Meta } = Card

export default function MovieCard(props) {
  const { movie, selectMovie, deleteMovie } = props
  return (
    <Col xs={{ span: 12 }} lg={{ span: 6 }} style={{ height: 800 }}>
      <div>
        <Card
          key={movie.id}
          style={{ width: 300 }}
          cover={<img alt={movie.title} src={movie.poster} />}
          actions={[
            <Icon key="edit" type="edit" onClick={() => selectMovie(movie)} />,
            <Popconfirm key="delete" title="Are you sure delete this movie?" onConfirm={e => deleteMovie(movie.id)} okText="Yes" cancelText="No">
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
  )
}
