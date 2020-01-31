import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StickyFooter from 'react-sticky-footer';

class Footer extends React.Component {
    render() {
        return (
            <StickyFooter
                bottomThreshold={200}
                normalStyles={{
                    backgroundColor: this.props.cor,
                    padding: "2rem"
                }}
                // style={{ backgroundColor: this.props.cor }}
            >

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
            </StickyFooter>
        )
    }
}


export default Footer;