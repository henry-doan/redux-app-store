import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getApps } from '../reducer/apps';
import AppForm from './AppForm';

class Apps extends React.Component {
  state = { showForm: false }

  componentDidMount() {
    this.props.dispatch(getApps())
  }

  toggleForm = () => {
    this.setState( state => {
      return { showForm: !state.showForm }
    })
  }

  apps = () => {
    return this.props.apps.map( a => 
      <Card key={a.id}>
        <Image src={ a.logo } />
        <Card.Content>
          <Card.Header>{a.name}</Card.Header>
          <Card.Meta>
            <span>
              {a.author}
            </span>
          </Card.Meta>
          <Card.Description>
            {a.category}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/apps/${a.id}`}>
            View App
          </Link>
        </Card.Content>
      </Card>
    )
  }

  render() {
    const { showForm } = this.state
    
    return (
      <div>
        <h1>Apps Component</h1>
        <Button onClick={this.toggleForm}>
          { showForm ? 'Hide Form' : 'Show Form' }
        </Button>
        {
          showForm ? 
          <AppForm closeForm={this.toggleForm} />
          :

          <Card.Group itemsPerRow={4}>
            { this.apps() }
          </Card.Group>
        }
      </div>
    )
  }
}

const mapStoreToProps = (store) => {
  return { apps: store.apps }
}

export default connect(mapStoreToProps)(Apps);
