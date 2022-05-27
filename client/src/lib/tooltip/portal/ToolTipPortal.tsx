import React, { Dispatch, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import positionHandler from './positionHandler';

const PortalWrapper = styled.div<{
  maxWidth?: number;
  padding?: string;
  backgroundColor?: string;
  radius: number;
}>`
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : undefined)};
  padding: ${({ padding }) => padding || '8px 12px'};
  background-color: ${({ backgroundColor }) => backgroundColor || '#333'};
  border-radius: ${({ radius }) => `${radius}px`};
  overflow: hidden;
`;

export interface Props {
  children: JSX.Element | JSX.Element[] | string;
  target: HTMLElement;
  arrow?: boolean;
  className?: string;
  keepalive: boolean;
  gap?: number;
  position: string;
  toggle: boolean;
  setToggle: Dispatch<boolean>;
  backgroundColor?: string;
  padding?: string;
  radius?: number;
  maxWidth?: number;
}

const ToolTipPortal: React.FC<Props> = (props) => {
  const { maxWidth, padding, backgroundColor, radius, children, arrow = true } = props;
  const tooltipRoot = document.createElement('div');
  const arrowElement = document.createElement('div');

  useEffect(() => {
    const root = document.querySelector('body') as HTMLBodyElement;
    tooltipRoot.classList.add('jack__tooltip__root');
    arrowElement.classList.add('jack__tooltip__arrow');
    if (props.className) tooltipRoot.classList.add(props.className);
    if (props.backgroundColor) arrowElement.style.borderColor = props.backgroundColor;
    if (arrow) tooltipRoot.appendChild(arrowElement);
    root.appendChild(tooltipRoot);
    positionHandler({
      arrow,
      tooltipRoot,
      arrowElement,
      position: props.position,
      gap: props.gap || 12,
      keepalive: props.keepalive,
      setToggle: props.setToggle,
      target: props.target,
    });
    return () => {
      if (arrow) tooltipRoot.removeChild(arrowElement);
      root.removeChild(tooltipRoot);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tooltipRoot]);

  return createPortal(
    <PortalWrapper
      className="tooltip-portal"
      maxWidth={maxWidth}
      padding={padding}
      backgroundColor={backgroundColor}
      radius={radius || 5}
    >
      {children}
    </PortalWrapper>,
    tooltipRoot
  );
};

export default ToolTipPortal;
