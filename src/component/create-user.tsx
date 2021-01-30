import React, { useState, useContext } from 'react';
import { Button } from './atom/button';
import { Modal } from './atom/modal';
import styled from 'styled-components';

import { InputText } from './atom/input-text';
import { Text } from './atom/text';
import { RoomContext } from './room-state';

const ModalInputTextWapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const ModalText = styled(Text)`
  text-align: center;
  margin-bottom: 1rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;

export const CreateUser: React.FC = () => {
  const [name, setName] = useState('');
  const { joinMenberRoom } = useContext(RoomContext);

  return (
    <>
      <form>
        <Modal
          hasHeader={false}
          isOpen={true}
          onCancelClick={() => void 0}
          body={
            <ModalBody>
              <ModalText>名前を登録</ModalText>
              <ModalInputTextWapper>
                <InputText
                  value={name}
                  placeholder="name"
                  onChange={(value: string) => setName(value)}
                />
              </ModalInputTextWapper>
            </ModalBody>
          }
          footer={
            <ModalFooter>
              <Button
                onClick={() => {
                  joinMenberRoom(name);
                }}
                text="Join Room!"
                disabled={name === ''}
              />
            </ModalFooter>
          }
        ></Modal>
      </form>
    </>
  );
};
