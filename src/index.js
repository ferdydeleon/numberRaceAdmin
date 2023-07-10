import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import AlertTemplate from 'react-alert-template-basic'
import { Provider as AlertProvider,positions } from 'react-alert'

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
  /* position: 'top right',
  timeout: 5000,
  width: "1000px",
  offset: '30px',
  transition: 'scale',
  containerStyle: {
    zindex: 100
    //width: "300px"
  } */
}

ReactDOM.render((
  <BrowserRouter>
   <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
