import React, { useState, useRef, useContext } from 'react';
import { ScreenImage } from './screen-image';
import { Button } from './atom/button';
import { Text } from './atom/text';
import { Modal } from './atom/modal';
import { Screen, ScreenType } from '../model/screen';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from '../slice/index';
import { RoomContext } from './room-state';

export const Home: React.FC = () => {
  const { selfUser } = useSelector((state: RootState) => state.user);
  const [screenImages, setScreenImages] = useState<ScreenType[]>([]);
  const [selectImageId, setSelectImageId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { viewStreamRoom, shareStremRoom, canStreamingScreen } = useContext(
    RoomContext
  );

  const videoRef = useRef(null);
  const handleStream = (stream: any) => {
    videoRef.current.srcObject = stream;
    videoRef.current.onloadedmetadata = () => videoRef.current.play();
    Screen.drawingCanvas(videoRef);
    shareStremRoom(stream);
  };

  const handleMedia = (type: string[]) => {
    Screen.getSources(type).then(async (sources) => {
      const screenImages: ScreenType[] = [];
      for (const source of sources) {
        try {
          screenImages.push(Screen.formatScreenData(source));
        } catch (e) {
          console.log(e);
        }
      }
      setScreenImages(screenImages);
      setIsModalOpen(true);
    });
  };

  const openVideo = async () => {
    if (!canStreamingScreen) {
      console.log('streaming....');
      return null;
    }
    Screen.setScreen(selectImageId).then((stream) => {
      handleStream(stream);
    });
    setIsModalOpen(false);
  };

  const viewScreen = () => {
    viewStreamRoom(videoRef);
  };

  return (
    <>
      <TextName>登録名: {selfUser.name}</TextName>
      <Button onClick={() => handleMedia(['screen'])} text="画面を共有" />
      <Button onClick={() => handleMedia(['window'])} text="アプリを共有" />
      <Button onClick={viewScreen} text="画面を見る" />
      <Modal
        isOpen={isModalOpen}
        onCancelClick={() => setIsModalOpen(false)}
        body={
          <>
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
                      setSelectImageId(id);
                    }}
                  />
                );
              })}
          </>
        }
        footer={
          <ModalFooter>
            <Button onClick={openVideo} text="GO VIDEO" />
          </ModalFooter>
        }
      ></Modal>
      <div>
        <Video id="screen-video" ref={videoRef} />
        <Canvas id="video-canvas" />
      </div>
    </>
  );
};

const TextName = styled(Text)`
  text-align: center;
  margin: 2rem 0;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;

const Canvas = styled.canvas`
  display: none;
  width: 100%;
  height: 100%;
`;

const Video = styled.video`
  display: none;
`;
