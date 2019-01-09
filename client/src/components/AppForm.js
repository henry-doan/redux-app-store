import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form} from 'semantic-ui-react'
import {addApp, updateApp} from '../reducer/apps'

class AppForm extends Component {
  initialState = {
    name: '',
    description: '',
    price: '',
    category: '',
    version: '',
    author: '',
  }

  state = {...this.initialState}

  componentDidMount() {
    if (this.props.id) 
      this.setState({ ...this.props })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const app = { ...this.state }
    const { dispatch, closeForm } = this.props
    const func = this.props.id ? updateApp : addApp
    dispatch(func(app))
    closeForm()
  }

  render() {
    const { name, description, category, price, version, author } = this.state
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          name='name'
          required
          defaultValue={name}
          onChange={this.handleChange}
          label='Name'
        />
        <Form.Input
          name='description'
          required
          defaultValue={description}
          onChange={this.handleChange}
          label='Description'
        />
        <Form.Input
          name='category'
          required
          defaultValue={category}
          onChange={this.handleChange}
          label='Category'
        />
        <Form.Input
          name='version'
          required
          defaultValue={version}
          onChange={this.handleChange}
          label='Version'
        />
        <Form.Input
          name='author'
          required
          defaultValue={author}
          onChange={this.handleChange}
          label='Author'
        />
        <Form.Input
          name='price'
          required
          defaultValue={price}
          onChange={this.handleChange}
          label='price'
          type='number'
          min='0'
        />
        <Form.Button>Save</Form.Button>
      </Form>
    )
  }

}

export default connect()(AppForm);