import React, { Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Col from 'react-bootstrap/Col'

export default class Cabecalho extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isLogged: false
        };
        if (sessionStorage.getItem('user') !== undefined) {
            this.state.isLogged = true;
        }
        this.resetaUser = this.resetaUser.bind(this);
    }
    resetaUser() {
        sessionStorage.clear();
        window.location.reload();
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    render() {
        return (
            <div>
                <Navbar style={{ backgroundColor: '#0081AC' }}>

                    {this.state.isLogged === true &&

                        <Fragment>
                            <Col xs={1} sm={1} md={1} lg={1}>
                                {sessionStorage.getItem('user') &&
                                    <Fragment>
                                        <NavbarToggler onClick={this.toggle} style={{ color: 'white' }} className={'icon-navbar'}>
                                            <img heigth={'100%'} src={require('../img/grupo1.png')} style={{ marginTop: '-15px', marginLeft: '-20px' }} alt={'Não foi possível carregar a imagem.'} />
                                        </NavbarToggler>
                                    </Fragment>
                                }
                            </Col>
                            <Col xs={10} sm={10} style={{ marginTop: '-5px' }}>
                                <center><NavbarBrand href="/" style={{ marginTop: '-10px' }}>
                                    <img style={{ height: '50px', marginTop: '-5px' }} src={require('../img/syneco2.png')} alt={'Não foi possível carregar a imagem.'} />
                                </NavbarBrand></center>
                            </Col>
                            <Col xs={1} sm={1} md={1} lg={1}>
                            </Col>
                            <Collapse isOpen={this.state.isOpen} navbar style={{
                                zIndex: '2',
                                paddingBottom: '15px'
                            }}>
                                {/* eslint-disable  */}
                                <Nav className="ml-auto" navbar style={{ backgroundColor: '#0081AC' }} className={'nav-drop'}>
                                    {/* <NavItem style={{ backgroundColor: '#0081AC', paddingTop: '8px' }}>
                                        Histórico
                                    </NavItem> */}
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret style={{ paddingLeft: '20px', backgroundColor: '#0081AC' }}>
                                            {sessionStorage.getItem('user')}
                                        </DropdownToggle>
                                        <DropdownMenu right style={{ backgroundColor: '#0081AC', width: '20%' }}>
                                            {/* <DropdownItem className={'drop-down'}>
                                                Option 1
                                        </DropdownItem>
                                            <DropdownItem className={'drop-down'}>
                                                Option 2
                                        </DropdownItem> */}
                                            <DropdownItem className={'drop-down'} onClick={this.resetaUser}>
                                                Sair
                                        </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>

                        </Fragment>


                    }
                </Navbar>
            </div>
        );
    }
}