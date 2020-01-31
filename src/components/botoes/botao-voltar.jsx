import React from 'react';
import Button from 'react-bootstrap/Button';

class BotaoVoltar extends React.Component{
    render(){
        return(
            <Button variant={'success'} className={'btn-voltar'} onClick={()=> window.history.back()}>
                <img style={{height:'20px'}} src={require('../../img/left-arrow-white.png')} alt={'Não foi possível carregar a imagem.'}></img>
            </Button>
        )
    }
}

export default BotaoVoltar;