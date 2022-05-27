import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import ToolTipPortal from './portal/ToolTipPortal';

type Position =
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'
  | 'top left'
  | 'top center'
  | 'top right'
  | 'left top'
  | 'left center'
  | 'left bottom'
  | 'right top'
  | 'right center'
  | 'right bottom';

interface Props {
  children: JSX.Element;
  className?: string;
  content: JSX.Element | JSX.Element[] | (() => JSX.Element) | string;
  position?: Position;
  arrow?: boolean;
  disabled?: boolean;
  keepalive?: boolean;
  gap?: number;
  ellipsis?: number | null;
  // styled
  maxWidth?: number;
  backgroundColor?: string;
  padding?: string;
  radius?: number;
}

export const ToolTip: React.FC<Props> = (props): JSX.Element => {
  const { disabled, position = 'right-center', keepalive = false, content } = props;
  const [toggle, setToggle] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const getChild = (): JSX.Element => {
    const isComp = typeof props.children.type === 'function';
    return isComp ? props.children.type(props.children.props) : props.children;
  };

  const CHILDREN = getChild();
  const CLONED_CHILDREN = React.Children.map(CHILDREN, (child: JSX.Element): JSX.Element => {
    const { className } = CHILDREN.props;
    return React.cloneElement(child, {
      ref: targetRef,
      className: classNames('jack__tooltip__button', {
        [className]: className,
        open: toggle,
      }),
      onMouseOver: () => !toggle && setToggle(true),
      onMouseLeave: () => !props.keepalive && setToggle(false),
    });
  });

  const elli = () => {
    if (props.ellipsis && targetRef?.current) return props.ellipsis <= targetRef?.current?.clientWidth;
    return true;
  };

  useEffect(() => {
    if (toggle) setToggle(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <>
      {CLONED_CHILDREN}
      {!disabled && elli() && toggle && targetRef.current && (
        <ToolTipPortal
          {...props}
          position={position.split(' ').join('-')}
          target={targetRef.current}
          toggle={toggle}
          setToggle={setToggle}
          keepalive={keepalive}
        >
          {typeof content === 'function' ? content() : content}
        </ToolTipPortal>
      )}
    </>
  );
};
