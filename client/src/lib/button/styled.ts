import styled, { css } from 'styled-components';
import { margin } from '../functions';
import type { Styles } from './Button';

export const Context = styled.div`
  letter-spacing: -0.14px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

export const ButtonElement = styled.button<Styles>`
  position: relative;
  display: block;
  line-height: initial;
  font-family: inherit;
  width: ${({ width }) => {
    if (typeof width === 'string') return width;
    return `${width ?? 120}px`;
  }};
  height: ${({ height }) => `${height ?? 40}px`};
  border-radius: ${({ radius }) => `${radius ?? 5}px`};
  background-color: ${({ backgroundColor }) => backgroundColor ?? '#003288'};
  border: ${({ border }) => border ?? 'none'};
  outline: none;
  overflow: hidden;
  user-select: none;
  padding: 0 10px;
  cursor: pointer;
  transition: background-color 0.2s;

  ${(props) => {
    return css`
      ${margin(props)}
    `;
  }}

  &:hover {
    background-color: ${({ hover }) => hover?.backgroundColor};
    border: ${({ hover }) => hover?.border};
    ${Context} {
      color: ${({ hover }) => hover?.color};
    }
  }

  &:active {
    background-color: ${({ active }) => active?.backgroundColor};
    border: ${({ active }) => active?.border};
    ${Context} {
      color: ${({ active }) => active?.color};
    }
  }

  ${Context} {
    font-size: ${({ fontSize }) => `${fontSize || 14}px`};
    color: ${({ color }) => color || '#f5f5f5'};
    font-weight: ${({ fontWeight }) => fontWeight ?? 700};
    justify-content: ${({ align }) => align || 'center'};
  }

  ${({ disabled }) => {
    if (disabled) {
      return css`
        cursor: initial;
        background-color: #e6e6e6;
        opacity: 0.5;
        &:hover {
          background-color: #e6e6e6;
          ${Context} {
            color: #c5c6ca;
          }
        }
        ${Context} {
          color: #c5c6ca;
        }
      `;
    }

    return '';
  }}
`;
