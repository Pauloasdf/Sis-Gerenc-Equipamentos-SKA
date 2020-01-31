import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//Componentes
// import LoginSingUp from './components/login-singup'
// import Cabecalho from '../src/components/navbar';
// import Footer from '../src/components/footer'
import Home from '../src/components/home';
import CodigoQR from '../src/components/qr-reader';
import ListaRasps from '../src/components/listagens/listagem-rasps';
import ListaMaquinas from '../src/components/listagens/listagem-maq';
import ListaClientes from '../src/components/listagens/listagem-clientes'
ReactDOM.render(
<BrowserRouter>
<Switch style={{heigth:'100%'}}>
        <Route path="/" exact={true} component={App}></Route>
        <Route path="/rasps" component={ListaRasps}></Route>
        <Route path="/maquinas" component={ListaMaquinas} style={{heigth:'100%'}} ></Route>
        <Route path="/clientes" component={ListaClientes} style={{heigth:'100%'}}></Route>
        <Route path="/qrreader" component={CodigoQR}></Route>
        <Route path="/home" component={Home}></Route>
</Switch>
</BrowserRouter>


, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
