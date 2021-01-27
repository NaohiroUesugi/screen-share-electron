import React from 'react';
import styled from 'styled-components';
import { colors } from './atom/color';

const ScreenImageStyle = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.5rem;
  img {
    border: ${({ isSelected }) =>
      isSelected ? `0.5rem solid ${colors.main}` : ''};
    border-radius: 0.7rem;
    filter: ${({ isSelected }) =>
      isSelected ? 'brightness(1)' : 'brightness(0.7)'};
    width: 75%;
    &:hover {
      border: 0.5rem solid ${colors.sub};
    }
  }

  p {
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

export type ScreenImageProps = {
  id: string;
  title: string;
  url: string;
  selectImageId: string;
  handleSelectImage: (id: string) => void;
};

export const ScreenImage: React.FC<ScreenImageProps> = ({
  id,
  title,
  url,
  selectImageId = '',
  handleSelectImage,
}) => {
  console.log(selectImageId === id);
  return (
    <ScreenImageStyle
      onClick={() => handleSelectImage(id)}
      isSelected={selectImageId === id}
    >
      <p>{title}</p>
      <img src={url} />
    </ScreenImageStyle>
  );
};
