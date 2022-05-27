import React, { useRef, useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { ClickOutsideEffect } from '../functions';
import { Validator, validator, Rules } from '../validator';
import { SelectContainer, Toggle } from './styled';
import Options from './options/Options';

export type M_Select = {
  title: string | number | JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  disabled?: boolean;
};

export type Styles = {
  width?: number | string;
  radius?: number;
  fontSize?: number;
  fontWeight?: number;
  height?: number;
  itemHeight?: number;
  optionsHeight?: number | string;
};

export interface Props {
  options?: M_Select[];
  onChange?: (item: any) => void;
  className?: string;
  selected?: M_Select | null;
  placeholder?: string;
  disabled?: boolean;
  position?: 'bottom' | 'top';
  rules?: Rules[];
  // style
  styles?: Styles;
  error?: string | null;
}

export const Select: React.FC<Props> = ({
  options = [],
  onChange = () => false,
  className = '',
  position = 'bottom',
  selected = { title: '', value: '' },
  placeholder = '선택값을 입력하세요',
  ...rest
}): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(rest.error ?? '');
  const disabled = rest.disabled || !options.length;
  const open = !!options.length && toggle && !disabled && targetRef.current;
  const validatorState = useContext(Validator.Context);
  const { excute } = validatorState;

  const onChangeHandler = (item: M_Select): void => {
    if (disabled) return;
    onChange(item);
    if (error) setError('');
  };

  ClickOutsideEffect({ target: wrapperRef.current, toggle, close: () => setToggle(false) });

  useEffect(() => {
    if (disabled) setError('');
  }, [disabled]);

  // EXCUTE EFFECT #############################################
  useEffect(() => {
    if (!rest.error && excute && rest.rules && !disabled) {
      const { validError } = validator.excute(rest.rules, selected?.title.toString() ?? '-');
      setError(validError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [excute]);

  // Error 리셋
  useEffect(() => {
    if (rest.error) setError(rest.error);
    if (error && !rest.error) setError('');
  }, [rest.error]);

  return (
    <SelectContainer
      {...rest.styles}
      disabled={disabled}
      error={error}
      ref={wrapperRef}
      className={classNames('jack__select', {
        [className]: className,
        disabled,
      })}
      onClick={(): boolean | void => !disabled && setToggle(!toggle)}
    >
      <Toggle
        ref={targetRef}
        className={classNames('jack__select__button', { active: toggle })}
        selected={!!selected?.title}
        active={toggle}
        error={error}
      >
        <div className="button__title">{selected?.title || placeholder}</div>
        <div className="jack__select__arrow__icon" />
      </Toggle>
      {open && (
        <Options
          position={position}
          target={targetRef.current as HTMLDivElement}
          options={options}
          selected={selected}
          onChangeHandler={onChangeHandler}
        />
      )}
      <Validator.Error error={error} top={rest.styles?.height ?? 40} />
    </SelectContainer>
  );
};
