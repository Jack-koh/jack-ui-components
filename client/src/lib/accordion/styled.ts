import styled, { css } from 'styled-components';

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccordionButton = styled.div`
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  font-size: 13px;
  color: #444;
  transition: background-color 0.6s ease;
  padding: 0 10px;
  &.button {
    cursor: pointer;
  }
`;

export const AccordionOptions = styled.div<{ maxHeight: number }>`
  background-color: #f5f5f5;
  overflow: hidden;
  transition: max-height 0.3s ease;
  max-height: ${({ maxHeight }) => `${maxHeight}px`};
`;
