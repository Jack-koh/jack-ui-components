import styled, { css } from "styled-components";
import { Styles } from "./Select";
import { OptionsContainer, Item } from "./options/styled";

export const Toggle = styled.div<{ selected: boolean; active: boolean; error: string }>`
  color: ${({ selected }) => (selected ? "#191919" : "#c5c6ca")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 14px;
  border: 1px solid #e6e6e6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  use-select: none;

  .button__title {
    width: calc(100% - 20px);
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${({ active, error }) => {
    if (active) {
      return css`
        border: 1px solid #9fd9f6;
      `;
    }

    if (error) {
      return css`
        border: 1px solid #ff5974;
      `;
    }
    return "";
  }}
`;

export const SelectContainer = styled.div<Styles & { disabled: boolean; error: string }>`
  position: relative;
  width: ${({ width }) => (typeof width === "string" ? width : `${width ?? 300}px`)};
  height: ${({ height }) => `${height ?? 40}px`};
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;

  ${Toggle} {
    font-size: ${({ fontSize }) => `${fontSize ?? 13}px`};
    line-height: ${({ height }) => `${height ?? 40}px`};
    font-weight: ${({ fontWeight }) => `${fontWeight ?? 400}`};
    border-radius: ${({ radius }) => `${radius ?? 4}px`};
  }

  ${OptionsContainer} {
    border-radius: ${({ radius }) => `${radius ?? 4}px`};
    height: ${({ optionsHeight }) => {
      if (typeof optionsHeight === "string") return optionsHeight;
      return `${optionsHeight ? optionsHeight + 2 : 202}px`;
    }};

    ${Item} {
      height:${({ itemHeight }) => {
        return itemHeight ? `${itemHeight}px` : "auto";
      }}
  }

  ${({ disabled }) => {
    if (disabled) {
      return css`
        background-color: #f5f5f5;
        cursor: initial;
        ${Toggle} {
          color: #a5adba;
        }
      `;
    }
    return "";
  }}
`;
