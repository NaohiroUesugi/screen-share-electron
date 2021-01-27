import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './createStore';
import { App } from './component/app';
import { RoomState } from './component/room-state';

ReactDOM.render(
  <Provider store={createStore()}>
    <RoomState>
      <App />
    </RoomState>
  </Provider>,
  document.getElementById('root')
);
