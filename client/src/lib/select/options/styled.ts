import styled, { css } from "styled-components";

export const Item = styled.div<{ active: boolean; disabled: boolean }>`
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  padding: 0 16px;
  white-space: nowrap;
  color: #191919;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: background-color 0.1s;
  border-radius: 7px;
  &:hover {
    background-color: #f5fbff;
  }

  ${({ active }) =>
    active &&
    css`
      font-weight: 900;
      color: #006dbc;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
      color: #c5c6ca;
      &:hover {
        background-color: #ffffff;
      }
    `}
`;

export const OptionsContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  overflow: auto;
`;
