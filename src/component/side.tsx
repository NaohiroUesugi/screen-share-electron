import React from 'react';
import styled from 'styled-components';
import { LogHistory } from './log-history';
import { colors } from './atom/color';

const SideContent = styled.div`
  display: flex;
  width: 25rem;
  min-width: 15rem;
`;

const SideBorder = styled.div`
  height: 100%;
  width: 0.3rem;
  margin: 0;
  background-color: ${colors.side};
  cursor: col-resize;
`;

export const Side: React.SFC = () => {
  let width = 25;
  if (document.getElementById('side-content')) {
    document.getElementById('side-content').style.width = `${width}rem`;
  }
  const resizeSideBar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const { clientX: startX } = e;
    let deltaX = 0;
    const onMove = (e: MouseEvent) => {
      e.stopPropagation();
      const { clientX } = e;
      deltaX = (startX - clientX) / 10;
      document.getElementById('side-content').style.width = `${
        width + deltaX
      }rem`;
    };
    const onUp = (e: MouseEvent) => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      width = width + deltaX;
      e.stopPropagation();
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };
  return (
    <SideContent id="side-content">
      <SideBorder onMouseDown={resizeSideBar} />
      <LogHistory />
    </SideContent>
  );
};
