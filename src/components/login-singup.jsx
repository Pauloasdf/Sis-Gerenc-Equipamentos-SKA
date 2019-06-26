import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const divStyle = {
    margin: '40px',
    border: '5px solid pink'
  };


class LoginSingUp extends React.Component{
    render(){
        return(
            <div className="overlay" style={divStyle}>
                    <Container>
                        <Row>
                            <Col sm={{ size: 6, order: 2, offset: 1 }}> a</Col>
                            <Col xs="3" sm="3" lg="3" md="3"> a</Col>
                            <Col xs="3" sm="3" lg="3" md="3"> a</Col>
                        </Row>
                    </Container>
            </div>


        );
    }
}

export default LoginSingUp;