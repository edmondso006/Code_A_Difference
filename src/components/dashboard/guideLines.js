import React from 'react';
import Card from 'react-bootstrap/Card';

const GuideLines = (props) => {
  return (
    <div>
      <Card style={{ marginTop: '1rem' }}>
        <Card.Body>
          <Card.Title>GuideLines</Card.Title>
          <Card.Subtitle>Follow these GuideLines</Card.Subtitle>
            <ul>
              <li>Proper Documentation</li>
              <li>Follow through!!!</li>
              <li>Gather concrete requirements</li>
              <li>Pick the best technology for the job</li>
            </ul>
        </Card.Body>
      </Card>
    </div>
  )
}

export default GuideLines;