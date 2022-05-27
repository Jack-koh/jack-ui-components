import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Menu } from './menu/Menu';
import { Poper } from './poper/Poper';

export type Content = (props: { closeHandler: () => void; open: boolean; target: HTMLElement }) => JSX.Element;
export interface Props {
  children: JSX.Element;
  content: Content;
  position?: string;
  className?: string;
  gap?: number;
  disabled?: boolean;
  clickInside?: boolean;
  clickOutside?: boolean;
}

export const Popover: React.FC<Props> = (props) => {
  const { children, disabled } = props;
  const [toggle, setToggle] = useState(false);
  const [mount, setMount] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const getChild = (): JSX.Element => {
    if (typeof children.type === 'function') {
      const isClass = /^class\s/.test(Function.prototype.toString.call(children.type)) // prettier-ignore
      return isClass ? children.type.prototype.render(children.props) : children.type(children.props);
    } else return children;
  };

  const CHILDREN = getChild();
  const CLONED_CHILDREN = React.Children.map(CHILDREN, (child: JSX.Element): JSX.Element => {
    const { className, onClick } = child.props;
    return React.cloneElement(child, {
      ref: targetRef,
      className: classNames('jack__popover__button', {
        [className]: className,
        open: toggle,
      }),
      onClick: (e: React.UIEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setToggle(!toggle);
        if (onClick) onClick();
      },
    });
  });

  useEffect(() => {
    setMount(true);
  }, []);

  const isMenu = targetRef.current?.closest('.jack__popover__wrapper');

  return mount && isMenu ? (
    <Menu {...props} target={targetRef.current} state={{ toggle, setToggle }}>
      <>{CLONED_CHILDREN}</>
    </Menu>
  ) : (
    <Poper {...props} target={targetRef.current} state={{ toggle, setToggle }}>
      <>{CLONED_CHILDREN}</>
    </Poper>
  );
};
