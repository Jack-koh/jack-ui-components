import React, { createContext, useState, useContext, useCallback, useEffect, useRef, Dispatch } from 'react';
import { Button, Styles } from '../button/Button';
import classNames from 'classnames';
import styled from 'styled-components';
import { debounce } from 'lodash';

const debounceGetError = debounce((target, resolve) => {
  const errorList = target.getElementsByClassName('jack__validator__error__message');
  if (![...errorList].length) resolve(true);
}, 0);
const getErrorElements = (target: HTMLElement): Promise<boolean> =>
  new Promise((resolve) => {
    debounceGetError(target, resolve);
  });

// Validator Context ###############################################
export type T_Context = {
  excute: boolean;
  setExcute: Dispatch<boolean>;
  loading: boolean;
  setLoading: Dispatch<boolean>;
  isForm: boolean;
};

export const Context = createContext<T_Context>({
  excute: false,
  setExcute: () => false,
  loading: false,
  setLoading: () => false,
  isForm: false,
});

// Validator Provier ###############################################
interface Props {
  onSubmit: () => void;
  children: React.ReactNode;
  form?: boolean;
  className?: string;
  id?: string;
}
export const Provider = (props: Props): JSX.Element => {
  const [excute, setExcute] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isForm] = useState(!!props.form);
  const validatorRef = useRef(null);
  // prettier-ignore
  const submitHandler = useCallback((target: HTMLElement) =>
      getErrorElements(target)
      .then((result) => {
        if(result) props.onSubmit()
        debounceGetError.cancel()
      }),
    [props.onSubmit]
  );

  useEffect(() => {
    if (excute) {
      if (validatorRef.current) submitHandler(validatorRef.current);
      setExcute(false);
    }
  }, [excute, props.onSubmit, submitHandler]);

  return (
    <Context.Provider value={{ excute, setExcute, loading, setLoading, isForm }}>
      {props.form ? (
        <form
          ref={validatorRef}
          id={props.id}
          className={classNames('validator__form', { [props.className as string]: props.className })}
          onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
            e.preventDefault();
            setExcute(true);
          }}
        >
          {props.children}
        </form>
      ) : (
        <div
          ref={validatorRef}
          id={props.id}
          className={classNames('validator__form', { [props.className as string]: props.className })}
        >
          {props.children}
        </div>
      )}
    </Context.Provider>
  );
};

// Validator Submit ###############################################
export const Submit: React.FC<{
  loading?: boolean;
  text: string;
  className?: string;
  disabled?: boolean;
  // style rest ########################
  styles?: Styles;
}> = ({ loading, text, className = '', styles, disabled }): JSX.Element => {
  const state = useContext(Context);
  const { setExcute, isForm } = state;

  return (
    <Button
      styles={styles}
      className={classNames('jack__validator__button', { [className]: className })}
      type={isForm ? 'submit' : 'button'}
      text={text}
      loading={loading}
      disabled={disabled}
      onClick={(): void => {
        if (!loading && !isForm && !disabled) setExcute(true);
      }}
    />
  );
};

// Error 컴포넌트
const ErrorMessage = styled.div<{ top: number | string }>`
  white-space: nowrap;
  padding: 8px 10px;
  position: absolute;
  left: 0;
  top: ${({ top }) => {
    if (typeof top === 'string') return top;
    return `${top + 4}px`;
  }};
  background-color: #0c2b61;
  font-size: 11px;
  border-radius: 2px;
  color: #fff;
  z-index: 10;
  & > div {
    line-height: 20px;
  }
`;

export const Error: React.FC<{
  error: string | string[];
  top?: number | string;
}> = ({ error, top = 32 }) => {
  if (!error) return <></>;
  if (Array.isArray(error) && !error.length) return <></>;

  return (
    <ErrorMessage className="jack__validator__error__message" top={top}>
      {typeof error === 'string' ? error : error.map((item, index) => <div key={index}>{item}</div>)}
    </ErrorMessage>
  );
};
