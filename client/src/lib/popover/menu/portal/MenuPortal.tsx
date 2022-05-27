import React, { useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { debounce } from 'lodash';
import classNames from 'classnames';
import { Content } from '../../Popover';
import { ClickOutsideEffect } from '../../../functions';
import positionHandler from '../../positionHandler';

export interface MenuContentProps {
  children: Content;
  clickOutside?: boolean;
  clickInside?: boolean;
  className?: string;
  target: HTMLElement;
  root: HTMLElement;
  position: string;
  gap: number;
  state: {
    setToggle: (toggle: boolean) => void;
    toggle: boolean;
  };
}

const MenuContent: React.FC<MenuContentProps> = (props) => {
  const menuRoot = useMemo(() => document.createElement('div'), []);
  if (props.clickOutside) {
    ClickOutsideEffect({
      target: [props.root],
      toggle: props.state.toggle,
      close: () => props.state.setToggle(false),
    });
  }

  const CONTENT = props.children({
    closeHandler: () => props.state.setToggle(false),
    open: props.state.toggle,
    target: props.target,
  });

  const PEELED_CONTENT = ((): JSX.Element => {
    if (typeof CONTENT.type === 'function') {
      const isClass = CONTENT.type.prototype?.render;
      return isClass ? CONTENT : CONTENT.type(CONTENT.props);
    } else return CONTENT;
  })();

  const CONTENT_ELEMENT = React.Children.map(PEELED_CONTENT, (child: JSX.Element): JSX.Element => {
    const { className, onClick } = child.props;
    return React.cloneElement(child, {
      className: classNames('jack__menu__content', {
        [className]: className,
        open: props.state.toggle,
      }),
      onClick: (e: React.UIEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClick) onClick();
      },
    });
  });

  useEffect(() => {
    menuRoot.classList.add('jack__menu__wrapper');
    if (props.className) menuRoot.classList.add(props.className);

    const clickInsideHandler = debounce(() => props.state.setToggle(false), 0);
    const setPosition = (): void =>
      positionHandler({
        position: props.position,
        gap: props.gap,
        target: props.target,
        root: menuRoot,
      });

    if (props.state.toggle) {
      props.root.appendChild(menuRoot);
      setPosition();

      window.addEventListener('resize', setPosition); // 윈도우 리사이즈시 위치 다시 조정
      document.addEventListener('scroll', setPosition, true); // 다큐먼트 스크롤시 위치 다시 조정
      if (props.clickInside) menuRoot.addEventListener('click', clickInsideHandler, true);
    } else {
      if (props.root.contains(menuRoot)) props.root.removeChild(menuRoot);

      window.removeEventListener('resize', setPosition); // 윈도우 리사이즈시 위치 다시 조정
      document.removeEventListener('scroll', setPosition, true); // 다큐먼트 스크롤시 위치 다시 조정
      if (props.clickInside) menuRoot.removeEventListener('click', clickInsideHandler, true);
    }

    return () => {
      clickInsideHandler.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.state.toggle]);

  return createPortal(CONTENT_ELEMENT, menuRoot);
};

export default MenuContent;
