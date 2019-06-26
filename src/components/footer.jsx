import React from 'react';
import {Navbar} from 'reactstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var cor = this.props.cor;
        var tamanho = this.props.tamanho;
        return (
            <Navbar color={cor} expand="md">
                <Container fluid>
                    <Row className="justify-content-xs-center">
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <a href="https://www.facebook.com/pauloasdf.pires" className="facebook"> Facebook
                            </a>
                            <a href="https://github.com/Pauloasdf" className="github">GitHub
                            </a>
                            <a href="https://twitter.com/paulopiresavila" className="twitter">Twitter
                            </a>
                            <a href="https://www.linkedin.com/in/paulo-pires-de-avila-960a7a170/" className="linkedin">Linkedin
                            </a>
                            <a href="https://www.instagram.com/paul_4pires" className="instagram">Instagram
                            </a>
                        </Col>
                    </Row>
                    {/* <Row className="justify-content-xs-center">
                        <Col>
                            2019 | Paulo Pires de Avila
                        </Col>
                    </Row> */}
                </Container>
                </Navbar>
        )
    }
}


export default Footer;