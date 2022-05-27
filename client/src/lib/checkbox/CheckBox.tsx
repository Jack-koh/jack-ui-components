import React, { useState } from 'react';
import classNames from 'classnames';
import { Container, CheckboxElement, Label } from './styled';

export interface Props {
  text?: string | JSX.Element;
  checked?: number;
  className?: string;
  disabled?: boolean;
  onChange?: (check: number) => void;
  // style
  styles?: {
    width?: number;
    height?: number;
    size?: number;
    fontSize?: number;
    color?: string;
    fontWeight?: number;
    backgroundColor?: string;
    borderColor?: string;
    active?: {
      fontWeight?: number;
      fontSize?: number;
      color?: string;
    };
  };
}

export const CheckBox: React.FC<Props> = ({
  text,
  checked,
  onChange,
  className = '',
  disabled = false,
  // style
  styles,
}): JSX.Element => {
  const [toggle, setToggle] = useState(checked ?? 0);
  const check = checked ?? toggle;

  const checkHandler = (e: React.UIEvent): void => {
    e.stopPropagation();
    if (disabled) return;
    const changeHandler = onChange ?? setToggle;
    changeHandler(check === 1 ? 0 : 1);
    if (onChange && !checked) setToggle(check === 1 ? 0 : 1);
  };

  return (
    <Container
      className={classNames('jack__checkbox__container', {
        [className]: className,
        checked: check === 1,
        indeter: check === 2,
        disabled: disabled,
      })}
      disabled={disabled}
      onClick={checkHandler}
      checked={check}
      {...styles}
    >
      <CheckboxElement className="jack__checkbox">
        {check === 1 && <div className="react-checkbox-check-icon" />}
        {check === 2 && <div className="react-checkbox-indeterminate-icon" />}
      </CheckboxElement>
      {text && <Label className="jack__checkbox__label">{text}</Label>}
    </Container>
  );
};
