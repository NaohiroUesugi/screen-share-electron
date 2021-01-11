import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './createStore';
import App from './App';

ReactDOM.render(
  <Provider store={createStore()}>
    <p>HELLO WORLD</p>
    <App />
  </Provider>,
  document.getElementById('root')
);
