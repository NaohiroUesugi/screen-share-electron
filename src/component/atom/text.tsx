import styled from 'styled-components';
import { Size } from '../../types/common';

export const Text = styled.p<{ size?: Size }>`
  margin: 0;
  font-size: ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return '2rem';
      case 'medium':
        return '3rem';
      case 'large':
        return '4rem';
    }
  }};
  font-weight: bold;
  color: #2c3f55;
`;
