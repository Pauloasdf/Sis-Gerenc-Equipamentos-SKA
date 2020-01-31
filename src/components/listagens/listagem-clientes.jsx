import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cabecalho from '../cabecalho';
import Form from 'react-bootstrap/Form'
import { Input, FormGroup } from 'reactstrap';
import endereco from '../../back-end/endereco';
import BotaoVoltar from '../botoes/botao-voltar';
import Button from 'react-bootstrap/Button';
import Cliente from './cliente';
import LoginSingUp from '../login-singup';

class ListaClientes extends React.Component {
    constructor(props) {
        super(props);
        const vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        this.state = { clientes: [], variaveis: vars, isFiltered: false, listaFiltrada: [], mode: 'DEC' };
        this.atualizaBusca = this.atualizaBusca.bind(this);
        this.handleOrdenaShow = this.handleOrdenaShow.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        //============================== BUSCANDO CLIENTES ====================================//
        fetch('http://' + endereco + ':8080/listaClientes')
            .then(result => result.json())
            .then(data => {
                this.setState({ clientes: data });
            });
    }
    //============================== FILTRANDO MAQUINAS ====================================//
    handleOrdenaShow() {
        this.setState({ showOrdena: true });
        var clientesOrdenados = '';
        if (this.state.mode === 'DEC') {
            clientesOrdenados = this.state.clientes.sort((a, b) => {
                this.setState({ mode: 'ASC' });
                return ('' + b).localeCompare(a);
            });
        } else {
            clientesOrdenados = this.state.clientes.sort((a, b) => {
                this.setState({ mode: 'DEC' });
                return ('' + a).localeCompare(b);
            });
        }
        this.setState({ isOrdenada: true, clientes: clientesOrdenados })
    }
    handleModalOrdenaClose() {
        this.setState({ showOrdena: false })
    }

    onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = 'Form.' + target.name;
        this.setState({
            [name]: value
        });
    }
    /* eslint-disable */
    atualizaBusca(event) {
        const clientes = this.state.clientes;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        if (value !== '') {
            this.setState({ isFiltered: true });
            const pesquisa = value;
            if (event.value === '') {
                this.setState({
                    listaFiltrada: maquinas
                })
            }
            const temp = this.state.clientes.filter(function (value, i) {
                var str = value;
                var strLC = str.toLowerCase();
                var regex = new RegExp(pesquisa);
                if (regex.test(str) === true || regex.test(strLC)) {
                    return value;
                }
            })
            this.setState({ listaFiltrada: temp });
        } else {
            this.setState({
                listaFiltrada: clientes
            });
        }
    }
    render() {
        return (
            <div>
                {!sessionStorage.getItem('user') &&
                    <LoginSingUp></LoginSingUp>
                }
                {sessionStorage.getItem('user') &&
                    <Fragment>
                        <Cabecalho></Cabecalho>
                        <>
                            <Container style={{ marginTop: '2%', marginBottom: '10%' }} float={'center'}>
                                {/* //============================== HEADER ====================================// */}
                                <Row className="justify-content-xs-center">
                                    <Col xs={12} sm={12} md={12} lg={12} >
                                        <center><h1 style={{ color: 'white', fontWeight: 'bold' }}>Clientes</h1></center>
                                        <hr style={{ backgroundColor: 'white', height: '3px' }}></hr>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3} style={{ marginTop: '15px', marginBottom: '15px', marginRight: '-15px' }}><BotaoVoltar></BotaoVoltar></Col>
                                    {/* //============================== BARRA DE PESQUISA ======================================// */}
                                    <Col xs={5} sm={6} md={6} lg={6} style={{ marginTop: '15px' }}>
                                        <Form onSubmit={this.onSubmit}>
                                            <FormGroup>
                                                <Input maxLength={10} type="text" name="eth" id="pesquisa" placeholder="Pesquisar Cliente" style={{ backgroundColor: 'white', paddingLeft: '15px' }} onChange={this.atualizaBusca} />
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                    {/* //============================== BOTÃO ORDENAR ==========================================// */}
                                    <Col xs={4} sm={3} md={3} lg={3}>
                                        <Button variant={'primary'} className={'btn-functions'} style={{ width: '100%', height: '45px', marginTop: '15px', backgroundColor: '#7CB7D4',border:'none' }} onClick={() => this.handleOrdenaShow()}>
                                            <b>ORDENAR</b>&nbsp;
                                    <img src={require('../../img/order-white.png')} style={{ transform: this.state.mode === 'DEC' ? 'rotate(180deg)' : 'rotate(360deg)' }}></img>
                                            {/* {this.state.mode} */}
                                        </Button>
                                    </Col>
                                    {/* //============================== BOTÃO FILTRAR ==========================================// */}
                                    {/* //============================== LISTA RASPS ============================================// */}
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        {this.state.isFiltered === true &&
                                            <Fragment>
                                                <Cliente cliente={this.state.listaFiltrada} />
                                            </Fragment>
                                        }
                                        {this.state.isFiltered === false &&
                                            <Fragment>
                                                <Cliente cliente={this.state.clientes} />
                                            </Fragment>
                                        }

                                    </Col>
                                </Row>
                            </Container>
                        </>
                    </Fragment>
                }
            </div >
        );

    }
}

export default ListaClientes;