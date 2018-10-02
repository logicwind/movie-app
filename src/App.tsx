import * as React from 'react'
const { Content, Header } = Layout
import { Layout, Menu } from 'antd'
import './App.css'
import MovieList from './components/MovieList'
import AddMovie from './components/AddMovie'

interface IAppProps {
  client: Object
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
        </Content>
      </Layout>
    )
  }
}

export default App
