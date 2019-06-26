import React, { Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

export default class Cabecalho extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isLogged: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    render() {
        return (
            <div>
                <Navbar color="dark" expand="md">
                    <NavbarBrand href="/" style={{ marginTop: '-10px' }}><b>{this.props.app}</b></NavbarBrand>
                    {this.state.isLogged === true &&
                        <Fragment>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar style={{ backgroundColor: '#343A40' }}>
                                    <NavItem style={{ backgroundColor: '#343A40', marginBottom: '15px' }}>
                                        <NavLink href="/components/">Components</NavLink>
                                    </NavItem>
                                    <NavItem style={{ backgroundColor: '#343A40', marginBottom: '15px' }}>
                                        <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Options
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                Option 1
                                        </DropdownItem>
                                            <DropdownItem>
                                                Option 2
                                        </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem>
                                                Reset
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