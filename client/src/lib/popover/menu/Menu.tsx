import React, { useRef } from 'react';
import MenuContent from './portal/MenuPortal';
import type { Props } from '../Popover';

export const Menu: React.FC<
  Props & { target: HTMLDivElement | null; state: { toggle: boolean; setToggle: (toggle: boolean) => void } }
> = ({ children, content, position = 'right-center', className = '', gap = 12, disabled = false, ...rest }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={rootRef} className="jack__menu__container">
      {children}
      {!disabled && rest.target && rootRef.current && (
        <MenuContent
          {...rest}
          className={className}
          position={position.split(' ').join('-')}
          target={rest.target}
          root={rootRef.current}
          gap={gap}
        >
          {content}
        </MenuContent>
      )}
    </div>
  );
};
