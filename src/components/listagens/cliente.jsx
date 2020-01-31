import React, { Fragment } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import endereco from '../../back-end/endereco'
import { CSVLink } from "react-csv";
import Button from 'react-bootstrap/Button';

class Cliente extends React.Component {
    constructor(props) {
        super(props);
        this.state = { raspsDoCliente: [], maquinasDoCliente: [], isSelected: false, csv: [] }
        this.geraCSV = this.geraCSV.bind(this);
    }
    redirecionaMaquinas(cliente) {
        window.location.href = 'http://' + endereco + ':3000/maquinas?cliente=' + cliente;
    }

    geraCSV(cliente) {
        fetch('http://' + endereco + ':8080/rasps')
            .then(result => result.json())
            .then(data => {
                var regexCli = RegExp('^' + cliente);
                /* eslint-disable */
                const raspsDoCliente = data.filter(function (value, i) {
                    if (value.isEnabled && value.isEnabled === true && regexCli.test(value.cliente) === true) {
                        return value;
                    }
                })
                this.setState({ raspsDoCliente: raspsDoCliente })
            });
        fetch('http://' + endereco + ':8080/maquinas')
            .then(result => result.json())
            .then(data => {
                const maquinasCliente = data.filter(function (valorMaq, i) {
                    if (valorMaq.isEnabled === true && valorMaq.cliente === cliente) {
                        return valorMaq;
                    }
                })
                this.setState({ maquinasDoCliente: maquinasCliente })
                const csv = [];
                maquinasCliente.map((valorMaq, i) => {
                    if(this.state.raspsDoCliente[0]){
                        this.state.raspsDoCliente.map((value, k) => {
                            //---------------------------------------- DEFINIÇÃO DAS COLUNAS DO CSV ----------------------------------------
                            if (valorMaq.nomeMaq === value.code) {
                                csv.push({
                                    // CAMPOS MAQUINA
                                    'M: QR-Code': valorMaq.nomeMaq,
                                    'M: TLT': valorMaq.tlt,
                                    'M: Syneco': valorMaq.verSyneco,
                                    'M: Mongo': valorMaq.verMongo,
                                    'M: Integrator': valorMaq.verIntegrator,
                                    'M: IP Fixo': valorMaq.ipFixo,
                                    'M: SO': valorMaq.verSO,
                                    'M: Arquitetura SO': valorMaq.arquiteturaSO,
                                    'M: Observação': valorMaq.obs,
                                    'M: DKTP': valorMaq.nome_dktp_remote,
                                    'M: ID': valorMaq.id_remote,
                                    'M: Senha': valorMaq.pass_remote,
                                    // CAMPOS RASP
                                    'R: ETH ': value.eth,
                                    'R: Ip Fixo ': value.ipFixo,
                                    'R: MAC ': value.macEndereco,
                                    'R: Code ': value.code,
                                    'R: ResourceID ': value.resourceID,
                                    'R: Entrada 1 ': value.confIN1,
                                    'R: Entrada 2 ': value.confIN2,
                                    'R: Saída 1 ': value.confOUT1,
                                    'R: Saída 2 ': value.confOUT2,
                                    'R: Observação': value.obs,
                                    'R: Versão': value.versao
                                });
                            }
                            //--------------------------------------------------------------------------------------------------------------
                        })
                    }else{
                        csv.push(["O cliente não possui Rasps Cadastradas!"]);
                    }
                })
                this.setState({ csv: csv });
            }
            );
        this.setState({ clienteSelecionado: cliente })
        setTimeout(() => {
            const botao = document.getElementById('botaoBaixar');
            botao.click();
        }, 1500);

    }

    render() {
        const cliente = this.props.cliente.map((value, i) => {
            const state = 'this.state.isSelected' + i;
            return (
                <Row style={{ marginBottom: '5px', marginTop: '5px' }} key={i}>
                    <Col xs={8} sm={9} md={9} lg={9}>
                        <span className={'mostrarCursor'} onClick={() => this.redirecionaMaquinas(value)}>
                            <Accordion.Toggle as={Card.Header} className={'span-cliente'} variant="link" eventKey="0" style={{ backgroundColor: 'white', width: '100%' }}>
                                <img heigth={'10px'} src={require('../../img/Caminho.png')} className={'typeIcon'} alt={'Não foi possível carregar a imagem.'} /> &nbsp;	&nbsp;	<b>{value}</b>
                            </Accordion.Toggle>
                        </span>
                    </Col>
                    <Col style={{ marginLeft: '-15px' }} xs={4} sm={3} md={3} lg={3}>
                        <Button onClick={() => this.geraCSV(value)} style={{ width: '100%', height: '100%', backgroundColor: 'rgb(124, 183, 212)',border:'none' }}><img src={require('../../img/down.png')}></img></Button>
                        {this.state.clienteSelecionado && this.state.clienteSelecionado === value &&
                            <Fragment>
                                <CSVLink id={'botaoBaixar'} filename={value + '.csv'} data={this.state.csv} target="_blank" separator={";"} enclosingCharacter={`"`}></CSVLink>
                            </Fragment>
                        }
                    </Col>
                </Row>
            )
        })

        return (
            <div>
                {cliente}
            </div>

        );
    }
}

export default Cliente;