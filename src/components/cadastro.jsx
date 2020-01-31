import React from 'react';
// import Cabecalho from '../components/navbar';
// import Footer from '../components/footer';
import { Form, Button } from 'react-bootstrap';
import endereco from '../back-end/endereco';

class Cadastro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            password: '',
            itExists: false
        };
        this.baseState = this.state;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit() {
        const novoUsuario = {
            usuario: document.getElementById('userCadastro').value,
            password: document.getElementById('passCadastro').value,
        };

        this.props.users.map((value, index) => {
            if (novoUsuario.usuario === value.usuario) {
                this.setState({ itExists: true })
            }
        })

        setTimeout(()=>{
            if (this.state.itExists === false) {
                if (novoUsuario.usuario.length >= 8 && novoUsuario.password.length >= 8) {
                    fetch('http://'+endereco+':8080/newUser', {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        credentials: "same-origin",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        redirect: "follow",
                        referrer: "no-referrer",
                        body: JSON.stringify(novoUsuario),
                    })
                    sessionStorage.setItem("user", novoUsuario.usuario);
                    setTimeout(function () {
                        window.location.reload();
                    }, 10)
                } else {
                    if (novoUsuario.usuario.length < 8 && novoUsuario.password.length < 8) {
                        this.setState({ isUserInvalid: true });
                        this.setState({ isPassInvalid: true });
                    } else if (novoUsuario.usuario.length < 8) {
                        this.setState({ isUserInvalid: true });
                    } else {
                        this.setState({ isPassInvalid: true });
                    }
                }
            } else {
                alert('Usuário já existente!');
                document.getElementById('userCadastro').value = '';
                document.getElementById('passCadastro').value = '';
                document.getElementById('userLogin').value = '';
                document.getElementById('passLogin').value = '';
            }
        },1000)
    }

handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const loginUsuario = target.name;
    this.setState({
        [loginUsuario]: value,
        itExists: false
    })
}

render() {
    return (
        <>
            {/* eslint-disable */}
            < Form >
                <Form.Group >
                    <Form.Label></Form.Label>
                    <Form.Control type="text" className={'caixatexto'} placeholder="Insira seu Usuário" maxLength={24} minLength={8} name={'usuario'} id={'userCadastro'} required onChange={this.handleInputChange} />
                    {!this.state.isUserInvalid &&
                        <center><Form.Label>Quantidade de caracteres: <b>8-24.</b></Form.Label></center>
                    }
                    {this.state.isUserInvalid &&
                        <center><Form.Label style={{ color: 'red' }}><h4>Insira pelo menos 8 caracteres.</h4></Form.Label></center>
                    }
                </Form.Group>
                <Form.Group >
                    <Form.Control type="password" className={'caixatexto'} placeholder="Insira sua Senha" maxLength={24} minLength={8} name={'password'} id={'passCadastro'} required onChange={this.handleInputChange} />
                    {!this.state.isPassInvalid &&
                        <center><Form.Label>Quantidade de caracteres: <b>8-24.</b></Form.Label></center>
                    }
                    {this.state.isPassInvalid &&
                        <center><Form.Label style={{ color: 'red' }}><h4>Insira pelo menos 8 caracteres.</h4></Form.Label></center>
                    }
                    <Button variant="primary" type="button" onClick={this.handleSubmit} style={{ width: '100%', marginBottom: '10px', marginLeft: '5px', backgroundColor: '#7CB7D4', border: 'none', borderRadius: '3px 3px 3px 3px' }}>
                        Cadastrar e entrar
                        </Button>
                </Form.Group>
                <Form.Group>

                </Form.Group>
            </Form>
            {/* </Col>
                    </Row>
                </Container> */}




            {/* <Footer co={'#330000'}></Footer> */}
        </>
    )
}
}

export default Cadastro;