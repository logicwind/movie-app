import * as React from 'react'
const { Content, Header } = Layout
import { Layout, Menu } from 'antd'
import './App.css'
import MovieList from './components/MovieList'
import AddMovie from './components/AddMovie'
import UpdateMovie from './components/UpdateMovie'
import { Query } from 'react-apollo';
import { GET_SELECTED_MOVIE } from './queries/Queries';

interface IAppProps {
  client: any
}

class App extends React.Component<IAppProps, {}> {
  public render() {
    return (
      <Layout className="layout">
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Movie App</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '50px' }}>
          <AddMovie client={this.props.client} />
          <MovieList client={this.props.client} />
          <Query query={GET_SELECTED_MOVIE}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`
              return (
                data.selectedMovie.title ? <UpdateMovie movie={data.selectedMovie} client={this.props.client} /> : null
              )
            }}
          </Query>
        </Content>
      </Layout>
    )
  }
}

export default App
