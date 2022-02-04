import React from "react";
import styled, { css } from "styled-components";
import { margin } from "stories/functions";
import PropTypes from "prop-types";
import "./Preview.scss";

// type Styles = {
//   width?: number,
//   height?: number,
//   border?: string,
//   margin?: string,
//   marginTop?: number,
//   marginBottom?: number,
//   marginLeft?: number,
//   marginRight?: number,
// };

const Container = styled.div`
  padding: 4px;
  border: ${({ border }) => border ?? "1px solid #e6e6e6"};
  overflow: auto;

  ${(props) => {
    return css`
      ${margin(props)}
    `;
  }}

  ${({ width }) => {
    if (width)
      return css`
        width: ${width}px;
      `;

    return "";
  }}

  ${({ height }) => {
    if (height)
      return css`
        height: ${height}px;
      `;

    return "";
  }}
`;

const Chip = styled.div`
  display: flex;
  align-items: center;
  background-color: #edf4f8;
  height: 32px;
  padding: 2px 14px;
  margin: 4px 4px;
  color: #006dbc;
  font-weight: 900;
  border-radius: 20px;
  font-size: 14px;
`;

// interface Props<T> {
//   data?: { title: string, value: T }[];
//   removeHandler?: (item: Any, index: number) => void;
//   styles?: Styles;
// }

export function Preview(props) {
  return (
    <Container {...props.styles} className="preview__chip__container">
      <div className="preview__chip__list">
        {props.data.map((item, index) => {
          return (
            <Chip key={index} className="preview__chip">
              {item.title}
              <i
                className="cancel-button"
                onClick={() => props.removeHandler(item.value, index)}
              />
            </Chip>
          );
        })}
      </div>
    </Container>
  );
}

Preview.propTypes = {
  data: PropTypes.array,
  removeHandler: PropTypes.func,
  styles: PropTypes.object,
};

Preview.defaultProps = {
  data: [],
  removeHandler: () => false,
  styles: {},
};
