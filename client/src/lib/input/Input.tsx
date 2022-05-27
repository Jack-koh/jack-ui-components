/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useReducer } from 'react';
import classNames from 'classnames';
import { Validator, validator, Rules } from '../index';
import { produce } from 'immer';
import { Container, InputElement } from './styled';

export type Styles = {
  width?: number | string;
  height?: number | string;
  indent?: number;
  backgroundColor?: string;
  fontSize?: number;
  border?: string;
  color?: string;
  placeholderColor?: string;
  radius?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  margin?: string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  padding?: string;
  hover?: Partial<{
    backgroundColor?: string;
  }>;
  focus?: Partial<{
    backgroundColor?: string;
    borderColor?: string;
  }>;
};

export interface Props {
  type?: 'text' | 'password';
  className?: string;
  innerRef?: React.RefObject<HTMLInputElement> | null;
  // 발리데이터
  rules?: Rules[];
  validType?: 'realtime' | 'blur';
  error?: string | string[] | null;
  styles?: Styles;
  value?: string | number;
  // ...rest #################
  disabled?: boolean;
  placeholder?: string | undefined;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  keyEnter?: (value: string) => void;
  onClick?: () => void;
}

export type actions =
  | { type: 'value'; value: string }
  | { type: 'type'; value: string }
  | { type: 'error'; value: string | string[] };

export interface State {
  error: string | string[];
  value: string;
  type: string;
}

const initialState = { error: '', value: '', mount: false };
// prettier-ignore
const reducer = (state: State, action: actions): State => {
  return produce(state, (draft: State): void => {
    switch(action.type) {
      case 'error': draft['error'] = action.value; break;
      case 'value': draft['value'] = action.value; break;
      case 'type': draft['type'] = action.value; break;
    }
  });
};

export const Input: React.FC<Props> = (props): JSX.Element => {
  const [state, setState] = useReducer(reducer, initialState, (init) => ({
    ...init,
    value: props.value ? props.value.toString() : '',
    error: props.error ?? '',
    type: props.type ?? 'text',
  }));
  const validatorState = useContext(Validator.Context);
  const { excute } = validatorState;

  // Error 리셋
  useEffect(() => {
    if (props.error) setState({ type: 'error', value: props.error });
    if (state.error && !props.error) setState({ type: 'error', value: '' });
  }, [props.error]);

  // 외부 value 동기화
  useEffect(() => {
    if (props.value !== undefined) {
      setState({
        type: 'value',
        value: props.value ? props.value.toString() : '',
      });
      setState({ type: 'error', value: '' });
    }
  }, [props.value]);

  // 비활성화시 valid error 리셋
  useEffect(() => {
    if (props.disabled) setState({ type: 'error', value: '' });
  }, [props.disabled]);

  // EXCUTE EFFECT #############################################
  useEffect(() => {
    if (!props.error && excute && props.rules && !props.disabled) {
      const { validError } = validator.excute(props.rules, state.value);
      setState({ type: 'error', value: validError });
    }
  }, [excute]);

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && props.keyEnter) props.keyEnter(state.value);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState({ type: 'value', value });
    if (props.onChange) props.onChange(e);
    // REAL TIME VALID EFFECT #############################################
    const isRealtime = props.validType === 'realtime';
    if (isRealtime && props.rules) {
      const { validError } = validator.excute(props.rules, state.value);
      setState({ type: 'error', value: validError });
    }
    if (!isRealtime && !excute && state.error) setState({ type: 'error', value: '' }); // 리얼타임이 아닐시 에러가 없으면 error 초기화
  };

  const onBlurHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (props.validType === 'blur' && props.rules && !props.disabled) {
      const { validError: errorMessage } = validator.excute(props.rules, e.currentTarget.value);
      setState({ type: 'error', value: errorMessage });
    }
    if (props.onBlur) props.onBlur(e);
  };

  return (
    <Container
      {...props.styles}
      readOnly={props.readOnly}
      disabled={!!props.disabled}
      error={state.error}
      className={classNames('jack__input__container', {
        [props.className as string]: props.className,
        error: state.error,
      })}
    >
      <InputElement
        {...props}
        value={state.value}
        ref={props.innerRef}
        onChange={onChangeHandler}
        spellCheck="false"
        className="jack__input"
        type={state.type}
        onBlur={onBlurHandler}
        onKeyPress={onKeyPressHandler}
      />
      {props.type === 'password' && (
        <i
          className={classNames('input__pw__lock__icon', {
            open: !props.disabled && state.type === 'text',
            disabled: props.disabled,
          })}
          onClick={() => {
            if (!props.disabled) {
              setState({
                type: 'type',
                value: state.type === 'text' ? 'password' : 'text',
              });
            }
          }}
        />
      )}
      <Validator.Error error={state.error} top={props.styles?.height ?? 40} />
    </Container>
  );
};
