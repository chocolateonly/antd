import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SliderDemo from './modules/layout/BasicLayout'
import {BrowserRouter as Router} from 'react-router-dom'
import '../node_modules/antd/dist/antd.css'
ReactDOM.render(
  <Router>
    <App />
  </Router>
,
  document.getElementById('root')
);
