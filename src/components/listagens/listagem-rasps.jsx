import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cabecalho from '../cabecalho';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Input, FormGroup } from 'reactstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'
import endereco from '../../back-end/endereco';
import BotaoVoltar from '../botoes/botao-voltar';
import Rasp from './rasp';
import LoginSingUp from '../login-singup';

class ListaRasps extends React.Component {
    constructor(props) {
        super(props);
        const vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        this.state = { rasps: [], variaveis: vars, isFiltered: false, listaFiltrada: [], Form: {}, NovaRasp: {}, maquinaPai: {} };
        this.onChangeNovaRasp = this.onChangeNovaRasp.bind(this);
        this.atualizaBusca = this.atualizaBusca.bind(this);
        this.adicionarRasp = this.adicionarRasp.bind(this);
        this.handleModalOrdenaShow = this.handleModalOrdenaShow.bind(this);
        this.handleModalOrdenaClose = this.handleModalOrdenaClose.bind(this);
        this.handleModalFiltroShow = this.handleModalFiltroShow.bind(this);
        this.handleModalFiltroClose = this.handleModalFiltroClose.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    //============================== BUTTON-MODALS ACTIONS =============================//
    componentDidMount() {
        //============================== BUSCANDO RASPS ====================================//
        var url_string = window.location.href;
        var url = new URL(url_string);
        var maquina = url.searchParams.get("maquina");
        var cliente = url.searchParams.get("cliente");

        /* eslint-disable */
        fetch('http://' + endereco + ':8080/maquinas')
            .then(result => result.json())
            .then(data => {
                if (maquina && cliente) {
                    const maquinaPai = data.filter(function (value, i) {
                        if (value.nomeMaq && value.nomeMaq === maquina && value.cliente && value.cliente === cliente) {
                            return value;
                        }
                    })
                    this.setState({ clientePai: maquinaPai[0], codeMaq: maquina })
                    const maquinasDoCliente = data.filter((value, i) => {
                        if (value.isEnabled && value.isEnabled === true && value.cliente && value.cliente === this.state.clientePai.cliente) {
                            return value.nomeMaq;
                        }
                    })
                    this.setState({ maquinasDoCliente: maquinasDoCliente });
                    const maquinasDisponiveis = maquinasDoCliente.map((value, i) => {
                        if (i === 0) {
                            return (
                                <option defaultValue key={i}>{value.nomeMaq}</option>
                            )
                        } else {
                            return (
                                <option key={i}>{value.nomeMaq}</option>
                            )
                        }
                    })
                    this.setState({ maquinasDisponiveis: maquinasDisponiveis });
                }
            });

        /* eslint-disable */
        fetch('http://' + endereco + ':8080/rasps')
            .then(result => result.json())
            .then(data => {
                if (maquina && cliente) {
                    var regex = RegExp('\^' + maquina);
                    var regexCli = RegExp('\^' + cliente);
                    const raspsAtivas = data.filter(function (value, i) {
                        if (value.isEnabled && value.isEnabled === true &&
                            (value.code === maquina || regex.test(value.code) === true) && regexCli.test(value.cliente) === true) {
                            return value;
                        }
                    })
                    this.setState({ rasps: raspsAtivas })
                } else {
                    this.setState({ rasps: data });
                }
            });

    }
    //============================== FILTRANDO RASPS ====================================//
    // onSubmit(event) {
    //     event.preventDefault();
    // }

    handleModalOrdenaShow() {
        this.setState({ showOrdena: true });
        var raspsOrdenadas = '';
        if (this.state.mode === 'DEC') {
            raspsOrdenadas = this.state.rasps.sort((a, b) => {
                this.setState({ mode: 'ASC' });
                return ('' + b.eth).localeCompare(a.eth);
            });
        } else {
            raspsOrdenadas = this.state.rasps.sort((a, b) => {
                this.setState({ mode: 'DEC' });
                return ('' + a.eth).localeCompare(b.eth);
            });
        }
        this.setState({ isOrdenada: true, rasps: raspsOrdenadas })
    }
    handleModalOrdenaClose() {
        this.setState({ showOrdena: false })
    }
    handleModalFiltroShow() {
        this.setState({ showFiltro: true });
    }
    handleModalFiltroClose() {
        this.setState({ showFiltro: false })
    }

    onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = 'Form.' + target.name;
        this.setState({
            [name]: value
        });
    }
    atualizaBusca(event) {
        const rasps = this.state.rasps;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        if (value !== '') {
            this.setState({ isFiltered: true });
            const pesquisa = value;
            if (event.value === '') {
                this.setState({
                    listaFiltrada: rasps
                })
            }
            const temp = this.state.rasps.filter(function (value) {
                const str = value.eth;
                var regex = RegExp(pesquisa);
                var regex2 = RegExp('^eth' + pesquisa + '$')
                if (regex.test(str) === true || regex2.test(str) === true) {
                    return value;
                } return '';
            })
            this.setState({ listaFiltrada: temp });
        } else {
            this.setState({
                listaFiltrada: rasps
            });
        }
    }

