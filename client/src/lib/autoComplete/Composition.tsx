import React, { useContext, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Input, CheckBox, Loading } from '../index';
import positionHandler from './positionHandler';
import { OptionContent, ChipContent, NoData } from './Styled';
import { initChoice } from './AutoComplete';
import Context from './Context';

type IInputContainer = {
  className?: string;
  placeholder?: string;
  keyEnter?: (value: string) => void;
  children?: JSX.Element | null | boolean;
  height?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type OptionContainer = {
  className?: string;
  children: JSX.Element | JSX.Element[];
  height?: number | string;
};

export function Chip(): JSX.Element {
  const { config, data, disabled } = useContext(Context);
  const { choice, onChange, searchText } = config;
  return (
    <ChipContent className="autocomplite__chip__field">
      {!!choice.include.length && (
        <div className="autocomplete__chip">
          <div className="chip__title">{choice.include[0].title}</div>
          <i
            onClick={(): void | boolean =>
              !disabled &&
              onChange({
                searchText,
                choice: initChoice,
                data: data.map((el) => ({ ...el, selected: false })),
              })
            }
          />
        </div>
      )}
      {choice.include.length > 1 && <div className="autocomplete__chip__additional">+{choice.include.length - 1}</div>}
    </ChipContent>
  );
}

export function Total({ text }: { text?: (count: number) => string }): JSX.Element {
  const { config, disabled, data } = useContext(Context);
  const { choice, onChange, searchText } = config;
  const { isAllCheck, include, exclude } = choice;

  const counts = () => {
    const allCount = isAllCheck && ![...include, ...exclude].length;
    const inCount = include.length;
    const exCount = isAllCheck && exclude.length;
    const totalCount = data.length ? data[0].value.rnum : 0;

    if (allCount) return totalCount;
    if (inCount) return include.length;
    if (exCount) return totalCount - exclude.length;
    return 0;
  };

  return counts() ? (
    <ChipContent className="autocomplite__chip__field total">
      <div className="autocomplete__chip">
        <div className="chip__title">{text ? text(counts()) : ''}</div>
        <i
          onClick={(): void | boolean =>
            !disabled &&
            onChange({
              searchText,
              choice: initChoice,
              data: data.map((el) => ({ ...el, selected: false })),
            })
          }
        />
      </div>
    </ChipContent>
  ) : (
    <></>
  );
}

export const InputContainer = (props: IInputContainer): JSX.Element => {
  const { placeholder, keyEnter, children } = props;
  const { disabled, focus, data, setFocus, config } = useContext(Context);
  const { choice, onChange } = config;

  return (
    <>
      {children}
      <Input
        styles={{ width: 'calc(100% - 30px)', indent: 10, border: 'none', height: props.height ?? 32 }}
        className={classNames('autocomplete__search__input', { active: focus })}
        onFocus={() => {
          setFocus(true);
          if (props.onFocus) props.onFocus();
        }}
        onBlur={props.onBlur}
        placeholder={placeholder}
        disabled={disabled}
        keyEnter={keyEnter}
        onChange={(e) => {
          if (props.onChange) props.onChange(e);
          onChange({ choice, data, searchText: e.target.value });
        }}
      />
      <div
        className={classNames('select__arrow__icon', { active: focus })}
        onClick={(): boolean | void => !disabled && setFocus(!focus)}
      >
        <i />
      </div>
    </>
  );
};

function AllCheck() {
  const { config, data } = useContext(Context);
  const { choice, onChange, searchText } = config;

  const checked = () => {
    if (choice.isAllCheck && ![...choice.include, ...choice.exclude].length) return 1;
    if (![...choice.include, ...choice.exclude].length) return 0;
    return 2;
  };

  return (
    <div className="autocomplete__all__check">
      <CheckBox
        text="전체 선택"
        checked={checked()}
        onChange={(check) => {
          onChange({
            searchText,
            choice: { ...initChoice, isAllCheck: check },
            data: data.map((el) => ({ ...el, selected: !!check })),
          });
        }}
      />
    </div>
  );
}

export function Options({ className = '', children, height }: OptionContainer): JSX.Element {
  const { target, allCheck, data, loading, focus, setFocus, clickInside } = useContext(Context);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (focus && target && containerRef.current) {
      positionHandler({
        position: 'bottom',
        target,
        selectRoot: containerRef.current,
      });
    }
  }, [focus]);

  return focus ? (
    <OptionContent
      ref={containerRef}
      height={height}
      className={classNames('autocomplete__option__container', {
        [className]: className,
      })}
      onClick={() => {
        if (clickInside) setFocus(false);
      }}
    >
      {allCheck && <AllCheck />}
      <div className={classNames('autocomplete__list__grid', { allCheck })}>
        {loading && <Loading />}
        {data.length ? children : <NoData>데이터가 없습니다.</NoData>}
      </div>
    </OptionContent>
  ) : (
    <></>
  );
}
