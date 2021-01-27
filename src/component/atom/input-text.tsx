import styled from 'styled-components';
import React from 'react';
import { Size } from '../../types/common';

type InputTextProps = {
  size?: Size;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const InputText: React.FC<InputTextProps> = ({
  placeholder = '',
  onChange,
  value,
}) => {
  const handleCange = (e) => {
    onChange(e.target.value);
  };
  return (
    <InputTextStyle
      onChange={handleCange}
      placeholder={placeholder}
      value={value}
    />
  );
};

const InputTextStyle = styled.input.attrs({ type: 'text' })`
  padding: 0.5em;
  margin: 0.5em;
  color: #4d6492;
  border: 2px solid #4d6492;
  border-radius: 3px;
  width: 100%;

  &:focus {
    border: 2px solid #3d92a4;
    outline: none;
  }
`;
