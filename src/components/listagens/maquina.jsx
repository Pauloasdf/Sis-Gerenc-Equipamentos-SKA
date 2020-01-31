import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import { Input } from 'reactstrap'
import endereco from '../../back-end/endereco'

class Maquina extends React.Component {
    constructor(props) {
        super(props);
        this.state = { raspsMaquina: [], listaAtualizadaExclusao: [], isEdit: false }

        // this.alterarRasp = this.alterarRasp.bind(this);
        this.desativarMaquina = this.desativarMaquina.bind(this);
        this.mostrarRasps = this.mostrarRasps.bind(this);
        this.alterarMaquina = this.alterarMaquina.bind(this);
    }
    mostrarRasps(nomeMaq, cliente) {
        var url = new URL('http://' + endereco + ':3000/rasps?maquina=1');
        var query_string = url.search;
        var search_params = new URLSearchParams(query_string);
        search_params.set('maquina', nomeMaq);
        search_params.set('cliente', cliente);
        url.search = search_params.toString();
        var new_url = url.toString();
        window.location.href = new_url;

    }
    alterarMaquina(valor) {
        const maquinaEditada = {
            idmaq_db: document.getElementById('idmaq_db' + valor).value,
            qrcode: document.getElementById('QRMaqEdit' + valor).value,
            cliente: document.getElementById('CliMaqEdit' + valor).value,
            tlt: document.getElementById('TltMaqEdit' + valor).value,
            nomemaq: document.getElementById('NomeMaqEdit' + valor).value,
            versyneco: document.getElementById('VerSynecoMaqEdit' + valor).value,
            vermongo: document.getElementById('VerMongoMaqEdit' + valor).value,
            verintegrator: document.getElementById('VerIntegratorMaqEdit' + valor).value,
            ipfixo: document.getElementById('IpMaqEdit' + valor).value,
            verso: document.getElementById('SOMaqEdit' + valor).value,
            arquiteturaso: document.getElementById('ArqMaqEdit' + valor).value,
            nome_dktp_remote: document.getElementById('DktpMaqEdit' + valor).value,
            id_remote: document.getElementById('IdRemoteMaqEdit' + valor).value,
            pass_remote: document.getElementById('PassRemoteMaqEdit' + valor).value,
            obs: document.getElementById('ObsMaqEdit' + valor).value,
            usuario: sessionStorage.getItem('user')
        }
        this.setState({ maquinaEditada: maquinaEditada });
        console.log('Atualizando Maquina: ' + maquinaEditada.nomemaq + ' .......');
        fetch('http://' + endereco + ':8080/alterarMaquina', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(maquinaEditada),
        })
        const novaLista = this.props.maquinas.filter((value, i) => {
            if (value._id === maquinaEditada.idmaq_db) {
                return maquinaEditada;
            } else {
                return value;
            }
        })
        this.setState({
            isEdit: true,
            novaLista: novaLista
        });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    desativarMaquina(nomeMaq,cliente) {
        if (window.confirm('Você realmente deseja excluir a Maquina ' + nomeMaq + '?')) {
            console.log('Desativando ' + nomeMaq + ' ........');
            const valor = { nomeMaq: nomeMaq, usuario:sessionStorage.getItem('user'),cliente:cliente};
            console.log(valor);
            fetch('http://' + endereco + ':8080/desativarMaquina', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify(valor),
            })
            /* eslint-disable */

            setTimeout(() => {
                const maquinas = this.props.maquinas.map((value, i) => {
                    if (value.nomeMaq === nomeMaq) {
                        return value.isEnabled = false;
                    }
                })
                const newList = this.props.maquinas.filter((value, i) => {
                    if (value.isEnabled === true) {
                        return value;
                    }
                })
                this.setState({
                    isRemovido: true,
                    listaAtualizadaExclusao: newList
                })
            }, 500)
        } else {
            console.log('Cancelando ação......');
        }
    }

    render() {


        const styleInput = { marginBottom: '-6px', marginTop: '-2px' };
        const styleTD = { backgroundColor: 'white' };
        var propsMaquinas = [];
        if (this.state.isRemovido === true) {
            propsMaquinas = this.state.listaAtualizadaExclusao;
        } else if (this.state.isEdit === true) {
            propsMaquinas = this.state.novaLista;
        } else {
            propsMaquinas = this.props.maquinas;
        }
        const maquina = propsMaquinas.map((value, i) => {
            return (
                <Row key={i} style={{ marginBottom: '-20px',marginRight:'-35px' }}>
                    <Col xs={9} sm={9} md={9} lg={9}>
                        <Accordion defaultActiveKey="1">
                            <Card>
                                <Row style={{ marginBottom: '-8px', marginTop: '-5px' }}>
                                    <Col xs={10} sm={10} md={11} lg={11} style={{ marginRight: '-15px' }}>
                                        <Accordion.Toggle className={'mostrarCursor'} as={Card.Header} variant="link" eventKey="0" style={{ backgroundColor: 'white' }}>
                                            <img heigth={'10px'} src={require('../../img/maquina.png')} className={'typeIcon'} alt={'Não foi possível carregar a imagem.'} /> &nbsp;	&nbsp;	<b>{value.nomeMaq}</b>
                                        </Accordion.Toggle>
                                    </Col>
                                    <Col xs={1} sm={1} md={1} lg={1} style={{ marginRight: '-10px' }}>
                                        <Accordion.Toggle as={Button} variant={'success'} className={'edit-button'} style={{ heigth: '3px', marginBottom: '-2px', backgroundColor: '#86CE85' }} eventKey="5">
                                            <img heigth={'5px'} src={require('../../img/edit-white.png')} className={'typeIcon'} alt={'Não foi possível carregar a imagem.'} />
                                        </Accordion.Toggle>
                                    </Col>
                                    {/* ===================================== TABELA FIXA DA RASP SELECIONADA ===================================== */}
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <Table striped bordered hover>
                                                    <tbody>
                                                        <tr style={{display:'none'}}>
                                                            <td>ID_DB</td>
                                                            <td>{value._id}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Máquina</td>
                                                            <td>{value.nomeMaq}</td>
                                                        </tr>
                                                        {/* <tr>
                                                            <td>resourceId</td>
                                                            <td>{value.resourceID}</td>
                                                        </tr> */}
                                                        <tr>
                                                            <td>TLT</td>
                                                            <td>{value.tlt}</td>
                                                        </tr>
                                                        <tr  style={{display:'none'}}>
                                                            <td>QR_code</td>
                                                            <td>{value.qrcode}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Cliente</td>
                                                            <td>{value.cliente}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Versão Syneco</td>
                                                            <td>{value.verSyneco}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Versão Mongo</td>
                                                            <td>{value.verMongo}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Versão Integrator</td>
                                                            <td>{value.verIntegrator}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Ip Fixo</td>
                                                            <td>{value.ipFixo}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Sistema Operacional</td>
                                                            <td>{value.verSO}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Arquitetura</td>
                                                            <td>{value.arquiteturaSO}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>DKTP</td>
                                                            <td>{value.nome_dktp_remote}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>ID Acesso Remoto</td>
                                                            <td>{value.id_remote}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Senha Acesso Remoto</td>
                                                            <td>{value.pass_remote}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>OBSERVAÇÃO</td>
                                                            <td>{value.obs}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>

                                            </Card.Body>
                                        </Accordion.Collapse>
                                        {/* ===================================== TABELA EDITÁVEL DA MAQUINA SELECIONADA ===================================== */}
                                        <Accordion.Collapse eventKey="5">
                                            <Card.Body>
                                                <Table striped bordered hover>
                                                    <tbody>
                                                        <tr style={{display:'none'}}> 
                                                            <td className={'LabelEditar'}>ID_DB</td>
                                                            <td>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'idmaq_db' + value._id}
                                                                    name={'idmaq_db' + value._id}
                                                                    style={styleInput}
                                                                    value={value._id}
                                                                    readOnly>
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td  className={'LabelEditar'}>Máquina</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'NomeMaqEdit' + value._id}
                                                                    maxLength={10}
                                                                    name={'NomeMaqEdit' + value._id}
                                                                    style={styleInput}
                                                                    defaultValue={value.nomeMaq}
                                                                >
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td  className={'LabelEditar'}>TLT</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'TltMaqEdit' + value._id}
                                                                    maxLength={10}
                                                                    name={'TltMaqEdit' + value._id}
                                                                    style={styleInput}
                                                                    defaultValue={value.tlt}
                                                                >
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td  className={'LabelEditar'}>QR_code</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'QRMaqEdit' + value._id}
                                                                    maxLength={30}
                                                                    name={'QRMaqEdit' + value._id}
                                                                    style={styleInput}
                                                                    defaultValue={value.qrcode}
                                                                >
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td  className={'LabelEditar'}>Cliente</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'CliMaqEdit' + value._id}
                                                                    maxLength={20}
                                                                    name={'CliMaqEdit' + value._id}
                                                                    style={styleInput}
                                                                    value={value.cliente}
                                                                    readOnly
                                                                >
                                                                </Input>
                                                            </td>
                                                        </tr>                                                       
                                                        <tr>
                                                            <td  className={'LabelEditar'}>Versão Syneco</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'VerSynecoMaqEdit' + value._id}
                                                                    maxLength={20}
                                                                    name={'VerSynecoMaqEdit' + value._id}
                                                                    style={styleInput}
                                                                    defaultValue={value.verSyneco}
                                                                >
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td  className={'LabelEditar'}>Versão Mongo</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'VerMongoMaqEdit' + value._id}
                                                                    maxLength={20}
                                                                    name={'VerMongoMaqEdit' + value._id}
                                                                    style={styleInput}
                                                                    defaultValue={value.verMongo}
                                                                >
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td  className={'LabelEditar'}>Versão Integrator</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'VerIntegratorMaqEdit' + value._id}
                                                                    maxLength={20}
                                                                    name={'VerIntegratorMaqEdit' + value._id}
                                                                    style={styleInput}
                                                                    defaultValue={value.verIntegrator}
                                                                >
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td  className={'LabelEditar'}>Ip Fixo</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'IpMaqEdit' + value._id}
                                                                    maxLength={20}
                                                                    name={'IpMaqEdit' + value._id}
                                                                    style={styleInput}
                                                                    defaultValue={value.ipFixo}
                                                                >
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td  className={'LabelEditar'}>Sistema Operacional</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'SOMaqEdit' + value._id}
                                                                    maxLength={20}
                                                                    name={'SOMaqEdit' + value._id}
                                                                    style={styleInput}
                                                                    defaultValue={value.verSO}
                                                                >
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td  className={'LabelEditar'}>Arquitetura</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'ArqMaqEdit' + value._id}
                                                                    maxLength={20}
                                                                    name={'ArqMaqEdit' + value._id}
                                                                    style={styleInput}
                                                                    defaultValue={value.arquiteturaSO}
                                                                >
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td  className={'LabelEditar'}>DKTP</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'DktpMaqEdit' + value._id}
                                                                    maxLength={20}
                                                                    name={'DktpMaqEdit' + value._id}
                                                                    style={styleInput}
                                                                    defaultValue={value.nome_dktp_remote}
                                                                >
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td  className={'LabelEditar'}>ID Acesso Remoto</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'IdRemoteMaqEdit' + value._id}
                                                                    maxLength={20}
                                                                    name={'IdRemoteMaqEdit' + value._id}
                                                                    style={styleInput}
                                                                    defaultValue={value.id_remote}
                                                                >
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td  className={'LabelEditar'}>Senha Acesso Remoto</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'PassRemoteMaqEdit' + value._id}
                                                                    maxLength={20}
                                                                    name={'PassRemoteMaqEdit' + value._id}
                                                                    style={styleInput}
                                                                    defaultValue={value.pass_remote}
                                                                >
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td  className={'LabelEditar'}>Observação</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'ObsMaqEdit' + value._id}
                                                                    maxLength={20}
                                                                    name={'ObsMaqEdit' + value._id}
                                                                    style={styleInput}
                                                                    defaultValue={value.obs}
                                                                >
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={2}>
                                                                <Button variant={'success'} onClick={() => this.alterarMaquina(value._id, i)} style={{ width: '100%' }}> SALVAR </Button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Col>
                                </Row>
                            </Card>
                        </Accordion>
                    </Col>
                    <Col xs={3} sm={3} md={3} lg={3} style={{ alignContent: 'right', marginTop: '8px',marginLeft:'-15px' }}>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <Button className={'botao-x-rasp'} variant={'danger'} onClick={() => this.desativarMaquina(value.nomeMaq,value.cliente)} style={{ width: '50%', heigth: '3px', backgroundColor: '#FF6869' }}>
                                    <img heigth={'5px'} src={require('../../img/garbage.png')} className={'typeIcon'} alt={'Não foi possível carregar a imagem.'} />
                                </Button>
                                <Button className={'botao-x-rasp'} variant={'primary'} onClick={() => this.mostrarRasps(value.nomeMaq, value.cliente,value.resourceID)} style={{ width: '50%', heigth: '3px',backgroundColor:'#7CB7D4',border:'none' }}>
                                    <img heigth={'5px'} src={require('../../img/arrow.png')} className={'typeIcon'} alt={'Não foi possível carregar a imagem.'} />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row >
            )
        })

        return (
            <div>
                {maquina}
            </div >

        );
    }
}

export default Maquina;