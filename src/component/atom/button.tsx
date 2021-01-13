import React from 'react';
import styled from 'styled-components';

const ButtonWapper = styled.div<{ size: Size }>`
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => {
    switch (size) {
      case 'small':
        return '5rem';
      case 'medium':
        return '10rem';
      case 'large':
        return '15rem';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small':
        return '4rem';
      case 'medium':
        return '8rem';
      case 'large':
        return '12rem';
    }
  }};
  background-color: #4d6492;
  color: #ebe2d9;
  font-size: 2rem;
  font-weight: 600;
  border-radius: 5%;
  cursor: pointer;

  & > p {
    margin: 0;
  }

  &: hover {
    opacity: 0.8;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
`;

type Size = 'small' | 'medium' | 'large';

type ButtonProps = {
  onClick: () => void;
  text: string;
  size?: Size;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  size = 'medium',
}) => {
  return (
    <ButtonWapper onClick={onClick} size={size}>
      <p>{text}</p>
    </ButtonWapper>
  );
};
