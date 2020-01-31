import React, { Fragment } from 'react';
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Login from '../components/login';
import Cadastro from '../components/cadastro';
import Home from './home';
import Cabecalho from './cabecalho';
import endereco from '../back-end/endereco';
// const divStyle = {
//     margin: '40px',
//     border: '5px solid pink'
//   };

class LoginSingUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: ''
        };
        this.obterTamanho = this.obterTamanho.bind(this);
    }
    componentDidMount(){
        fetch('http://' + endereco + ':8080/users')
        .then(result => result.json())
        .then(data => this.setState({users:data})); 
    }
   
    obterTamanho() {
        if (window.innerHeight > 650) {
            return "'" + window.innerHeight + "px'";
        } else {
            return 'auto';
        }
    }

    render() {    
        return (
            <>
                {!sessionStorage.getItem('user') &&
                    <Fragment>
                        <div style={{ height: window.innerHeight - 70 }}>
                            <Cabecalho></Cabecalho>
                            <Container className={'container-body'} float={'center'} style={{marginTop:'75px'}}>
                                <Row className="justify-content-xs-center" style={{ height: '100%'}}>
                                    <Col xs={2} sm={2} md={3} className="Auxiliar"></Col>
                                    <Col className={'login-cadastro'} xs={12} sm={12} md={6} lg={5} style={{ backgroundColor: '#00729A', height: '100%', paddingRight: '25px',marginLeft:'auto',marginRight:'auto',borderRadius:'7px 7px 7px 7px'}}>
                                        <center><h1 style={{ color: 'white',marginTop:'15px' }}>Já possuo um login</h1></center>
                                        <Login users={this.state.users}></Login>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={1}><br></br></Col>
                                    <Col xs={2} sm={2} md={3} className="Auxiliar"></Col>
                                    <Col className={'login-cadastro'} xs={12} sm={12} md={6} lg={5} style={{ backgroundColor: '#00729A', height: '100%', paddingRight: '25px',marginLeft:'auto',marginRight:'auto',borderRadius:'7px 7px 7px 7px'}}>
                                        <center><h1 style={{ color: 'white',marginTop:'15px' }}>Quero me cadastrar</h1></center>
                                        <Cadastro users={this.state.users}></Cadastro>
                                    </Col>


                                </Row>
                            </Container>
                        </div>
                    </Fragment>
                }
                {sessionStorage.getItem('user') &&
                    <Fragment>
                        <Home></Home>
                    </Fragment>
                }

            </>

        );
    }
}

export default LoginSingUp;