import React from 'react';
import './App.css';
import LoginSingUp from './components/login-singup'
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  var tipoDisp = '';
        var marginTopContainer = '30px';
        const comprimentoTela = window.innerWidth;
        if (comprimentoTela < 571) {
            tipoDisp = 'smartphone';
        } else {
            tipoDisp = 'computer';
        }

        if(sessionStorage.getItem('user')){
          document.location.href = 'http://10.10.10.235:3000/home';
        }
  return (
      <div className="App" style={{height:'100%'}}>
      <LoginSingUp tipoDisp={tipoDisp} marginTopContainer={marginTopContainer}></LoginSingUp>
      {/* <Footer cor={cor}></Footer> */}
    </div>
  );
}

export default App;
