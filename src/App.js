import React from 'react';
import './App.css';
import LoginSingUp from './components/login-singup'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cabecalho from '../src/components/navbar';
import Footer from '../src/components/footer'

function App() {
  var tipoDisp = '';
        var marginTopContainer = '30px';
        const tamanhoTela = window.innerHeight;
        const comprimentoTela = window.innerWidth;
        if (comprimentoTela < 571) {
            tipoDisp = 'smartphone';
        } else {
            tipoDisp = 'computer'
        }
  return (
    <div className="App">
      <Cabecalho app={"SisGen"} tipoDisp={tipoDisp}></Cabecalho>
      <LoginSingUp tipoDisp={tipoDisp} marginTopContainer={marginTopContainer}></LoginSingUp>
      <Footer cor={'dark'} tamanho={tamanhoTela}></Footer>
    </div>
  );
}

export default App;
