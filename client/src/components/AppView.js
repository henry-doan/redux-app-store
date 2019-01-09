import React from 'react';
import { connect } from 'react-redux';
import { Divider, Header, Image, Container, Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import AppForm from './AppForm';
import { deleteApp } from '../reducer/apps';

class AppView extends React.Component {
  state = {showForm: false}

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm})
  }

  handleDelete = () => {
    const { app, dispatch, history: { push }} = this.props
    dispatch(deleteApp(app.id))
    push('/apps')
  }

  render() {
    const { showForm } = this.state
    const { app = {} } = this.props
    
    return (
      <Container>
        <Link to='/apps'>View all apps</Link>
        <Button onClick={this.toggleForm}>
          { showForm ? 'Cancel' : 'Edit' }
        </Button>
        <Button onClick={this.handleDelete}>
          Delete
        </Button>
        { 
          showForm ? 
          <AppForm {...app} closeForm={this.toggleForm} />
          :
          <div>
            <Header>{app.name}</Header>
            <Image src={app.logo} />

            <Table definition>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>Description</Table.Cell>
                  <Table.Cell>{app.description}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Author</Table.Cell>
                  <Table.Cell>{app.author}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Version</Table.Cell>
                  <Table.Cell>{app.version}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Price</Table.Cell>
                  <Table.Cell>$ {app.price}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Category</Table.Cell>
                  <Table.Cell>{app.category}</Table.Cell>
                </Table.Row>

              </Table.Body>

            </Table>
        </div>
        
        
        }
      </Container>
      
    )
  }

}
  
  

const mapStoreToProps = (store, props) => {
  return {app: store.apps.find( a => a.id === parseInt(props.match.params.id))}
}

export default connect(mapStoreToProps)(AppView);