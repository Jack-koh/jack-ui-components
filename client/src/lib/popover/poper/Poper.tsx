import React from "react";
import PopoverPortal from "./portal/PoperPortal";
import type { Props } from "../Popover";

export const Poper: React.FC<
  Props & { target: HTMLDivElement | null; state: { toggle: boolean; setToggle: (toggle: boolean) => void } }
> = ({ children, content, position = "right-center", className = "", gap = 12, disabled = false, ...rest }) => {
  return (
    <>
      {children}
      {!disabled && rest.target ? (
        <PopoverPortal
          {...rest}
          className={className}
          position={position.split(" ").join("-")}
          gap={gap}
          target={rest.target}
        >
          {content}
        </PopoverPortal>
      ) : (
        <></>
      )}
    </>
  );
};
