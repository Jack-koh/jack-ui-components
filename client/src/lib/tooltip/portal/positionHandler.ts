import { Dispatch } from "react";

const positionHandler = (args: {
  position: string;
  gap: number;
  arrow: boolean;
  keepalive: boolean;
  setToggle: Dispatch<boolean>;
  target: HTMLElement;
  tooltipRoot: HTMLElement;
  arrowElement: HTMLElement;
}): void => {
  type Rect = {
    top: number;
    right: number;
    bottom: number;
    left: number;
    height: number;
    width: number;
  };

  const {
    gap,
    arrow,
    keepalive,
    setToggle,
    tooltipRoot,
    arrowElement,
    target,
  } = args;
  let { position } = args;
  const targetRect: Rect = target.getBoundingClientRect();

  const d_bottom = targetRect.bottom + gap;
  const d_top = targetRect.top - tooltipRoot.clientHeight - gap;
  const d_left = targetRect.left - tooltipRoot.clientWidth - gap; // prettier-ignore
  const d_right = targetRect.right + gap;

  const v_center =
    targetRect.top + targetRect.height / 2 - tooltipRoot.clientHeight / 2;
  const v_top = targetRect.top; // prettier-ignore
  const v_bottom = targetRect.bottom - tooltipRoot.clientHeight; // prettier-ignore

  const h_center = targetRect.left + targetRect.width / 2 - tooltipRoot.clientWidth / 2; // prettier-ignore
  const h_left = targetRect.left;
  const h_right = targetRect.right - tooltipRoot.clientWidth;

  const positionHandler = (
    standard: string,
    value: { direction: number; align: number }
  ): void => {
    let { align, direction } = value;

    if (standard === "horizontal") {
      // direction = 윈도우에서 떨어진 x 값, align = 윈도우에서 떨어진 y값
      if (align + tooltipRoot.clientHeight >= window.innerHeight - 10) {
        align = v_bottom;
        position = position.replace(/(center|top)/, "bottom");
      }
      if (align < 0) {
        align = v_top;
        position = position.replace(/(center|bottom)/, "top");
      }
      if (direction < 0) {
        direction = d_right;
        position = position.replace("left", "right");
      }
      if (direction + tooltipRoot.clientWidth >= window.innerWidth - 10) {
        direction = d_left;
        position = position.replace("right", "left");
      }

      tooltipRoot.style.left = `${direction + window.pageXOffset}px`;
      tooltipRoot.style.top = `${align + window.pageYOffset}px`;
    }

    if (standard === "virtical") {
      // direction = 윈도우에서 떨어진 y값, align = 윈도우에서 떨어진 x 값
      if (direction + tooltipRoot.clientHeight >= window.innerHeight - 10) {
        direction = d_top;
        position = position.replace("bottom", "top");
      }

      if (direction < 0) {
        direction = d_bottom;
        position = position.replace("top", "bottom");
      }

      if (align < 0) {
        align = h_left;
        position = position.replace(/(center|right)/, "left");
      }

      if (align + tooltipRoot.clientWidth >= window.innerWidth - 10) {
        align = h_right;
        position = position.replace(/(center|left)/, "right");
      }

      tooltipRoot.style.left = `${align + window.pageXOffset}px`;
      tooltipRoot.style.top = `${direction + window.pageYOffset}px`;
    }
  };

  // prettier-ignore
  switch (position) {
    case 'left-top': positionHandler('horizontal',  { direction: d_left, align: v_top }); break;
    case 'left-center':positionHandler('horizontal',  { direction: d_left, align: v_center }); break;
    case 'left-bottom': positionHandler('horizontal',  { direction: d_left, align: v_bottom }); break;
    case 'right-top': positionHandler('horizontal',  { direction: d_right, align: v_top }); break;
    case 'right-center': positionHandler('horizontal', { direction: d_right, align: v_center }); break;
    case 'right-bottom': positionHandler('horizontal',  { direction: d_right, align: v_bottom }); break;
    case 'bottom-left': positionHandler('virtical',  { direction: d_bottom, align: h_left }); break;
    case 'bottom-center': positionHandler('virtical',  { direction: d_bottom, align: h_center }); break;
    case 'bottom-right': positionHandler('virtical',  { direction: d_bottom, align: h_right }); break;
    case 'top-left': positionHandler('virtical',  { direction: d_top, align: h_left }); break;
    case 'top-center': positionHandler('virtical',  { direction: d_top, align: h_center }); break;
    case 'top-right': positionHandler('virtical',  { direction: d_top, align: h_right  }); break;
  }

  // 포지션이 전부 설정된 뒤 tooltip rectangle 가져오기
  const toolTipRect: Rect = tooltipRoot.getBoundingClientRect();

  if (keepalive) {
    const mouseMoveHandler = (e: MouseEvent): void => {
      const X = e.clientX;
      const Y = e.clientY;

      const targetOverFlow =
        X > targetRect.left - gap &&
        X < targetRect.right + gap &&
        Y > targetRect.top - gap &&
        Y < targetRect.bottom + gap;

      const toolTipOverflow =
        X > toolTipRect.left - gap &&
        X < toolTipRect.right + gap &&
        Y > toolTipRect.top - gap &&
        Y < toolTipRect.bottom + gap;

      if (!(targetOverFlow || toolTipOverflow)) {
        setToggle(false);
        document.removeEventListener("mousemove", mouseMoveHandler);
      }
    };

    document.addEventListener("mousemove", mouseMoveHandler);
  }

  const arrowPositionHandler = (): void => {
    const v_target_center = targetRect.top + targetRect.height / 2 // prettier-ignore
    const h_target_center = targetRect.left + targetRect.width / 2 // prettier-ignore

    const setPosition = (left: number, top: number): void => {
      arrowElement.style.left = `${left}px`;
      arrowElement.style.top = `${top}px`;
    };

    const getVerticalLeft = (): number => {
      return targetRect.width > toolTipRect.width
        ? toolTipRect.left + toolTipRect.width / 2 - 5
        : h_target_center - 5;
    };

    arrowElement.classList.add(`tooltip-position-${position}`);
    // prettier-ignore
    switch (position.split('-')[0]) {
      case 'right': setPosition(toolTipRect.left - 7, v_target_center - 4); break;
      case 'left':setPosition(toolTipRect.right, v_target_center - 4); break;
      case 'top': setPosition(getVerticalLeft(), toolTipRect.bottom ); break;
      case 'bottom': setPosition(getVerticalLeft(), toolTipRect.top - 7 ); break;
    }
  };

  if (arrow) arrowPositionHandler();
};

export default positionHandler;