    //============================== ADICIONANDO RASP ====================================//
    onChangeNovaRasp(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = 'NovaRasp' + target.name;
        this.setState({
            [name]: value
        });
    }
    adicionarRasp() {
        if (
            // document.getElementById('versao').value !== undefined &&
            this.state.NovaRaspip !== undefined &&
            // this.state.NovaRaspmac !== undefined &&
            this.state.NovaRaspeth !== undefined &&
            document.getElementById('code').value !== undefined
        ) {
            const novaRasp = {
                ipFixo: this.state.NovaRaspip,
                macEndereco: this.state.NovaRaspmac,
                versao: document.getElementById('versao').value,
                eth: this.state.NovaRaspeth,
                code: document.getElementById('code').value,
                obs: this.state.NovaRaspobs,
                cliente: this.state.variaveis.cliente,
                confIN1: document.getElementById('in1').value,
                confIN2: document.getElementById('in2').value,
                confOUT1: document.getElementById('out1').value,
                confOUT2: document.getElementById('out2').value,
                resourceID: this.state.rID,
                usuario: sessionStorage.getItem('user')
            }
            //OBTENDO RESOURCEID DA MÁQUINA SELECIONADA
            const rID = this.state.maquinasDoCliente.filter((value, i) => {
                if (value.nomeMaq === novaRasp.code) {
                    return value.resourceID;
                }
            })
            novaRasp.resourceID = rID[0].resourceID;
            // INSERT MONGO
            fetch('http://' + endereco + ':8080/newRasp', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify(novaRasp),
            })
        } else {
            alert('PREENCHA OS CAMPOS!!!');
        }
        setTimeout(() => {
            window.location.reload();
        }, 1)
    }
    render() {
        return (
            <div style={{ heigth: '100%' }}>
                {!sessionStorage.getItem('user') &&
                    <Fragment>
                        <LoginSingUp></LoginSingUp>
                    </Fragment>
                }
                {sessionStorage.getItem('user') &&
                    <Fragment>
                        <Cabecalho></Cabecalho>
                        <Container style={{ marginTop: '2%', marginBottom: '10%', heigth: '100%' }} float={'center'}>
                            {/* //============================== HEADER ====================================// */}
                            <Row style={{ heigth: '100%' }}>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <center><h1 style={{ color: 'white', fontWeight: 'bold' }}>Lista Raspberries</h1></center>
                                    </Col>
                                    <Row>
                                        <Col xs={6} sm={6} md={6} lg={6}>
                                            {/* <center> */}
                                            {/* <Badge color="info" style={{ height: 'auto', width: 'auto', backgroundColor: '#7CB7D4', paddingTop: '5px', width: 'auto', marginRight: '-14px' }}> */}
                                            <h4 style={{ color: 'white' }} >{this.state.variaveis.cliente} - Máquina: {this.state.variaveis.maquina}</h4>
                                            {/* <h4 style={{ color: 'white' }} ></h4> */}

                                            {/* </Badge> */}
                                            {/* </center> */}
                                        </Col>
                                        {/* <Col xs={6} sm={'auto'} md={'auto'} lg={'auto'}> */}
                                        {/* <Badge color="info" style={{ height: 'auto', width: 'auto', backgroundColor: '#FF6869', paddingTop: '5px', width: 'auto', marginRight: '-15px', marginLeft: '-14px' }}> */}
                                        {/* </Badge> */}
                                        {/* </Col> */}
                                    </Row>
                                    <hr style={{ backgroundColor: 'white', height: '3px' }}></hr>

                                </Col>
                                {/* //============================== ADICIONAR RASP ====================================// */}

                                <Col style={{ marginBottom: '-30px' }}>
                                    <Accordion defaultActiveKey="1">
                                        <Card style={{ backgroundColor: 'transparent' }}>
                                            <Accordion.Toggle as={Card.Header} eventKey="5" style={{ backgroundColor: '#86CE85', color: 'white' }}>
                                                <center>Adicionar Rasp&nbsp;
                                            <img heigth={'10px'} src={require('../../img/+.png')} className={'plusIcon'} alt={'Não foi possível carregar a imagem.'} />
                                                </center>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="5">
                                                <Card.Body style={{ backgroundColor: 'white' }} >
                                                    <Table striped bordered hover style={{ backgroundColor: 'white' }}>
                                                        <tbody>
                                                            <tr>
                                                                <td>IP</td>
                                                                <td><Input type={'text'} id={'ip'} minLength={1} maxLength={15} name={'ip'} value={this.state.NovaRaspip} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>ETH</td>
                                                                <td>
                                                                    <Input type={'text'} id={'eth'} minLength={1} maxLength={6} name={'eth'} value={this.state.NovaRaspeth} onChange={this.onChangeNovaRasp}></Input>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>MAC</td>
                                                                <td><Input type={'text'} id={'mac'} minLength={1} maxLength={20} name={'mac'} value={this.state.NovaRaspmac} onChange={this.onChangeNovaRasp}></Input></td>

                                                            </tr>
                                                            <tr>
                                                                <td>Versão</td>
                                                                <td>
                                                                    <Input type={'text'} id={'versao'} minLength={1} maxLength={30} name={'versao'} value={this.state.NovaRaspversao} onChange={this.onChangeNovaRasp}></Input>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>CÓDIGO</td>
                                                                <td><Input type={'select'} id={'code'} minLength={1} maxLength={20} name={'code'} defaultValue={this.state.variaveis.maquina} onChange={this.onChangeNovaRasp}>
                                                                    {this.state.maquinasDisponiveis}
                                                                </Input></td>
                                                            </tr>
                                                            {/* <tr>
                                                        <td>ResourceID</td>
                                                        <td><Input type={'text'} id={'id'} minLength={1} maxLength={10} name={'id'} value={this.state.NovaRaspid} onChange={this.onChangeNovaRasp}></Input></td>
                                                    </tr> */}
                                                            <tr>
                                                                <td>ENTRADA 1</td>
                                                                <td><Input type={'text'} id={'in1'} minLength={1} maxLength={50} name={'in1'} value={this.state.NovaRaspconfIN1} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>ENTRADA 2</td>
                                                                <td><Input type={'text'} id={'in2'} minLength={1} maxLength={50} name={'in2'} value={this.state.NovaRaspconfIN2} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>SAÍDA 1</td>
                                                                <td><Input type={'text'} id={'out1'} minLength={1} maxLength={50} name={'out1'} value={this.state.NovaRaspconfOUT1} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>SAÍDA 2</td>
                                                                <td><Input type={'text'} id={'out2'} minLength={1} maxLength={50} name={'out2'} value={this.state.NovaRaspconfOUT2} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>OBSERVAÇÃO</td>
                                                                <td><Input type={'text'} id={'obs'} minLength={1} maxLength={20} name={'obs'} value={this.state.NovaRaspobs} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan='2'><Button variant={'success'} style={{ width: '100%' }} onClick={this.adicionarRasp}>Adicionar</Button></td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </Col>
                            </Row>
                            <Row className="justify-content-xs-center" style={{ heigth: '100%' }}>
                                {/* //============================== BARRA DE PESQUISA ======================================// */}
                                <Col xs={3} sm={3} md={3} lg={3} style={{ marginTop: '15px', marginBottom: '15px' }}><BotaoVoltar></BotaoVoltar></Col>

                                <Col xs={6} sm={6} md={6} lg={6} style={{ marginTop: '15px', marginLeft: '-15px', marginRight: '15px' }}>
                                    <Form onSubmit={this.onSubmit}>
                                        <FormGroup>
                                            <Input maxLength={10} type="text" className={'campoPesquisa'} name="eth" id="pesquisa" placeholder="Pesquisar por ETH" style={{ backgroundColor: 'white' }} onChange={this.atualizaBusca} />
                                        </FormGroup>
                                    </Form>
                                </Col>
                                {/* //============================== BOTÃO ORDENAR ==========================================// */}
                                <Col xs={3} sm={3} md={3} lg={3}>
                                    <Button variant={'primary'} className={'btn-functions'} style={{ width: '100%', height: '45px', marginTop: '15px', backgroundColor: '#7CB7D4',border:'none' }} onClick={this.handleModalOrdenaShow}>
                                        <b>ORDENAR</b>&nbsp;
                                    <img src={require('../../img/order-white.png')} style={{ transform: this.state.mode === 'DEC' ? 'rotate(180deg)' : 'rotate(360deg)' }}></img>
                                        {/* {this.state.mode} */}
                                    </Button>
                                </Col>
                                {/* //============================== LISTA RASPS ============================================// */}
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    {this.state.isFiltered === true &&
                                        <Fragment>
                                            <Rasp rasps={this.state.listaFiltrada} />
                                        </Fragment>
                                    }
                                    {this.state.isFiltered === false &&
                                        <Fragment>
                                            <Rasp rasps={this.state.rasps} />
                                        </Fragment>
                                    }

                                </Col>
                            </Row>
                        </Container>
                    </Fragment>
                }
            </div >
        );

    }
}

export default ListaRasps;