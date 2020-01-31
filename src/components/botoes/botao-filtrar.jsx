import React from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Input } from 'reactstrap';
import Label from 'react-bootstrap/FormLabel'
import Form from 'react-bootstrap/Form'

class BotaoFiltrar extends React.Component {
    constructor(props) {
        super(props);
        const vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        this.state = { rasps: [], variaveis: vars, isFiltered: false, listaFiltrada: [], Form: {}, NovaRasp: {}, maquinas: [] };
        this.handleModalFiltroShow = this.handleModalFiltroShow.bind(this);
        this.handleModalFiltroClose = this.handleModalFiltroClose.bind(this);
    }
    handleModalFiltroShow() {
        this.setState({ showFiltro: true });
    }
    handleModalFiltroClose() {
        this.setState({ showFiltro: false })
    }
    render() {
        return (
            <Col xs={6} sm={3} md={3} lg={3}>
                <div>

                    <Modal show={this.state.showFiltro} onHide={this.handleModalFiltroClose} centered animation={'false'}>
                        <Modal.Header>
                            <Col data-dismiss={'modal'}>Filtrar Rasps</Col>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.onSubmit}>
                                <Label>Ip</Label>
                                <Input type={'text'} id={'ip'} name={'ip'} maxLength={15} value={this.state.Form.ip} onChange={this.onChange}></Input>
                                <Label>Eth</Label>
                                <Input type={'text'} id={'eth'} maxLength={5} name={'eth'} value={this.state.Form.eth} onChange={this.onChange}></Input>
                                <Label>Cliente</Label>
                                <Input type={'text'} id={'cliente'} maxLength={20} name={'cliente'} value={this.state.Form.cliente} onChange={this.onChange}></Input>
                                <Label>Codigo</Label>
                                <Input type={'text'} id={'codigo'} maxLength={5} name={'codigo'} value={this.state.Form.codigo} onChange={this.onChange}></Input>
                                <Label>ID</Label>
                                <Input type={'text'} id={'id'} maxLength={30} name={'id'} value={this.state.Form.id} onChange={this.onChange}></Input>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Col>
                                <Button className={'btn btn-danger'} style={{ width: '100%', height: '100%' }} onClick={this.handleModalFiltroClose}>
                                    CANCELAR
                                </Button>
                            </Col>
                            <Col>
                                <Button className={'btn btn-info'} style={{ width: '100%', height: '100%' }} onClick={this.handleModalFiltroClose}>
                                    FILTRAR
                        </Button>
                            </Col>
                        </Modal.Footer>
                    </Modal>


                    <Button variant={'info'} style={{ width: '100%', height: '40px', marginTop: '15px' }} onClick={this.handleModalFiltroShow}>FILTRAR</Button>

                </div>
            </Col>
        
        )
    }
}

export default BotaoFiltrar;