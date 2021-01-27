import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from './atom/button';

const RouterNavStyle = styled.div`
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-around;
`;

export const RouterNav: React.SFC = () => {
  return (
    <RouterNavStyle>
      <Link to="/">
        <Button text="Home" size="small" />
      </Link>
      <Link to="/About">
        <Button text="Setting" size="small" />
      </Link>
    </RouterNavStyle>
  );
};
