import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { debounce } from "lodash";
import ContentElement from "./ContentElement";
import popOverPositionHandler from "./positionHandler";

// export interface PortalProp {
//   children: Content;
//   setToggle: (toggle: boolean) => void;
//   toggle: boolean;
//   clickOutside?: boolean;
//   clickInside?: boolean;
//   className?: string;
//   target: HTMLElement;
//   position: string;
//   gap: number;
// }

const PopoverPortal = ({
  children,
  setToggle,
  toggle,
  clickOutside,
  clickInside,
  className,
  target,
  position,
  gap,
}) => {
  const body = document.getElementsByTagName("body")[0];
  const popoverRoot = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    if (clickOutside) {
      const clickOutsideHandler = (e) => {
        if (target && popoverRoot) {
          for (const t of [target, popoverRoot]) {
            if (t.contains(e.target)) return;
          }
        }
        setToggle();
      };

      if (toggle) document.addEventListener("mousedown", clickOutsideHandler);
      return () =>
        document.removeEventListener("mousedown", clickOutsideHandler);
    }
  }, [[target, popoverRoot], setToggle, toggle]);

  useEffect(() => {
    popoverRoot.classList.add("jk__popover__wrapper");
    if (className) popoverRoot.classList.add(className);

    const clickInsideHandler = debounce(() => setToggle(false), 0);
    const setPosition = () =>
      popOverPositionHandler({ position, gap, target, popoverRoot });

    if (toggle) {
      body.appendChild(popoverRoot);
      setPosition();

      window.addEventListener("resize", setPosition); // 윈도우 리사이즈시 위치 다시 조정
      document.addEventListener("scroll", setPosition, true); // 다큐먼트 스크롤시 위치 다시 조정
      if (clickInside)
        popoverRoot.addEventListener("click", clickInsideHandler, true);
    } else {
      if (body.contains(popoverRoot)) body.removeChild(popoverRoot);

      window.removeEventListener("resize", setPosition); // 윈도우 리사이즈시 위치 다시 조정
      document.removeEventListener("scroll", setPosition, true); // 다큐먼트 스크롤시 위치 다시 조정
      if (clickInside)
        popoverRoot.removeEventListener("click", clickInsideHandler, true);
    }

    return () => clickInsideHandler.cancel();
  }, [toggle]);

  return createPortal(
    <ContentElement content={children} setToggle={setToggle} toggle={toggle} />,
    popoverRoot
  );
};

export default PopoverPortal;
