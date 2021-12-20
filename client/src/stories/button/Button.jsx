import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ButtonElement, Context, Screen } from './styled';
import './Button.scss';

// export type Styles = {
//   width?: number | string,
//   height?: number,
//   radius?: number,
//   marginTop?: number,
//   marginBottom?: number,
//   marginLeft?: number,
//   marginRight?: number,
//   margin?: string,
//   backgroundColor?: string,
//   color?: string,
//   fontWeight?: number,
//   fontSize?: number,
//   align?: string,
//   border?: string,
//   hover?: Partial<{ backgroundColor?: string, color?: string, border?: string }>,
//   active?: Partial<{ backgroundColor?: string, color?: string, border?: string }>,
// };
// export interface Props extends NamedButton {e
//   type?: 'button' | 'submit';
//   text?: string;
//   loading?: boolean;
//   className?: string;
//   disabled?: boolean;
//   children?: JSX.Element | JSX.Element[];
//   onClick?: (e: React.UIEvent) => void;
//   // style rest ########################
//   styles?: Styles;
// }

const Proccessing = () => {
  return (
    <div className="proccessing__loding__type">
      <div className="on__proccessing">
        <div className="rect__aling_1" />
        <div className="rect__aling_2" />
        <div className="rect__aling_3" />
        <div className="rect__aling_4" />
        <div className="rect__aling_5" />
      </div>
    </div>
  );
};

export const Button = (props) => {
  const onClickHandler = (e) => {
    if (!props.loading) props.onClick(e);
  };

  return (
    <ButtonElement
      {...props.styles}
      type={props.type}
      disabled={props.disabled}
      onClick={onClickHandler}
      className={classNames('jk__button', { [props.className]: !!props.className })}
    >
      <Screen />
      {props.loading ? <Proccessing /> : <Context> {props.title || props.children} </Context>}
    </ButtonElement>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  styles: PropTypes.object,
};

Button.defaultProps = {
  type: 'button',
  title: undefined,
  loading: false,
  disabled: false,
  className: undefined,
  onClick: undefined,
  children: undefined,
  styles: undefined,
};
