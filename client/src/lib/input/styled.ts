import styled, { css } from "styled-components";
import { margin, padding } from "../functions";
import { Styles } from "./Input";

export const InputElement = styled.input<{ type: string }>`
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
  font-family: inherit;
  ${({ type }) => {
    if (type === "password") {
      return css`
        padding-right: 36px !important;
      `;
    }
    return "";
  }}
`;

export const Container = styled.div<Styles & { readOnly?: boolean; disabled: boolean; error: string | string[] }>`
  position: relative;
  height: ${({ height }) => {
    if (typeof height === "string") return height;
    return `${height ?? 40}px`;
  }};
  width: ${({ width }) => {
    if (typeof width === "string") return width;
    return `${width ?? 300}px`;
  }};

  ${(props) => {
    return css`
      ${margin(props)}
      ${padding(props)}
    `;
  }}

  ${InputElement} {
    padding: ${({ indent }) => `0 ${indent ?? 14}px`};
    background-color: ${({ backgroundColor }) => backgroundColor ?? "#ffffff"};
    font-size: ${({ fontSize }) => `${fontSize ?? 14}px`};
    border: ${({ border }) => border ?? "1px solid #e6e6e6"};
    border-radius: ${({ radius }) => `${radius ?? 0}px`};
    color: ${({ color }) => color ?? "#191919"};
    line-height: ${({ height }) => `${height ?? 40}px`};
    width: 100%;
    height: 100%;

    &:hover {
      background-color: ${({ hover }) => hover?.backgroundColor};
    }

    &:focus {
      background-color: ${({ focus }) => focus?.backgroundColor};
      border-color: ${({ focus }) => focus?.borderColor};
    }

    &::placeholder {
      color: ${({ placeholderColor }) => placeholderColor ?? "#a5adba"};
      font-size: ${({ fontSize }) => `${fontSize ?? 14}px`};
    }
  }

  ${({ error }) => {
    const multiErr = Array.isArray(error);
    if ((error && !multiErr) || (multiErr && error.length)) {
      return css`
        ${InputElement} {
          border: 1px solid #ff5974;
        }
      `;
    }
    return "";
  }}

  ${({ disabled, readOnly }) => {
    if (disabled) {
      return css`
        ${InputElement} {
          background-color: #f5f5f5;
          color: #a5adba;
        }
      `;
    }

    if (readOnly) {
      return css`
        ${InputElement} {
          background-color: #f5f5f5;
        }
      `;
    }
    return "";
  }}
`;
