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
import Table from 'react-bootstrap/Table';
import endereco from '../../back-end/endereco';
import BotaoVoltar from '../botoes/botao-voltar';
import Maquina from './maquina';
import LoginSingUp from '../login-singup';
class ListaMaquinas extends React.Component {
    constructor(props) {
        super(props);
        const vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        this.state = { rasps: [], variaveis: vars, isFiltered: false, listaFiltrada: [], Form: {}, NovaRasp: {}, maquinas: [], mode: 'DEC' };
        this.onChangeNovaRasp = this.onChangeNovaRasp.bind(this);
        this.atualizaBusca = this.atualizaBusca.bind(this);
        this.atualizaBuscaTLT = this.atualizaBuscaTLT.bind(this);
        this.adicionarMaquina = this.adicionarMaquina.bind(this);
        this.handleModalOrdenaShow = this.handleModalOrdenaShow.bind(this);
        this.handleModalOrdenaClose = this.handleModalOrdenaClose.bind(this);
        this.handleModalFiltroShow = this.handleModalFiltroShow.bind(this);
        this.handleModalFiltroClose = this.handleModalFiltroClose.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    //============================== BUTTON-MODALS ACTIONS =============================//
    componentDidMount() {
        //============================== BUSCANDO MAQUINAS ====================================//
        var url_string = window.location.href;
        var url = new URL(url_string);
        var cliente = url.searchParams.get("cliente");
        this.setState({ clientePai: cliente });
        fetch('http://' + endereco + ':8080/maquinas')
            .then(result => result.json())
            .then(data => {
                if (cliente) {
                    /* eslint-disable */
                    const maquinasCliente = data.filter(function (value, i) {
                        if (value.isEnabled && value.isEnabled === true && value.cliente === cliente) {
                            return value;
                        }
                    })
                    this.setState({ maquinas: maquinasCliente })
                } else {
                    this.setState({ maquinas: data });
                }
            }
                //  const maquinasAtivas = data.filter(function(value,i){
                //     if(data[i].isEnabled && data[i].isEnabled === true){
                //         return value;
                //     }
                // })
            );

    }


    //============================== FILTRANDO MAQUINAS ====================================//
    onSubmit(event) {
        event.preventDefault();
    }
    handleModalOrdenaShow() {
        this.setState({ showOrdena: true });
        var maquinasOrdenadas = '';
        if (this.state.mode === 'DEC') {
            maquinasOrdenadas = this.state.maquinas.sort((a, b) => {
                this.setState({ mode: 'ASC' });
                return b.nomeMaq - a.nomeMaq;
            });
        } else {
            maquinasOrdenadas = this.state.maquinas.sort((a, b) => {
                this.setState({ mode: 'DEC' });
                return a.nomeMaq - b.nomeMaq;
            });
        }
        this.setState({ isOrdenada: true, maquina: maquinasOrdenadas })
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
    /* eslint-disable */
    atualizaBusca(event) {
        const maquinas = this.state.maquinas;
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
            const temp = this.state.maquinas.filter(function (value, i) {
                var str = value.nomeMaq;
                var regex = RegExp('\^' + pesquisa);
                if (regex.test(str) === true) {
                    return value;
                }
            })
            this.setState({ listaFiltrada: temp });
        } else {
            this.setState({
                listaFiltrada: maquinas
            });
        }
    }
    atualizaBuscaTLT(event) {
        const maquinas = this.state.maquinas;
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
            const temp = this.state.maquinas.filter(function (value, i) {
                var str = value.tlt;
                var regex = RegExp('\^' + pesquisa);
                var regex2 = RegExp('^TLT' + pesquisa)
                if (regex.test(str) === true || regex2.test(str) === true) {
                    return value;
                }
            })
            this.setState({ listaFiltrada: temp });
        } else {
            this.setState({
                listaFiltrada: maquinas
            });
        }
    }
    //============================== ADICIONANDO RASP ====================================//
    onChangeNovaRasp(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = 'NovaMaquina' + target.name;
        this.setState({
            [name]: value
        });
    }
    adicionarMaquina() {
        if (
            // this.state.NovaMaquinaQrCode !== undefined &&
            this.state.NovaMaquinaresourceID !== undefined &&
            document.getElementById('Cliente').value !== undefined &&
            this.state.NovaMaquinaTlt !== undefined &&
            this.state.NovaMaquinaNomeMaq !== undefined 
            // &&
            // this.state.NovaMaquinaVerSyneco !== undefined &&
            // this.state.NovaMaquinaVerMongo !== undefined &&
            // this.state.NovaMaquinaVerIntegrator !== undefined &&
            // this.state.NovaMaquinaDktp !== undefined &&
            // this.state.NovaMaquinaIdRemote !== undefined &&
            // this.state.NovaMaquinaPassRemote !== undefined
        ) {
            const novaMaq = {
                // QrCode: this.state.NovaMaquinaQrCode,
                Cliente: document.getElementById('Cliente').value,
                Tlt: this.state.NovaMaquinaTlt,
                NomeMaq: this.state.NovaMaquinaNomeMaq,
                VerSyneco: this.state.NovaMaquinaVerSyneco,
                VerMongo: this.state.NovaMaquinaVerMongo,
                VerIntegrator: this.state.NovaMaquinaVerIntegrator,
                IpFixo: this.state.NovaMaquinaIpFixo,
                verSisOperacional: document.getElementById('VerSO').value,
                arquitetura: document.getElementById('ArquiteturaSO').value,
                Obs: this.state.NovaMaquinaObs,
                nomeAR: document.getElementById('Dktp').value,
                _idAR: document.getElementById('IdRemote').value,
                senhaAR: document.getElementById('PassRemote').value,
                isEnabled: true,
                resourceID: this.state.NovaMaquinaresourceID
            }
            fetch('http://' + endereco + ':8080/newMaq', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify(novaMaq),
            })
        } else {
            alert('PREENCHA OS CAMPOS!!!');
        }
        setTimeout(() => {
            window.location.reload();
        }, 200)
    }
    render() {
        return (
            <div>
                {!sessionStorage.getItem('user') &&
                    <Fragment>
                        <LoginSingUp></LoginSingUp>
                    </Fragment>
                }
                {sessionStorage.getItem('user') &&
                    <Fragment>
                        <Cabecalho></Cabecalho>
                        <Container style={{ marginTop: '2%', marginBottom: '10%' }} float={'center'}>
                            {/* //============================== HEADER ====================================// */}
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <center><h1 style={{ color: 'white', fontWeight: 'bold' }}>Lista Máquinas</h1></center>
                                        <h4 style={{ color: 'white', marginLeft: '-15px' }} >{this.state.clientePai}</h4>
                                    </Col>
                                    {/* <center> */}
                                    {/* <Col xs={6} sm={3} md={4} lg={2}> */}
                                    {/* <Badge color="info" style={{ height: 'auto', width: 'auto', backgroundColor: '#7CB7D4', paddingTop: '5px', marginRight: '-15px' }}> */}
                                    {/* </Badge> */}
                                    {/* <br></br><br></br> */}
                                    {/* </Col> */}
                                    {/* </center> */}
                                    <hr style={{ backgroundColor: 'white', height: '3px' }}></hr>
                                </Col>
                                {/* //============================== ADICIONAR RASP ====================================// */}

                                <Col style={{ marginBottom: '-30px' }}>
                                    <Accordion defaultActiveKey="1">
                                        <Card style={{ backgroundColor: 'transparent' }}>
                                            <Accordion.Toggle as={Card.Header} eventKey="5" className={'mostrarCursor'} style={{ backgroundColor: '#86CE85', color: 'white' }}>
                                                <center>Adicionar Máquina&nbsp;
                                            <img heigth={'10px'} src={require('../../img/+.png')} className={'plusIcon'} alt={'Não foi possível carregar a imagem.'} />
                                                </center>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="5">
                                                <Card.Body style={{ backgroundColor: 'white' }} >
                                                    <Table striped bordered hover style={{ backgroundColor: 'white' }}>
                                                        <tbody>
                                                            <tr>
                                                                <td>ResourceID</td>
                                                                <td><Input type={'number'} id={'resourceID'} minLength={1} maxLength={20} name={'resourceID'} value={this.state.NovaMaquinaresourceID} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Máquina</td>
                                                                <td><Input type={'text'} id={'NomeMaq'} minLength={1} maxLength={20} name={'NomeMaq'} value={this.state.NovaMaquinaNomeMaq} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>TLT</td>
                                                                <td><Input type={'text'} id={'Tlt'} minLength={1} maxLength={20} name={'Tlt'} value={this.state.NovaMaquinaTlt} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr style={{display:'none'}}>
                                                                <td>QrCode</td>
                                                                <td><Input type={'text'} id={'QrCode'} minLength={1} maxLength={15} name={'QrCode'} value={this.state.NovaMaquinaQrCode} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Cliente</td>
                                                                <td><Input type={'text'} id={'Cliente'} minLength={1} maxLength={20} name={'Cliente'} defaultValue={this.state.clientePai} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Syneco</td>
                                                                <td><Input type={'text'} id={'VerSyneco'} minLength={1} maxLength={10} name={'VerSyneco'} value={this.state.NovaMaquinaVerSyneco} onChange={this.onChangeNovaRasp}></Input></td>

                                                            </tr>
                                                            <tr>
                                                                <td>Mongo</td>
                                                                <td><Input type={'text'} id={'VerMongo'} minLength={1} maxLength={20} name={'VerMongo'} value={this.state.NovaMaquinaVerMongo} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Integrator</td>
                                                                <td><Input type={'text'} id={'VerIntegrator'} minLength={1} maxLength={20} name={'VerIntegrator'} value={this.state.NovaMaquinaVerIntegrator} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>IP</td>
                                                                <td><Input type={'text'} id={'IpFixo'} minLength={1} maxLength={20} name={'IpFixo'} value={this.state.NovaMaquinaIpFixo} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Sistema Operacional</td>
                                                                <td><Input type={'text'} id={'VerSO'} minLength={1} maxLength={20} name={'VerSO'} value={this.state.NovaMaquinaVerSO} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Arquitetura SO</td>
                                                                <td><Input type={'text'} id={'ArquiteturaSO'} minLength={1} maxLength={20} name={'ArquiteturaSO'} value={this.state.NovaMaquinaArquiteturaSO} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>DKTP</td>
                                                                <td><Input type={'text'} id={'Dktp'} minLength={1} maxLength={20} name={'Dktp'} value={this.state.NovaMaquinaDktp} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>ID Acesso Remoto</td>
                                                                <td><Input type={'text'} id={'IdRemote'} minLength={1} maxLength={20} name={'IdRemote'} value={this.state.NovaMaquinaIdRemote} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Senha Acesso Remoto</td>
                                                                <td><Input type={'text'} id={'PassRemote'} minLength={1} maxLength={20} name={'PassRemote'} value={this.state.NovaMaquinaPassRemote} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Observação</td>
                                                                <td><Input type={'text'} id={'Obs'} minLength={1} maxLength={20} name={'Obs'} value={this.state.NovaMaquinaObs} onChange={this.onChangeNovaRasp}></Input></td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan='2'><Button className={'btn-functions'} variant={'success'} style={{ width: '100%', backgroundColor: '#86CE85' }} onClick={this.adicionarMaquina}>Adicionar</Button></td>
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
                                <Col xs={8} sm={3} md={3} lg={3} style={{ marginTop: '15px' }}>
                                    <Form onSubmit={this.onSubmit}>
                                        <FormGroup>
                                            <Input maxLength={10} className={'campoPesquisa'} type="text" name="eth" id="pesquisa" placeholder="Pesquisar por Nome" style={{ backgroundColor: 'white' }} onChange={this.atualizaBusca} />
                                        </FormGroup>
                                    </Form>
                                </Col>
                                <Col xs={9} sm={3} md={3} lg={3} style={{ marginTop: '15px' }}>
                                    <Form onSubmit={this.onSubmit}>
                                        <FormGroup>
                                            <Input maxLength={10} className={'campoPesquisa'} type="text" name="eth" id="pesquisa" placeholder="Pesquisar por TLT" style={{ backgroundColor: 'white' }} onChange={this.atualizaBuscaTLT} />
                                        </FormGroup>
                                    </Form>
                                </Col>
                                {/* //============================== BOTÃO ORDENAR ==========================================// */}
                                <Col xs={3} sm={3} md={3} lg={3}>
                                    <Button variant={'primary'} className={'btn-functions'} style={{ width: '100%', height: '45px', marginTop: '15px', backgroundColor: '#7CB7D4',border:'none'}} onClick={this.handleModalOrdenaShow}>
                                        <b>ORDENAR</b>&nbsp;
                                    <img src={require('../../img/order-white.png')} style={{ transform: this.state.mode === 'DEC' ? 'rotate(180deg)' : 'rotate(360deg)' }}></img>
                                        {/* {this.state.mode} */}
                                    </Button>                            </Col>
                                {/* //============================== LISTA RASPS ============================================// */}
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    {this.state.isFiltered === true &&
                                        <Fragment>
                                            <Maquina maquinas={this.state.listaFiltrada} />
                                        </Fragment>
                                    }
                                    {this.state.isFiltered === false &&
                                        <Fragment>
                                            <Maquina maquinas={this.state.maquinas} />
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

export default ListaMaquinas;