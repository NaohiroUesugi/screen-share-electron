import React, { useRef } from 'react';
import styled from 'styled-components';
import { colors, convertHexToRGBA } from './color';
import { ImCancelCircle } from 'react-icons/im';

const ModalWapperContent = styled.div``;
const ModalBody = styled.div`
  overflow: scroll;
  height: calc(100% - 13rem);
`;

const ModalWapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${convertHexToRGBA(colors.main, 0.5)};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  ${ModalWapperContent} {
    width: 50%;
    min-width: 30rem;
    height: 65%;
    border: 0.2rem solid ${colors.main};
    border-radius: 2rem;
    background-color: ${colors.white};
    z-index: 1;

    @keyframes openModal {
      from {
        width: 5%;
        height: 5.5%;
      }
      to {
        width: 50%;
        height: 65%;
      }
    }
    animation-name: openModal;
    animation-duration: 0.2s;
  }
`;

const ModalHeaderWapper = styled.div`
  position: relative;
  height: 5rem;

  & > svg {
    cursor: pointer;
    position: absolute;
    right: 5%;
    top: 1.5rem;
    padding: 0.5rem;
  }
`;

type ModalType = {
  isOpen: boolean;
  onCancelClick: () => void;
  body: React.ReactNode;
  footer: React.ReactNode;
  hasHeader?: boolean;
};

export const Modal: React.FC<ModalType> = ({
  body,
  isOpen,
  onCancelClick,
  footer,
  hasHeader = true,
}) => {
  if (!isOpen) {
    return null;
  }
  const ref = useRef(null);

  const onCancelClickModalWapper = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { clientX, clientY } = e;
    const isMouseOverModal = document
      .elementsFromPoint(clientX, clientY)
      .some((ele) => ele.id === 'modal-content');

    if (!isMouseOverModal) {
      onCancelClick();
    }
  };

  return (
    <ModalWapper ref={ref} onClick={onCancelClickModalWapper}>
      <ModalWapperContent id="modal-content">
        <ModalHeaderWapper>
          {hasHeader && <ImCancelCircle size="2rem" onClick={onCancelClick} />}
        </ModalHeaderWapper>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalWapperContent>
    </ModalWapper>
  );
};

const ModalFooter = styled.div`
  margin: 0 auto;
  width: 75%;
  height: 8rem;
`;
