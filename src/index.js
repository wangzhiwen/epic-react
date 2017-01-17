import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
require('bootstrap/dist/css/bootstrap.css')
require('bootstrap/dist/css/bootstrap-theme.css')
// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
