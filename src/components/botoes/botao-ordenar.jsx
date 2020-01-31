import React from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class BotaoOrdenar extends React.Component{
    constructor(props) {
        super(props);
        this.handleModalOrdenaShow = this.handleModalOrdenaShow.bind(this);
        this.handleModalOrdenaClose = this.handleModalOrdenaClose.bind(this);
    }
    handleModalOrdenaShow() {
        this.setState({ showOrdena: true });
    }
    handleModalOrdenaClose() {
        this.setState({ showOrdena: false })
    }
    render(){
        return(
            <Col xs={6} sm={3} md={3} lg={3}>
                <Button variant={'primary'} style={{ width: '100%', height: '40px', marginTop: '15px' }} onClick={super.handleModalOrdenaShow}>ORDENAR</Button>
            </Col>
        )
    }
}

export default BotaoOrdenar;