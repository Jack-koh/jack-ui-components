import React from 'react';
import classNames from 'classnames';
import { IoMdClose } from 'react-icons/io';
import styled, { css } from 'styled-components';
import { Button } from 'stories';
import './Layout.scss';

export const ModalContainer = styled.div`
  width: ${({ width }) => {
    if (typeof width === 'number') return `${width}px`;
    return width;
  }};

  .modal__content__form {
    position: relative;
    background-color: #fff;
    overflow: ${({ overflow }) => overflow || 'auto'};
    ${({ height }) => {
      if (height && height - 152 > 0) {
        return css`
          height: ${height - 152}px;
        `;
      }
      return '';
    }}

    ${({ maxHeight }) => {
      if (maxHeight) {
        return css`
          max-height: ${maxHeight}px;
        `;
      }
      return '';
    }}
  }
`;

export const Container = ({
  children,
  id,
  className = '',
  title = '타이틀을 입력하세요',
  closeHandler = () => false,
  submitHandler = () => false,
  disabled = false,
  // progress = false,
  // loading = false,
  header = null,
  footer = null,
  styles,
}) => {
  return (
    <ModalContainer
      id={id}
      {...styles}
      className={classNames('modal__basic__wrapper', { [className]: className })}
    >
      {header || (
        <div className="modal__header">
          <div className="modal__title">{title}</div>
          <IoMdClose className="close-btn" onClick={closeHandler} />
        </div>
      )}
      <div className="modal__content__form">
        {/* <Loading loading={loading} /> */}
        <div className="modal__content">{children}</div>
      </div>
      {footer || <Footer submitHandler={submitHandler} closeHandler={closeHandler} />}
    </ModalContainer>
  );
};

export const Footer = ({
  submitHandler = () => false,
  closeHandler = () => false,
  cancelText = 'Cancel',
  SaveText = 'Save',
}) => {
  return (
    <div className="modal__footer">
      <Button
        title={cancelText}
        onClick={closeHandler}
        styles={{ border: '1px solid #5e81f4', backgroundColor: '#fff', color: '#5e81f4' }}
      />
      <Button title={SaveText} onClick={submitHandler} />
    </div>
  );
};

export const ModalButton = ({ onClick, text = 'Click' }) => {
  return (
    <Button
      className="modal__btn"
      onClick={onClick}
      styles={{ backgroundColor: '#61bd4f', width: 80 }}
    >
      {text}
    </Button>
  );
};
