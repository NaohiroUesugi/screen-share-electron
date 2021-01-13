import React from 'react';
import styled from 'styled-components';

const ScreenImageStyle = styled.div<{ isSelected: boolean }>`
  img {
    filter: ${({ isSelected }) =>
      isSelected ? 'brightness(1)' : 'brightness(0.7)'};
    width: 500px;
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
      <img src={url} />
      <p>{title}</p>
    </ScreenImageStyle>
  );
};
