import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { AccordionContainer, AccordionButton, AccordionOptions } from './styled';

export interface Props {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  title: string | JSX.Element;
  active?: boolean;
  toggleOnRow?: boolean;
  onClick?: () => void;
}

export const Accordion: React.FC<Props> = ({ title, className = '', active, toggleOnRow, onClick, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!mount) setMount(true);
  }, [mount]);

  const toggleOnRowHandler = (): void => {
    if (toggleOnRow && onClick) onClick();
  };

  const toggleOnButtonHandler = (): void => {
    if (!toggleOnRow && onClick) onClick();
  };

  const childClone = () => {
    const result = React.Children.map(children, (child: JSX.Element): JSX.Element | null => {
      return !child.props.disabled ? React.cloneElement(<div className="accordion__item">{child}</div>) : null;
    });
    return <div className="accordion__item__wrapper">{result}</div>;
  };

  const maxHeight = !active ? 0 : contentRef.current?.scrollHeight ?? 0;

  return (
    <AccordionContainer
      className={classNames('jack__accordion__section', {
        [className]: className,
      })}
    >
      <AccordionButton
        onClick={toggleOnRowHandler}
        className={classNames('jack__accordion_button', { active, button: toggleOnRow })}
      >
        <>
          {title}
          <i
            className={classNames('accordion__arrow__icon', { button: !toggleOnRow })}
            onClick={toggleOnButtonHandler}
          />
        </>
      </AccordionButton>
      <AccordionOptions ref={contentRef} className="accordion__content" maxHeight={maxHeight}>
        {childClone()}
      </AccordionOptions>
    </AccordionContainer>
  );
};
