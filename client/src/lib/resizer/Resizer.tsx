import React, { useRef } from 'react';
import classNames from 'classnames';

interface Props {
  children: JSX.Element;
  min?: number;
  max?: number;
  position?: 'right' | 'left' | 'bottom' | 'top';
  init?: number;
}

export const Resizer: React.FC<Props> = ({ children, position = 'right', min = 360, max = 448, init }) => {
  const targetRef = useRef<HTMLElement>(null);
  const Resize = (e: MouseEvent): void => {
    if (targetRef.current) {
      const target = targetRef.current;
      const rect = target.getBoundingClientRect();

      if (position === 'right' || position === 'left') {
        document.body.classList.add('col-resizing');
        const size = position === 'right' ? e.clientX - rect.left : rect.left - e.clientX;
        if (min <= size && size < max) target.style.width = `${size}px`;
        if (size > max) target.style.width = `${max}px`;
        if (size < min) target.style.width = `${min}px`;
      } else if (position === 'bottom' || position === 'top') {
        document.body.classList.add('row-resizing');
        const size = position === 'bottom' ? e.clientY - rect.top : rect.bottom - e.clientY;
        if (min <= size && size < max) target.style.height = `${size}px`;
        if (size > max) target.style.height = `${max}px`;
        if (size < min) target.style.height = `${min}px`;
      }
    }
  };

  const stopResize = (): void => {
    document.body.removeAttribute('class');
    window.removeEventListener('mousemove', Resize, false);
    window.removeEventListener('mouseup', stopResize, false);
  };

  const resizeHandler = (): void => {
    window.addEventListener('mousemove', Resize, false);
    window.addEventListener('mouseup', stopResize, false);
  };

  const resizerEl = React.createElement(
    'div',
    { className: `custom-resizer ${position}`, onMouseDown: resizeHandler },
    React.createElement('div', { className: `resizer-grap` }, React.createElement('div', { className: 'hover-action' }))
  );

  const CHILDREN = ((): JSX.Element => {
    return typeof children.type === 'function' ? children.type(children.props) : children;
  })();
  const cloneEl = React.Children.map(CHILDREN, (child: JSX.Element): JSX.Element => {
    const { className } = child.props;
    const style =
      position === 'right' || position === 'left'
        ? { minWidth: `${min}px`, maxWidth: `${max}`, width: init }
        : { minHeight: `${min}px`, maxheight: `${max}`, height: init };

    return React.cloneElement(
      child,
      {
        style,
        ref: targetRef,
        className: classNames('custom__resize__wrapper', {
          [className]: className,
        }),
      },
      CHILDREN.props.children,
      resizerEl
    );
  });

  return <>{cloneEl}</>;
};
