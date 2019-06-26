import React from 'react';
import Cabecalho from '../components/navbar';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// const divStyle = {
//     margin: '40px',
//     border: '5px solid pink'
//   };

function login() {
    console.log('hey');
}


class LoginSingUp extends React.Component {
    render() {
        var tipoDisp = '';
        var marginTopContainer = '30px';
        const comprimentoTela = window.innerWidth;
        if (comprimentoTela < 571) {
            tipoDisp = 'smartphone';
        } else {
            tipoDisp = 'computer'
        }
        return (
            <div>
                <Cabecalho app={"SisGen"} tipoDisp={tipoDisp}></Cabecalho>
                {/* <div className="overlay" style={divStyle}><Navbar></Navbar></div> */}

                <>
                    <Container style={{ marginTop: marginTopContainer,height: window.innerHeight-100}}>
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
                                <Button onClick={login} style={{height: '100%',width:'100%',borderRadius: '10%' }}>
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