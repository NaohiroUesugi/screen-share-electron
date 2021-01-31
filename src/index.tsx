import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './createStore';
import { App } from './component/app';
import { RoomState } from './component/room-state';
import axios from 'axios';
const apiUrl = 'https://screen-share-api.herokuapp.com/api/v1/user';

const IndexComponent: React.FC = () => {
  const [skywayKey, setSkywayKey] = React.useState(null);
  React.useEffect(() => {
    if (!skywayKey) {
      axios.get(`${apiUrl}/get_skyway_api_key`).then((res) => {
        setSkywayKey(res.data.skyway_api_key);
      });
    }
  }, []);
  return (
    <>
      {skywayKey ? (
        <Provider store={createStore()}>
          <RoomState skywayKey={skywayKey}>
            <App />
          </RoomState>
        </Provider>
      ) : (
        <h1>...loding</h1>
      )}
    </>
  );
};

ReactDOM.render(<IndexComponent />, document.getElementById('root'));
