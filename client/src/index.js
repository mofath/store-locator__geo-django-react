import React from 'react';
import ReactDOM from 'react-dom';
import { LocusProvider } from './_store/locus.context'
import App from './App/App';
import './index.css';

const app =
  <LocusProvider>
    <App />
  </LocusProvider>

ReactDOM.render(app, document.getElementById('root'));



