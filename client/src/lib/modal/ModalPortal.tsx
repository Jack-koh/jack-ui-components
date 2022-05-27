import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';

import type { Modal_Content } from './Modal';

type IModalPortal = {
  children: Modal_Content;
  setToggle: (toggle: boolean) => void;
};

export const ModalPortal: React.FC<IModalPortal> = ({ children, setToggle }) => {
  const modalRoot = useMemo(() => document.createElement('div'), []);
  const root = document.querySelector('body') as HTMLBodyElement;

  useEffect(() => {
    modalRoot.id = 'jack__absolute__modal__wrapper';
    root.appendChild(modalRoot);
    return () => {
      root.removeChild(modalRoot);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CONTENT = children({ closeHandler: () => setToggle(false) });

  const PEELED_CONTENT = ((): JSX.Element => {
    if (typeof CONTENT.type === 'function') {
      const isClass = CONTENT.type.prototype?.render;
      return isClass ? CONTENT : CONTENT.type(CONTENT.props);
    } else return CONTENT;
  })();

  const CONTENT_ELEMENT = React.Children.map(PEELED_CONTENT, (child: JSX.Element): JSX.Element => {
    const { className, onClick } = child.props;
    return React.cloneElement(child, {
      className: classNames('jack__modal__portal', { [className]: className }),
      onClick: (e: React.UIEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClick) onClick();
      },
    });
  });

  return createPortal(
    <>
      {CONTENT_ELEMENT}
      <div className="jack__modal__background__screen" />
    </>,
    modalRoot
  );
};
