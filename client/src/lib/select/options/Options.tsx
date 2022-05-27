import React, { useEffect, useRef } from 'react';
import type { M_Select } from '../Select';
import { OptionsContainer, Item } from './styled';
import positionHandler from './positionHandler';
import classNames from 'classnames';

interface Props {
  options: M_Select[];
  target: HTMLElement;
  selected: M_Select | null;
  onChangeHandler: (item: M_Select) => void;
  position: 'bottom' | 'top';
}
const Options: React.FC<Props> = ({ options, target, selected, onChangeHandler, position }): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      positionHandler({ position, target, selectRoot: containerRef.current });
    }
  }, [containerRef]);

  return (
    <OptionsContainer ref={containerRef} className="jack__select__options">
      {options.map((item: M_Select, index): JSX.Element => {
        const { value, disabled = false } = item;
        const active = selected?.value === value;
        return (
          <Item
            key={index}
            active={active}
            disabled={disabled}
            className={classNames('jack__select__item', { active, disabled })}
            onClick={(): void => {
              if (!item.disabled) onChangeHandler(item);
            }}
          >
            {item.title}
          </Item>
        );
      })}
    </OptionsContainer>
  );
};

export default Options;
