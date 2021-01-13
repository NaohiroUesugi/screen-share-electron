import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import counterSlice from './counter/slice';
import { useCounterState } from './counter/selectors';

import { desktopCapturer } from 'electron';

import { ScreenImage } from './component/screen-image';
import { Button } from './component/atom/button';
import { Text } from './component/atom/text';

// import Peer from 'skyway-js';
// const peer = new Peer({key: 'あなたのAPIキー'});

type ScreenImage = {
  id: string;
  title: string;
  url: string;
};

const App: React.FC = () => {
  const dispatch = useDispatch();
  const state = useCounterState().counter;
  const [screenImages, setScreenImages] = useState<ScreenImage[]>([]);
  const [selectImageId, setSelectImageId] = useState<string>('');

  const onClickIncrement = () => {
    dispatch(counterSlice.actions.incrementCounter(1));
  };

  const onClickDecrement = () => {
    dispatch(counterSlice.actions.decrementCounter(1));
  };

  // console.log('process.env.API_KEY');
  // console.log(process.env.API_KEY);

  const handleStream = (stream: any) => {
    const video = document.querySelector('video');
    if (!video) {
      return;
    }
    video.srcObject = stream;
    video.onloadedmetadata = () => video.play();
  };

  const handleError = (e: any) => {
    if (!e) {
      return;
    }
    console.log(e);
  };

  const handleMedia = () => {
    desktopCapturer
      .getSources({ types: ['window', 'tab'] })
      .then(async (sources) => {
        console.log(sources);
        const screenImages: ScreenImage[] = [];
        for (const source of sources) {
          try {
            screenImages.push({
              id: source.id,
              title: source.name,
              url: source.thumbnail.toDataURL(),
            });
          } catch (e) {
            handleError(e);
          }
        }
        setScreenImages(screenImages);
      });
  };

  const openVideo = async () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: selectImageId,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720,
          },
        },
      } as MediaStreamConstraints)
      .then((stream) => {
        handleStream(stream);
      });
  };

  return (
    <>
      <Button onClick={onClickIncrement} text="ADD" size="small" />
      <Button onClick={onClickDecrement} text="DELETE" size="large" />
      <Text>count:{state.count}</Text>
      <Button onClick={handleMedia} text="view screen" />
      {screenImages &&
        screenImages.map((image) => {
          return (
            <ScreenImage
              key={image.id}
              id={image.id}
              title={image.title}
              url={image.url}
              selectImageId={selectImageId}
              handleSelectImage={(id) => {
                console.log('d');
                setSelectImageId(id);
              }}
            />
          );
        })}
      <Button onClick={openVideo} text="GO VIDEO" />
      <video></video>
    </>
  );
};

export default App;
