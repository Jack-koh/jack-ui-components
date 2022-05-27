import React from 'react';
import classNames from 'classnames';
import { Validator } from '../validator/index';
import * as Comp from './Composition';
import { Container, InputContent, Item } from './Styled';
import { handlers } from './handlers';
import type { M_Auto } from './Types';
import Context from './Context';

export const initChoice = { isAllCheck: 0, include: [], exclude: [] };

type Styles = {
  width?: number | string;
  height?: number;
  itemHeight?: number;
};

interface Props<T> {
  rules?: ['required'];
  data?: M_Auto.Data<T>[];
  config: M_Auto.Config<T>;
  className?: string;
  disabled?: boolean;
  children: JSX.Element[];
  allCheck?: boolean;
  loading?: boolean;
  // style
  styles?: Styles;
  clickInside?: boolean;
}

interface State {
  focus: boolean;
  error: string;
}

export class AutoComplete<T> extends React.Component<Props<T>, State> {
  static contextType = Validator.Context;
  static Chip = Comp.Chip;
  static Total = Comp.Total;
  static Input = Comp.InputContainer;
  static Options = Comp.Options;
  static Item = Item;
  static handlers = handlers;
  static state = {
    data: [],
    loading: true,
    searchText: '',
    choice: initChoice,
    pagination: {
      rnum: 0,
      info: { current: 0, total: 0 },
      format: { limit: 30, offset: 0 },
    },
  };

  wrapperRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLDivElement> | null;
  constructor(props: Props<T>) {
    super(props);
    this.wrapperRef = React.createRef();
    this.inputRef = React.createRef();
    this.state = { focus: false, error: '' };
  }

  getSnapshotBeforeUpdate(prevProps: Props<T>, prevState: State): string {
    const { excute } = this.context as Validator.T_Context; // 발리데이터 컨텍스트
    const { rules, config } = prevProps;
    const { isAllCheck, include, exclude } = config.choice;

    let error = '';
    if (excute && rules) {
      if (!isAllCheck && ![...include, ...exclude].length) {
        error = '필수 정보입니다.';
        this.setState({ error });
      }
    }

    if (prevState.error && (isAllCheck || [...include, ...exclude].length)) {
      error = '';
      this.setState({ error });
    }

    return error;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(prevProps: Props<T>, prevState: State, snapshot: string): void {
    // console.log(snapshot);
  }

  focusHandler = (focus: boolean): void => {
    this.setState({ focus });
    const clickOutsideHandler = (e: MouseEvent) => {
      const target = this.wrapperRef.current;
      if (target && (target as HTMLElement).contains(e.target as Node)) return;
      this.setState({ focus: false });
    };
    document.onmousedown = clickOutsideHandler;
  };

  render(): JSX.Element {
    const { focus, error } = this.state;
    const {
      styles,
      className = '',
      disabled = false,
      children,
      data = [],
      config = { choice: initChoice, onChange: () => false, searchText: '' },
      allCheck,
      loading,
      clickInside,
    } = this.props;
    const value = {
      ...this.state,
      loading,
      target: this.inputRef,
      data,
      config,
      disabled,
      allCheck,
      clickInside,
    };
    const [first, second] = children;

    return (
      <Context.Provider value={{ ...value, setFocus: this.focusHandler }}>
        <Container
          {...styles}
          error={error}
          focus={focus}
          ref={this.wrapperRef}
          className={classNames('jack__autocomplete', {
            [className]: !!className,
          })}
        >
          <InputContent
            disabled={disabled}
            ref={this.inputRef}
            className={classNames('react_autocomplete__input__field')}
          >
            {first}
          </InputContent>
          {second}
          <Validator.Error error={error} top={40} />
        </Container>
      </Context.Provider>
    );
  }
}
