import * as React from 'react'
import { Form, FormItem, Modal, Button, Input, InputNumber, DatePicker } from 'antd'
import { CREATE_MOVIE } from '../queries/Mutations'
import { GET_MOVIES } from '../queries/Queries'
const { TextArea } = Input

const FormItem = Form.Item

interface IAddMovieProps {
  client: Object,
  form: Object
}

class AddMovie extends React.Component<IAddMovieProps, {}> {

  private submitRef = React.createRef<Button>()

  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { client, form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        const { poster, title, description, rating, date } = values
        client.mutate({
          mutation: CREATE_MOVIE, variables: {
            poster, title, description, rating, releaseDate: date
          },
          refetchQueries: {
            query: GET_MOVIES
          },
          update: (store, { data: { createMovie } }) => {
            const { movies } = store.readQuery({ query: GET_MOVIES })
            const newMovie = createMovie
            store.writeQuery({
              query: GET_MOVIES,
              data: { movies: [...movies, newMovie] }
            })
            form.resetFields()
            this.handleOk(e)
          }
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Movie
        </Button>
        <Modal
          title="Add Movie"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
          ]}
        >

          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              Poster
              {getFieldDecorator('poster', {
                rules: [{ required: true, message: 'Please enter poster url' }],
              })(
                <Input placeholder="movie poster url" />
              )}
            </FormItem>
            <FormItem>
              Title
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please enter title' }],
              })(
                <Input placeholder="title" />
              )}
            </FormItem>
            <FormItem>
              Description
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please enter description' }],
              })(
                <TextArea placeholder="description" rows={4} />
              )}
            </FormItem>
            <FormItem>
              Rating:
              <br />
              {getFieldDecorator('rating', {
                rules: [{ required: true, message: 'Please enter ratings' }],
              })(
                <InputNumber min={1} max={10} />
              )}
            </FormItem>
            <FormItem>
              Date
              <br />
              {getFieldDecorator('date', {
                rules: [{ required: true, message: 'Please select date' }],
              })(
                <DatePicker />
              )}
            </FormItem>
            <br />
            <Button ref={this.submitRef} type="primary" htmlType="submit" className="login-form-button">
              Add
          </Button>
          </Form>


        </Modal>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(AddMovie);

export default WrappedNormalLoginForm
