import styled from 'styled-components';
import { Size } from '../../types/common';
import { colors } from './color';

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
  color: ${colors.item};
`;
