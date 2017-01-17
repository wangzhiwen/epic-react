import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
require('bootstrap/dist/css/bootstrap.css')
require('bootstrap/dist/css/bootstrap-theme.css')

import { Router, Route, hashHistory } from 'react-router'

import About from './components/about/About'
import Repos from './components/prodcution/Repos'
import Helps from './components/help/Helps'

// Render the main component into the dom
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/help/:content" component={Helps} />
      <Route path="/repos" component={Repos}/>
      <Route path="/about/:para1" component={About}/>
    </Route>
  </Router>
  , document.getElementById('app')
);
