// react and extensions
import React from 'react';
import ReactDOM from 'react-dom';
// import { Route, BrowserRouter } from 'react-router-dom';
// other libraries
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line
import $ from 'jquery';
// eslint-disable-next-line
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as serviceWorker from './serviceWorker';
// my stuff
import './index.css';
import App from './App';

/**
 * THIS IS WHERE WE INSERT OUR APP INTO INDEX.html
 * AT DIV ID='ROOT'
 */
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
