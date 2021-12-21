import React, { useState, useRef } from "react";
import classNames from "classnames";
import PopoverPortal from "./portal/PopoverPortal";
import PropTypes from "prop-types";
import "./Popover.scss";

// export type Content = (props: { closeHandler: () => void; open: boolean }) => JSX.Element;
// export interface Props {
//   children;
//   content: Content;
//   position?: string;
//   className?: string;
//   gap?: number;
//   disabled?: boolean;
//   clickInside?: boolean;
//   clickOutside?: boolean;
// }
export const Popover = ({
  children,
  content,
  position,
  className,
  gap,
  disabled,
  ...rest
}) => {
  const [toggle, setToggle] = useState(false);
  const targetRef = useRef(null);

  const getChild = () =>
    typeof children.type === "function"
      ? children.type(children.props)
      : children;
  const CHILDREN = getChild();
  const CLONED_CHILDREN = React.Children.map(CHILDREN, (child) => {
    const { className, onClick } = child.props;
    return React.cloneElement(child, {
      ref: targetRef,
      className: classNames("jk__popover__button", {
        [className]: className,
        open: toggle,
      }),
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setToggle(!toggle);
        if (onClick) onClick();
      },
    });
  });

  return (
    <>
      {CLONED_CHILDREN}
      {!disabled && targetRef.current ? (
        <PopoverPortal
          className={className}
          position={position.split(" ").join("-")}
          target={targetRef.current}
          setToggle={setToggle}
          toggle={toggle}
          gap={gap}
          {...rest}
        >
          {content}
        </PopoverPortal>
      ) : (
        <></>
      )}
    </>
  );
};

Popover.propTypes = {
  children: PropTypes.element,
  content: PropTypes.func,
  position: PropTypes.string,
  className: PropTypes.string,
  gap: PropTypes.number,
  disabled: PropTypes.bool,
  clickInside: PropTypes.bool,
  clickOutside: PropTypes.bool,
};

Popover.defaultProps = {
  children: undefined,
  position: "bottom-left",
  className: "",
  gap: 12,
  disabled: false,
  clickInside: false,
  clickOutside: false,
  content: ({ closeHandler }) => <div>Default Popover container</div>,
};
