import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Notifications = (props) => {
  return (
    <div>
      <Card style={{ width: '18rem', marginTop: '1rem' }}>
        <Card.Header>Notifications</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Notification #1</ListGroup.Item>
          <ListGroup.Item>Notification #2</ListGroup.Item>
          <ListGroup.Item>Notification #3</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  )
}

export default Notifications;