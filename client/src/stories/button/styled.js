import styled, { css } from 'styled-components';
import { margin } from 'stories/functions';

export const Context = styled.div`
  position: relative;
  z-index: 10;
  letter-spacing: -0.14px;
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center;
`;

export const Screen = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transition: background-color 0.2s;
`;

export const ButtonElement = styled.button`
  position: relative;
  display: block;
  font-family: inherit;
  width: ${({ width }) => {
    if (typeof width === 'string') return width;
    return `${width ?? 100}px`;
  }};
  height: ${({ height }) => `${height ?? 36}px`};
  border-radius: ${({ radius }) => `${radius ?? 5}px`};
  background-color: ${({ backgroundColor }) => backgroundColor ?? '#5e81f4'};
  border: ${({ border }) => border ?? 'none'};
  outline: none;
  overflow: hidden;
  user-select: none;
  padding: 0 10px;
  cursor: pointer;

  ${(props) => {
    return css`
      ${margin(props)}
    `;
  }}

  &:hover {
    ${Screen} {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  &:active {
    ${Screen} {
      background-color: rgba(0, 0, 0, 0.1);
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
