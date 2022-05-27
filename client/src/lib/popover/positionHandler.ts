const popOverPositionHandler = (args: {
  position: string;
  gap: number;
  target: HTMLElement;
  root: HTMLElement;
}): void => {
  type Rect = {
    top: number;
    right: number;
    bottom: number;
    left: number;
    height: number;
    width: number;
  };

  const { gap, target, root } = args;
  let { position } = args;
  const targetRect: Rect = target.getBoundingClientRect();

  const d_gap = gap;
  const d_bottom = targetRect.bottom + d_gap;
  const d_top = targetRect.top - root.clientHeight - d_gap;
  const d_left = targetRect.left - root.clientWidth - d_gap;
  const d_right = targetRect.right + d_gap;

  const v_center = targetRect.top + targetRect.height / 2 - root.clientHeight / 2; // prettier-ignore
  const v_top = targetRect.top; // prettier-ignore
  const v_bottom = targetRect.bottom - root.clientHeight; // prettier-ignore

  const h_center = targetRect.left + targetRect.width / 2 - root.clientWidth / 2; // prettier-ignore
  const h_left = targetRect.left;
  const h_right = targetRect.right - root.clientWidth;

  const setPosition = (standard: string, value: { direction: number; align: number }): void => {
    let { align, direction } = value;
    if (standard === "horizontal") {
      // direction = 윈도우에서 떨어진 x 값, align = 윈도우에서 떨어진 y값
      if (align + root.clientHeight >= window.innerHeight - 10) {
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
      if (direction + root.clientWidth >= window.innerWidth - 10) {
        direction = d_left;
        position = position.replace("right", "left");
      }

      root.style.left = `${direction + window.pageXOffset - window.scrollX}px`;
      root.style.top = `${align + window.pageYOffset - window.scrollY}px`;
    }
    if (standard === "virtical") {
      // direction = 윈도우에서 떨어진 y값, align = 윈도우에서 떨어진 x 값
      if (direction + root.clientHeight >= window.innerHeight - 10) {
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

      if (align + root.clientWidth >= window.innerWidth - 10) {
        align = h_right;
        position = position.replace(/(center|left)/, "right");
      }

      root.style.left = `${align + window.pageXOffset - window.scrollX}px`;
      root.style.top = `${direction + window.pageYOffset - window.scrollY}px`;
    }
  };

  // prettier-ignore
  switch (position) {
    case 'left-top': setPosition('horizontal', { direction: d_left, align: v_top }); break;
    case 'left-center': setPosition('horizontal', { direction: d_left, align: v_center }); break;
    case 'left-bottom': setPosition('horizontal', { direction: d_left, align: v_bottom }); break;
    case 'right-top': setPosition('horizontal', { direction: d_right, align: v_top }); break;
    case 'right-center': setPosition('horizontal', { direction: d_right, align: v_center }); break;
    case 'right-bottom': setPosition('horizontal', { direction: d_right, align: v_bottom }); break;
    case 'bottom-left': setPosition('virtical', { direction: d_bottom, align: h_left }); break;
    case 'bottom-center': setPosition('virtical', { direction: d_bottom, align: h_center }); break;
    case 'bottom-right': setPosition('virtical', { direction: d_bottom, align: h_right }); break;
    case 'top-left': setPosition('virtical', { direction: d_top, align: h_left }); break;
    case 'top center': setPosition('virtical', { direction: d_top, align: h_center }); break;
    case 'top-right': setPosition('virtical', { direction: d_top, align: h_right }); break;
  }
};

export default popOverPositionHandler;
