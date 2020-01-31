import React from 'react';
// import Cabecalho from '../components/navbar';
// import Footer from '../components/footer';
import endereco from '../back-end/endereco'
import md5 from 'md5';

import { Form, Button } from 'react-bootstrap';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            password: ''
        };
        this.baseState = this.state;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleSubmit() {


        const login = {
            usuario: document.getElementById('userLogin').value,
            password: document.getElementById('passLogin').value
        }
        var controler = 0;
        this.props.users.map((value, index) => {
            if (login.usuario === value.usuario && md5(login.password) === value.senha) {
                controler = 4;
                sessionStorage.setItem("user", login.usuario);
                sessionStorage.setItem("id", value._id);
                console.log('loggin in......');
                setTimeout(function () {
                    document.location.href = 'http://' + endereco + ':3000/home';
                }, 1000)
            }else if(login.usuario === value.usuario && md5(login.password)!==value.senha){
                controler= 1;
            }
        })
        switch(controler){
            case 1:
                    alert('Senha Incorreta');
                    break;
            case 0:
                    alert('Usuário Incorreto');
                    break;
            default:
                    window.location.reload();
        }
    }





    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const loginUsuario = target.name;
        this.setState({
            [loginUsuario]: value
        })
    }

    render() {
        return (
            <>
                <Form >
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control type="text" className={'caixatexto'} style={{ marginBottom: '50px' }} placeholder="Insira seu Usuário" maxLength={75} minLength={8} name={'usuario'} id={'userLogin'} required onChange={this.handleInputChange} value={this.state.usuario} />
                        {/* <Form.Label>Quantidade de caracteres: <b>8-24.</b></Form.Label> */}
                        <Form.Text className="text-muted">

                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="password" className={'caixatexto'} placeholder="Insira sua Senha" style={{ marginBottom: '35px' }} maxLength={24} minLength={8} name={'password'} id={'passLogin'} required onChange={this.handleInputChange} value={this.state.password} />
                        {/* <Form.Label>Quantidade de caracteres: <b>8-24.</b></Form.Label> */}
                    </Form.Group>

                    <center>
                        <Button variant="primary" type="button" onClick={this.handleSubmit} style={{ width: '100%', marginBottom: '25px', marginLeft: '5px', backgroundColor: '#86CE85', border: 'none', borderRadius: '3px 3px 3px 3px' }}>
                            Entrar
                        </Button>
                    </center>
                </Form>
            </>
        )
    }
}

export default Login;