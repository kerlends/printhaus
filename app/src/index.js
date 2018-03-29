import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const dest = document.getElementById('root');

const root = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(root, dest);

registerServiceWorker();
