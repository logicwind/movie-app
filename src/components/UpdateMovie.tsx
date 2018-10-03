import * as React from 'react'
import { Form, Modal, Button, Input, InputNumber, DatePicker } from 'antd'
import { UPDATE_MOVIE } from '../queries/Mutations'
import { GET_MOVIES } from '../queries/Queries'
import moment from 'moment'

const { TextArea } = Input

const FormItem = Form.Item

interface IAddMovieProps {
  client: any,
  form: any,
  movie: any,
  visible: boolean,
  closeModal
}

class UpdateMovie extends React.Component<IAddMovieProps, {}> {

  handleOk = (e) => {
    this.props.closeModal()
  }

  handleCancel = (e) => {
    this.props.closeModal()
  }

  handleSubmit = (id, e) => {
    e.preventDefault()
    const { client, form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        const { poster, title, description, rating, date } = values
        this.handleOk(e)
        client.mutate({
          mutation: UPDATE_MOVIE, variables: {
            id, poster, title, description, rating, releaseDate: date
          },
          refetchQueries: {
            query: GET_MOVIES
          }
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { movie } = this.props
    return (
      <div>
        <Modal
          title="Update Movie"
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form onSubmit={(e) => this.handleSubmit(movie.id, e)} className="login-form">
            <FormItem>
              Poster
              {getFieldDecorator('poster', {
                rules: [{ required: true, message: 'Please enter poster url' }],
                initialValue: movie.poster
              })(
                <Input placeholder="movie poster url" />
              )}
            </FormItem>
            <FormItem>
              Title
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please enter title' }],
                initialValue: movie.title
              })(
                <Input placeholder="title" />
              )}
            </FormItem>
            <FormItem>
              Description
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please enter description' }],
                initialValue: movie.description
              })(
                <TextArea placeholder="description" rows={4} />
              )}
            </FormItem>
            <FormItem>
              Rating:
              <br />
              {getFieldDecorator('rating', {
                rules: [{ required: true, message: 'Please enter ratings' }],
                initialValue: movie.rating
              })(
                <InputNumber min={1} max={10} />
              )}
            </FormItem>
            <FormItem>
              Date
              <br />
              {getFieldDecorator('date', {
                rules: [{ required: true, message: 'Please select date' }],
                initialValue: moment(movie.releaseDate, 'YYYY-MM-DD')
              })(
                <DatePicker />
              )}
            </FormItem>
            <br />
            <Button type="primary" htmlType="submit" className="login-form-button">
              Update
          </Button>&nbsp;&nbsp;&nbsp;<Button key="back" onClick={this.handleCancel}>Cancel</Button>
          </Form>
        </Modal>
      </div>
    )
  }
}

const WrappedUpdateMovie = Form.create()(UpdateMovie)

export default WrappedUpdateMovie
