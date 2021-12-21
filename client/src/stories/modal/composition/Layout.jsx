import React from "react";
import classNames from "classnames";
import { IoMdClose } from "react-icons/io";
import styled, { css } from "styled-components";
import { Button } from "stories";
import PropTypes from "prop-types";
import "./Layout.scss";

export const ModalContainer = styled.div`
  width: ${({ width }) => {
    if (typeof width === "number") return `${width}px`;
    return width;
  }};

  .modal__content__form {
    position: relative;
    background-color: #fff;
    overflow: ${({ overflow }) => overflow || "auto"};
    ${({ height }) => {
      if (height && height - 152 > 0) {
        return css`
          height: ${height - 152}px;
        `;
      }
      return "";
    }}

    ${({ maxHeight }) => {
      if (maxHeight) {
        return css`
          max-height: ${maxHeight}px;
        `;
      }
      return "";
    }}
  }
`;

export const Container = (props) => {
  return (
    <ModalContainer
      {...props.styles}
      className={classNames("modal__basic__wrapper", {
        [props.className]: props.className,
      })}
    >
      {props.header || (
        <div className="modal__header">
          <div className="modal__title">{props.title}</div>
          <IoMdClose className="close-btn" onClick={props.closeHandler} />
        </div>
      )}
      <div className="modal__content__form">
        <div className="modal__content">{props.children}</div>
      </div>
      {props.footer || (
        <Footer
          cancelText={props.cancelText}
          saveText={props.saveText}
          disabled={props.disabled}
          loading={props.loading}
          submitHandler={props.submitHandler}
          closeHandler={props.closeHandler}
        />
      )}
    </ModalContainer>
  );
};

Container.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  title: PropTypes.string,
  closeHandler: PropTypes.func,
  submitHandler: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  header: PropTypes.element,
  footer: PropTypes.element,
  styles: PropTypes.object,
  cancelText: PropTypes.string,
  saveText: PropTypes.string,
};

Container.defaultProps = {
  children: undefined,
  className: "",
  title: "타이틀을 입력하세요",
  closeHandler: () => false,
  submitHandler: () => false,
  disabled: false,
  loading: false,
  header: null,
  footer: null,
  styles: {},
  cancelText: "Cancel",
  saveText: "Save",
};

export const Footer = (props) => {
  return (
    <div className="jk__modal__footer">
      <Button
        title={props.cancelText}
        onClick={props.closeHandler}
        styles={{
          border: "1px solid #5e81f4",
          backgroundColor: "#fff",
          color: "#5e81f4",
        }}
      />
      <Button
        disabled={props.disabled}
        title={props.saveText}
        loading={props.loading}
        onClick={props.submitHandler}
      />
    </div>
  );
};

Footer.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  cancelText: PropTypes.string,
  saveText: PropTypes.string,
  closeHandler: PropTypes.func,
  submitHandler: PropTypes.func,
};

Footer.defaultProps = {
  disabled: false,
  loading: false,
  submitHandler: () => false,
  closeHandler: () => false,
  cancelText: "Cancel",
  saveText: "Save",
};

export const ModalButton = (props) => {
  return (
    <Button
      className="modal__btn"
      onClick={props.onClick}
      styles={{ backgroundColor: "#61bd4f", width: 80 }}
    >
      {props.text}
    </Button>
  );
};

ModalButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

ModalButton.defaultProps = {
  onClick: () => false,
  text: "Click",
};
