import React, { createContext, useState, useCallback, useMemo } from 'react';
import Peer, { SfuRoom } from 'skyway-js';
import { useDispatch } from 'react-redux';
import { userActions } from '../slice/user-slice';
import { logHistoryActions } from '../slice/log-history-slice';
import { Screen } from '../model/screen';
import axios from 'axios';

const skywayKey = process.env.API_KEY;
const peer = new Peer({ key: skywayKey });
const apiUrl = 'https://screen-share-api.herokuapp.com/api/v1/user';

export const RoomContext = createContext(null);

type CanvasMousePosition = {
  type: 'CanvasMousePosition';
};

type CurrentRoomState = {
  type: 'CurrentRoomState';
  canStreamingScreen: boolean;
};

type joinRoom = {
  type: 'joinRoom';
};

type SendRoomMessageType =
  | 'CurrentRoomState'
  | 'CanvasMousePosition'
  | 'joinRoom';
type SendRoomMessage = CurrentRoomState | CanvasMousePosition | joinRoom;

export const RoomState: React.FC = ({ children }) => {
  const [canStreamingScreen, setCanStreamingScreen] = useState(false);

  const dispatch = useDispatch();
  let menberRoom: SfuRoom | null = useMemo(() => null, []);
  let streamShareRoom: SfuRoom | null = useMemo(() => null, []);

  const sendCurrentRoomState = () => {
    sendMenberRoom({
      type: 'CurrentRoomState',
      canStreamingScreen: canStreamingScreen,
    });
  };

  const startStreaming = async () => {
    setCanStreamingScreen(false);
    sendStreamingRoomState(false);
    await axios.post(`${apiUrl}/streaming_state`, {
      canStreamingScreen: false,
    });
  };

  const stopStreaming = async () => {
    setCanStreamingScreen(true);
    sendStreamingRoomState(true);
    await axios.post(`${apiUrl}/streaming_state`, {
      canStreamingScreen: true,
    });
  };

  const sendStreamingRoomState = (isStreaming: boolean) => {
    sendMenberRoom({
      type: 'CurrentRoomState',
      canStreamingScreen: isStreaming,
    });
  };

  const joinMenberRoom = useCallback((name: string) => {
    menberRoom = peer.joinRoom('menber-room', {
      mode: 'sfu',
      stream: undefined,
    });
    menberRoom.on('open', () => {
      dispatch(userActions.createUser({ name, peerId: peer.id }));
      axios
        .post(`${apiUrl}/join_room`, {
          userId: peer.id,
          userName: name,
        })
        .then((res) => {
          const { users, canStreamingScreen } = res.data;
          dispatch(userActions.getUser({ users }));
          setCanStreamingScreen(canStreamingScreen);
          sendMenberRoom({ type: 'joinRoom' });
        });
    });

    menberRoom.on('data', ({ src: peerId, data }) => {
      const type: SendRoomMessageType = data.type;
      if (type === 'CurrentRoomState') {
        setCanStreamingScreen(data.canStreamingScreen);
      }
      if (type === 'joinRoom') {
        axios.get(`${apiUrl}/get_user`).then((res) => {
          const { users } = res.data;
          dispatch(userActions.getUser({ users }));
        });
      }
      if (type === 'CanvasMousePosition') {
        console.log('CanvasMousePosition');
      }
    });
  }, []);

  const sendMenberRoom = (data: SendRoomMessage) => {
    if (!menberRoom) {
      return null;
    }
    menberRoom.send(data);
  };

  const shareStremRoom = useCallback((stream) => {
    streamShareRoom = peer.joinRoom('strem-room', {
      mode: 'sfu',
      stream: stream || undefined,
    });
    streamShareRoom.on('open', () => {
      startStreaming();
      dispatch(logHistoryActions.addLog({ text: '配信を開始', user: peer.id }));
    });
    streamShareRoom.on('peerJoin', (peerId) => {
      dispatch(
        logHistoryActions.addLog({ text: '配信を視聴開始', user: peerId })
      );
    });
    streamShareRoom.on('peerLeave', (peerId) => {
      stopStreaming();
      dispatch(
        logHistoryActions.addLog({ text: '配信を視聴終了', user: peerId })
      );
    });
  }, []);

  const viewStreamRoom = useCallback((remoteVideo) => {
    streamShareRoom = peer.joinRoom('strem-room', {
      mode: 'sfu',
      stream: undefined,
    });
    streamShareRoom.on('open', () => {
      dispatch(logHistoryActions.addLog({ text: 'roomに入室', user: peer.id }));
    });
    streamShareRoom.on('peerJoin', (peerId) => {
      dispatch(logHistoryActions.addLog({ text: 'roomに入室', user: peerId }));
    });
    streamShareRoom.on('peerLeave', (peerId) => {
      dispatch(logHistoryActions.addLog({ text: 'roomに退室', user: peerId }));
    });
    streamShareRoom.on('stream', async (stream) => {
      remoteVideo.current.srcObject = stream;
      await remoteVideo.current.play().catch(console.error);
      Screen.drawingCanvas(remoteVideo);
    });
  }, []);

  return (
    <RoomContext.Provider
      value={{
        joinMenberRoom,
        menberRoom,
        sendMenberRoom,
        viewStreamRoom,
        shareStremRoom,
        canStreamingScreen,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
