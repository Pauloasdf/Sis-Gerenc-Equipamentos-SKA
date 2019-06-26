import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// const divStyle = {
//     margin: '40px',
//     border: '5px solid pink'
//   };

function login() {
    document.location.href = 'http://localhost:3000/login';
}
function singup() {
    document.location.href = 'http://localhost:3000/singup';
}

class LoginSingUp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var cor = this.props.cor;
        return (
            <div>
                {/* <div className="overlay" style={divStyle}><Navbar></Navbar></div> */}

                <>
                    <Container style={{ marginTop: this.props.marginTopContainer,height: window.innerHeight-100}}>
                        <Row className="justify-content-xs-center" style={{ height: '90%'}}>
                            <Col xs={2} sm={2} className="Auxiliar"></Col>
                            <Col xs={8} sm={8} md={5} lg={5} style={{ backgroundColor: 'none'}}>
                                <Button className="btn-success" onClick={login} style={{ height: '100%',width:'100%',borderRadius: '10%' }}>
                                    <h1> Já possuo um login </h1>
                                </Button>
                            </Col>
                            <Col xs={12} sm={12} md={2} lg={2} ></Col>
                            <Col xs={2} sm={2} className="Auxiliar"></Col>
                            <Col xs={8} sm={8} md={5} lg={5} style={{backgroundColor: 'none'}}>
                                <Button onClick={singup} style={{height: '100%',width:'100%',borderRadius: '10%' }}>
                                    <h1> Quero me Cadastrar </h1>
                                </Button>
                            </Col>
                            
                            
                        </Row>
                    </Container>
                </>

            </div>

        );
    }
}

export default LoginSingUp;