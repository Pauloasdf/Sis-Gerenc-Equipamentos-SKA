import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import { Input } from 'reactstrap'
import endereco from '../../back-end/endereco'

class Rasps extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rasps: [], listaAtualizadaExclusao: [] }

        // this.alterarRasp = this.alterarRasp.bind(this);
        this.desativarRasp = this.desativarRasp.bind(this);
        this.redirecionarETH = this.redirecionarETH.bind(this);

    }

    redirecionarETH(ip) {
        window.location.href = 'http://' + ip + '/'
    }
    desativarRasp(eth,cliente,code) {
        if (window.confirm('Você realmente deseja excluir a Rasp ' + eth + '?')) {
            console.log('Desativando ' + eth + ' ........');
            const valor = { eth: eth,usuario:sessionStorage.getItem('user'),cliente:cliente,code:code };
            fetch('http://' + endereco + ':8080/desativarRasp', {
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
            })        /* eslint-disable */

            setTimeout(() => {
                this.props.rasps.map((value, i) => {
                    if (value.eth === eth) {
                        return value.isEnabled = false;
                    }
                })
                const newList = this.props.rasps.filter((value, i) => {
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
        function alterarRasp(valor, i,cliente) {
            const raspEditada = {
                iddb: document.getElementById('iddb' + valor).value,
                ipEditado: document.getElementById('ipEditado' + valor).value,
                macEndereco: document.getElementById('macEditado' + valor).value,
                versaoEditado: document.getElementById('versaoEditado' + valor).value,
                ethEditado: document.getElementById('ethEditado' + valor).value,
                codeEditado: document.getElementById('codeEditado' + valor).value,
                idEditado: document.getElementById('idEditado' + valor).value,
                in1Editado: document.getElementById('in1Editado' + valor).value,
                in2Editado: document.getElementById('in2Editado' + valor).value,
                out1Editado: document.getElementById('out1Editado' + valor).value,
                out2Editado: document.getElementById('out2Editado' + valor).value,
                obsEditado: document.getElementById('obsEditado' + valor).value,
                usuario:sessionStorage.getItem('user'),
                cliente:cliente
            }
            console.log('Atualizando Rasp: ' + raspEditada.ethEditado + ' .......');
            fetch('http://' + endereco + ':8080/alterarRasp', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify(raspEditada),
            })
            setTimeout(() => {
                window.location.reload();
            }, 1);
        }

        const styleInput = { marginBottom: '-6px', marginTop: '-2px' };
        const styleTD = { backgroundColor: 'white' };
        var propsRasps = [];
        if (this.state.isRemovido === true) {
            propsRasps = this.state.listaAtualizadaExclusao;
        } else {
            propsRasps = this.props.rasps;
        }
        const rasp = propsRasps.map((value, i) => {
            return (
                <Row style={{ marginBottom: '-20px' }} key={i} >
                    <Col xs={9} sm={9} md={9} lg={9}>
                        <Accordion defaultActiveKey="1">
                            <Card>
                                <Row style={{ marginBottom: '-5px', marginTop: '-5px' }}>
                                    <Col xs={9} sm={10} md={11} lg={11} style={{ marginBottom:'-4px', marginTop:'-1px' }} className={'mostrarCursor'}>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" style={{ backgroundColor: 'white' }}>
                                            <img heigth={'10px'} src={require('../../img/rasp.png')} className={'typeIcon'} alt={'Não foi possível carregar a imagem.'} /> &nbsp;	&nbsp;	 <b>{value.eth.toUpperCase()}</b> 
                                        </Accordion.Toggle>
                                    </Col>
                                    <Col xs={2} sm={2} md={1} lg={1} style={{marginBottom:'-4px', marginTop:'-1px', marginLeft:'-15px'}}>
                                        <Accordion.Toggle as={Button} className={'btn-functions'} variant={'success'} style={{ heigth: '3px', marginBottom: '-2px',backgroundColor:'#86CE85'}} eventKey="5">
                                            <img heigth={'5px'} src={require('../../img/edit-white.png')} className={'typeIcon'} alt={'Não foi possível carregar a imagem.'} />
                                        </Accordion.Toggle>
                                    </Col>
                                    <Col>
                                        {/* ===================================== TABELA FIXA DA RASP SELECIONADA ===================================== */}
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <Table striped bordered hover>
                                                    <tbody>
                                                        <tr style={{display:'none'}}>
                                                            <td>ID_DB</td>
                                                            <td>{value._id}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>IP</td>
                                                            <td>{value.ipFixo}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>ETH</td>
                                                            <td>{value.eth}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>MAC</td>
                                                            <td>{value.macEndereco}</td>
                                                        </tr> 
                                                        <tr>
                                                            <td>Versão</td>
                                                            <td>{value.versao}</td>
                                                        </tr>                                                     
                                                        <tr>
                                                            <td>CÓDIGO</td>
                                                            <td>{value.code}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>ResourceID</td>
                                                            <td>{value.resourceID}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Entrada 1</td>
                                                            <td>{value.confIN1}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Entrada 2</td>
                                                            <td>{value.confIN2}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Saída 1</td>
                                                            <td>{value.confOUT1}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>SAÍDA 2</td>
                                                            <td>{value.confOUT2}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>OBSERVAÇÃO</td>
                                                            <td>{value.obs}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>

                                            </Card.Body>
                                        </Accordion.Collapse>
                                        {/* ===================================== TABELA EDITÁVEL DA RASP SELECIONADA ===================================== */}
                                        <Accordion.Collapse eventKey="5">
                                            <Card.Body>
                                                <Table striped bordered hover>
                                                    <tbody>
                                                        <tr style={{display:'none'}}>
                                                            <td>ID_DB</td>
                                                            <td>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'iddb' + value._id}
                                                                    name={'iddb'}
                                                                    style={styleInput}
                                                                    value={value._id}
                                                                    readOnly>
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>IP</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'ipEditado' + value._id}
                                                                    maxLength={15}
                                                                    name={'ipEditado'}
                                                                    style={styleInput}
                                                                    defaultValue={value.ipFixo}>
                                                                </Input>
                                                            </td>
                                                        </tr>                                                 
                                                        <tr>
                                                            <td>ETH</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'ethEditado' + value._id}
                                                                    maxLength={10}
                                                                    name={'ethEditado'}
                                                                    style={styleInput}
                                                                    defaultValue={value.eth}>
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>MAC</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'macEditado' + value._id}
                                                                    maxLength={20}
                                                                    name={'macEditado'}
                                                                    style={styleInput}
                                                                    defaultValue={value.macEndereco}>
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Versão</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'versaoEditado' + value._id}
                                                                    maxLength={20}
                                                                    name={'versaoEditado'}
                                                                    style={styleInput}
                                                                    defaultValue={value.versao}>
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>CÓDIGO</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'codeEditado' + value._id}
                                                                    maxLength={10}
                                                                    name={'codeEditado'}
                                                                    style={styleInput}
                                                                    defaultValue={value.code}>
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>ResourceID</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'number'}
                                                                    id={'idEditado' + value._id}
                                                                    maxLength={5}
                                                                    name={'idEditado'}
                                                                    style={styleInput}
                                                                    defaultValue={value.resourceID}>
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>ENTRADA 1</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'in1Editado' + value._id}
                                                                    maxLength={50}
                                                                    name={'in1Editado'}
                                                                    style={styleInput}
                                                                    defaultValue={value.confIN1}>
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>ENTRADA 2</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'in2Editado' + value._id}
                                                                    maxLength={50}
                                                                    name={'in2Editado'}
                                                                    style={styleInput}
                                                                    defaultValue={value.confIN2}>
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>SAÍDA 1</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'out1Editado' + value._id}
                                                                    maxLength={50}
                                                                    name={'out1Editado'}
                                                                    style={styleInput}
                                                                    defaultValue={value.confOUT1}>
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>SAÍDA 2</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'out2Editado' + value._id}
                                                                    maxLength={50}
                                                                    name={'out2Editado'}
                                                                    style={styleInput}
                                                                    defaultValue={value.confOUT2}>
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>OBSERVAÇÃO</td>
                                                            <td style={styleTD}>
                                                                <Input
                                                                    type={'text'}
                                                                    id={'obsEditado' + value._id}
                                                                    maxLength={20}
                                                                    name={'obsEditado'}
                                                                    style={styleInput}
                                                                    defaultValue={value.obs}>
                                                                </Input>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={2}>
                                                                <Button variant={'success'} onClick={() => alterarRasp(value._id, i,value.cliente)} style={{ width: '100%' }}> SALVAR </Button>
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
                    <Col xs={3} sm={3} md={3} lg={3} style={{ alignContent: 'right', marginTop: '6px' }}>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} style={{ paddingRight: '-5px' }}>
                                <Button variant={'danger'}  className={'btn-functions'} onClick={() => this.desativarRasp(value.eth,value.cliente,value.code)} style={{ width: '50%', heigth: '3px', backgroundColor:'#FF6869' }}>
                                    <img heigth={'5px'} src={require('../../img/garbage.png')} className={'typeIcon'} alt={'Não foi possível carregar a imagem.'} />
                                </Button>
                                <Button className={'botao-x-rasp'} className={'btn-functions'} variant={'info'} onClick={() => this.redirecionarETH(value.ipFixo)} style={{ width: '50%', heigth: '3px',backgroundColor:'#7CB7D4' }}>
                                    <img heigth={'5px'} src={require('../../img/engrenagem.png')} className={'typeIcon'} alt={'Não foi possível carregar a imagem.'} />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row >
            )
        })

        return (
            <div>
                {rasp}
            </div>

        );
    }
}

export default Rasps;