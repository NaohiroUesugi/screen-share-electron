import React from 'react';
import styled from 'styled-components';
import { colors } from './color';
import { Size } from '../../types/common';

const ButtonWapper = styled.button<{ size: Size }>`
  user-select: none;
  outline: none;
  cursor: 'pointer'
  display: inline-block;
  max-width: 18rem;
  text-align: left;
  border: 0.2rem solid ${colors.main};
  font-size: 1.5rem;
  color: ${colors.main};
  background-color: ${colors.white};
  text-decoration: none;
  font-weight: bold;
  border-radius: 0.4rem;
  transition: 0.4s;
  padding: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.5rem 1rem';
      case 'medium':
        return '0.8rem 1.6rem';
      case 'large':
        return '1rem 2rem';
    }
  }};

  &: hover {
    background-color: ${colors.main};
    border-color: ${colors.main};
    color: ${colors.white};
  }
`;

type ButtonProps = {
  onClick?: () => void;
  text: string;
  size?: Size;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  onClick: onClickProps,
  text,
  size = 'medium',
  disabled,
}) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClickProps();
  };
  return (
    <ButtonWapper onClick={onClick} size={size} disabled={disabled}>
      {text}
    </ButtonWapper>
  );
};
