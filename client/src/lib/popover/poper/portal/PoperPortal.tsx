import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { debounce } from 'lodash';
import { ClickOutsideEffect } from '../../../functions';
import classNames from 'classnames';
import { Content } from '../../Popover';
import positionHandler from '../../positionHandler';

export interface PortalProp {
  children: Content;
  clickOutside?: boolean;
  clickInside?: boolean;
  className?: string;
  target: HTMLElement;
  position: string;
  gap: number;
  state: {
    setToggle: (toggle: boolean) => void;
    toggle: boolean;
  };
}

const PoperPortal: React.FC<PortalProp> = (props): JSX.Element => {
  const root = document.querySelector('body') as HTMLBodyElement;
  const popoverRoot = useMemo(() => document.createElement('div'), []);
  if (props.clickOutside) {
    ClickOutsideEffect({
      target: [props.target, popoverRoot],
      toggle: props.state.toggle,
      close: () => props.state.setToggle(false),
    });
  }

  useEffect(() => {
    popoverRoot.classList.add('jack__popover__wrapper');
    if (props.className) popoverRoot.classList.add(props.className);

    const clickInsideHandler = debounce(() => props.state.setToggle(false), 0);
    const setPosition = (): void =>
      positionHandler({
        position: props.position,
        gap: props.gap,
        target: props.target,
        root: popoverRoot,
      });

    if (props.state.toggle) {
      root.appendChild(popoverRoot);
      setPosition();

      window.addEventListener('resize', setPosition); // 윈도우 리사이즈시 위치 다시 조정
      document.addEventListener('scroll', setPosition, true); // 다큐먼트 스크롤시 위치 다시 조정
      if (props.clickInside) popoverRoot.addEventListener('click', clickInsideHandler, true);
    } else {
      if (root.contains(popoverRoot)) root.removeChild(popoverRoot);

      window.removeEventListener('resize', setPosition); // 윈도우 리사이즈시 위치 다시 조정
      document.removeEventListener('scroll', setPosition, true); // 다큐먼트 스크롤시 위치 다시 조정
      if (props.clickInside) popoverRoot.removeEventListener('click', clickInsideHandler, true);
    }

    return () => {
      clickInsideHandler.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.state.toggle]);

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
      className: classNames('jack__popover__content', {
        [className]: className,
      }),
      onClick: (e: React.UIEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClick) onClick();
      },
    });
  });

  return createPortal(CONTENT_ELEMENT, popoverRoot);
};

export default PoperPortal;
