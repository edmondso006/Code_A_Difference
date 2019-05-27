import React, { Component } from 'react';
import { Jumbotron, Button, Card, Container, Row, Col} from 'react-bootstrap';
import { Link }  from 'react-router-dom';
import CodingImage from './../Images/undraw_coding_6mjf.svg';
import NonProfitImage from './../Images/undraw_collab_8oes.svg';
import TeamImage from './../Images/undraw_creative_team_r90h.svg';
class Home extends Component {

    constructor(props){
      super(props);
    }

    render(){
        return (
            <div>
              <Jumbotron  className="bg-light" style={{marginBottom: '0px'}}>
                <Container>
                  <img src={TeamImage} alt='team' style={{height: '50%', width: '50%', display: 'block', margin: 'auto'}} />

                  <h1>Make A Difference!</h1>

                  <p style={{marginTop: '2%'}}>
                    Utilizing the power of developers looking to perfect their craft, CodeADifference is empowering
                    local organizations to better serve their community through new applications and websites. New developers
                    gain skills and insights that will give them a competitive advantage in the industry. Organizations are
                    able to save money, and spend it really matters, in the community. Come and help us make the world
                    a better place for everyone!
                  </p>
                  <Button variant="outline-dark"><Link to='/projects' style={{textDecoration: 'none', color: 'inherit'}}>View Projects!</Link></Button>
                </Container>
              </Jumbotron>

            
              <Row>
                  <Col sm={6} className="bg-dark text-white text-center overflow-hidden">
                    <div className="my-3 py-3" style={{marginRight: '1rem', marginLeft: '1rem'}}>
                      <h4 className="display-5">For Devs</h4>
                      <p className="lead">Build something that matters!</p>
                      <img src={CodingImage} alt="coder" style={{height: '15rem', width: '15rem'}}></img>

                      <p>Are you looking for a meaningful project that will benefit a local non-profile? Are you looking
                      for things to put on your personal portfolio to impress potential employers? Take a look at these
                      real projects that local profits need help with and offer your services in exchange for learning & experience!
                      </p>

                      <Button variant="outline-light"><Link to='/projects' style={{textDecoration: 'none', color: 'inherit'}}>View Projects!</Link></Button>

                    </div>
                  </Col>

                  <Col sm={6} className="bg-light text-center overflow-hidden">
                    <div className="my-3 py-3" style={{marginRight: '1rem', marginLeft: '1rem'}}>
                      <h4 className="display-5">For Non-Profits</h4>
                      <p className="lead">Help developers grow!</p>
                      <img src={NonProfitImage} alt="non-profit" style={{height: '15rem', width: '15rem'}}></img>

                      <p>Do you need a new simple website, web app, or mobile app? Allow up and coming developers to build it for you free of charge! 
                        This not only helps your organization but also the developers who are trying to break into the industry or are trying
                        to use their skills to make a positive impact!
                      </p>
                      <Button variant="outline-dark"><Link to='/signup' style={{textDecoration: 'none', color: 'inherit'}}>Create Account</Link></Button>

                    </div>
                  </Col>
                </Row>
            
            </div>
        )
    }
}

export default Home;