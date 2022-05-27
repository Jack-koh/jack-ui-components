import styled, { css } from 'styled-components';

export type Styles = {
  width?: number | string;
};

export const InputContent = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 40px;
  padding: 2px 4px;
  border: 1px solid #e6e6e6;
  transition: border-color 0.3s;
  box-sizing: border-box;
  transition: all 0.2s ease;

  ${({ disabled }) => {
    if (disabled) {
      return css`
        background-color: #f5f5f5;
        color: #a5adba;
      `;
    }
    return '';
  }}
`;

export const OptionContent = styled.div<{ height?: number | string }>`
  height: ${({ height }) => {
    if (typeof height === 'string') return height;
    return `${height ? height + 2 : 202}px`;
  }};
  z-index: 20;
  width: 100%;
  position: absolute;
  padding: 4px 0;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: auto;
`;

export const ChipContent = styled.div`
  display: flex;
  align-items: center;
  max-width: calc(100% - 36px);
  height: 28px;
  line-height: 28px;
`;

export const Item = styled.div<{ active?: boolean; height?: number }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${({ height }) => `${height ?? 40}px`};
  padding: 0 12px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ active }) => (active ? '#006dbc' : '#1d1d1d')};
  font-weight: ${({ active }) => (active ? '700' : '400')};
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f5fbff;
  }

  .jack__checkbox__container {
    width: 100%;
    height: 100%;
  }
`;

type ContainerContent = Styles & {
  disabled?: boolean;
  focus: boolean;
  error?: string;
};
export const Container = styled.div<ContainerContent>`
  position: relative;
  width: ${({ width }) => `${width ? `${width}px` : '100%'}`};
  transition: background-color 0.3s ease;

  ${({ disabled, focus, error }) => {
    if (disabled) {
      return css`
        background-color: #f5f5f5;
        ${InputContent} {
          .select__arrow__icon {
            cursor: initial;
          }
        }
        ${ChipContent} {
          .autocomplete__chip {
            background-color: #d1d1d1 !important;
          }

          .autocomplete__chip__additional {
            background-color: #d1d1d1 !important;
          }
        }
      `;
    }

    if (focus) {
      return css`
        ${InputContent} {
          border-color: #9fd9f6;
        }
      `;
    }

    if (error) {
      return css`
        ${InputContent} {
          border-color: #ff5974;
        }
      `;
    }

    return '';
  }}
`;

export const NoData = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #a7a7a7;
`;
