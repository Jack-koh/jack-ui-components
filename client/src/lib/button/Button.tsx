import React from 'react';
import classNames from 'classnames';
import { Proccessing } from '../loading/Loading';
import { ButtonElement, Context } from './styled';

export type Styles = {
  width?: number | string;
  height?: number;
  radius?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  margin?: string;
  backgroundColor?: string;
  color?: string;
  fontWeight?: number;
  fontSize?: number;
  align?: string;
  border?: string;
  hover?: Partial<{
    backgroundColor?: string;
    color?: string;
    border?: string;
  }>;
  active?: Partial<{
    backgroundColor?: string;
    color?: string;
    border?: string;
  }>;
};
export interface Props {
  type?: 'button' | 'submit';
  text?: string;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  children?: JSX.Element | JSX.Element[];
  onClick?: (e: React.UIEvent) => void;
  // style rest ########################
  styles?: Styles;
}

export const Button: React.FC<Props> = ({
  type = 'button',
  text = 'Button',
  disabled = false,
  onClick = () => false,
  className = '',
  loading,
  children,
  styles,
  // named buttons
  ...rest
}): JSX.Element => {
  const onClickHandler = (e: React.UIEvent) => {
    if (!loading) onClick(e);
  };
  return (
    <ButtonElement
      {...styles}
      {...rest}
      type={type}
      disabled={disabled}
      onClick={onClickHandler}
      className={classNames('jack__button', { [className]: !!className, disabled })}
    >
      {loading ? <Proccessing /> : <Context> {children || text} </Context>}
    </ButtonElement>
  );
};
