import styled, { css } from 'styled-components';

export const Label = styled.span`
  display: flex;
  align-items: center;
  margin-left: 8px;
  transition: color 0.1s;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  use-select: none;
`;

export const CheckboxElement = styled.div`
  position: relative;
  border-radius: 2px;
  box-sizing: border-box;
  flex-shrink: 0;
`;

export const Container = styled.div<{
  width?: number;
  height?: number;
  disabled: boolean;
  checked: number;
  size?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  active?: { fontWeight?: number; fontSize?: number; color?: string };
}>`
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  padding: 3px;
  display: flex;
  align-items: center;
  font-style: normal;
  cursor: pointer;
  user-select: none;

  ${Label} {
    color: ${({ color, active, checked }) => {
      return (checked && active?.color) || color || '#191919';
    }};
    font-size: ${({ fontSize, active, checked }) => {
      return `${(checked && active?.fontSize) || fontSize || 12}px`;
    }};
    font-weight: ${({ fontWeight, active, checked }) => {
      return `${(checked && active?.fontWeight) || fontWeight || 400}`;
    }};
  }

  ${CheckboxElement} {
    width: ${({ size }) => `${size ?? 12}px`};
    height: ${({ size }) => `${size ?? 12}px`};
    background-color: ${({ backgroundColor }) => backgroundColor || '#ffffff'};

    ${({ checked, borderColor, backgroundColor }) => {
      if (checked !== 0) {
        return css`
          background-color: #003288;
          border: 1px solid #003288;
        `;
      }
      return css`
        border: 1px solid ${borderColor || backgroundColor || '#a7a7a7'};
      `;
    }}
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: initial;
      ${CheckboxElement} {
        background-color: #f5f5f5;
        border: 1px solid #e6e6e6;
      }

      ${Label} {
        opacity: 0.3;
      }
    `}
`;
