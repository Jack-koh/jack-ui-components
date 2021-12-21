// args: {
//   position: string,
//   gap: number,
//   target: HTMLElement,
//   popoverRoot: HTMLElement,
// }

const popOverPositionHandler = (args) => {
  const { gap, target, popoverRoot } = args;
  let { position } = args;
  const targetRect = target.getBoundingClientRect();

  const d_gap = gap;
  const d_bottom = targetRect.bottom + d_gap;
  const d_top = targetRect.top - popoverRoot.clientHeight - d_gap;
  const d_left = targetRect.left - popoverRoot.clientWidth - d_gap;
  const d_right = targetRect.right + d_gap;

  const v_center = targetRect.top + targetRect.height / 2 - popoverRoot.clientHeight / 2; // prettier-ignore
  const v_top = targetRect.top; // prettier-ignore
  const v_bottom = targetRect.bottom - popoverRoot.clientHeight; // prettier-ignore

  const h_center = targetRect.left + targetRect.width / 2 - popoverRoot.clientWidth / 2; // prettier-ignore
  const h_left = targetRect.left;
  const h_right = targetRect.right - popoverRoot.clientWidth;

  const setPosition = (standard, value) => {
    let { align, direction } = value;
    if (standard === "horizontal") {
      // direction = 윈도우에서 떨어진 x 값, align = 윈도우에서 떨어진 y값
      if (align + popoverRoot.clientHeight >= window.innerHeight - 10) {
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
      if (direction + popoverRoot.clientWidth >= window.innerWidth - 10) {
        direction = d_left;
        position = position.replace("right", "left");
      }

      popoverRoot.style.left = `${direction + window.pageXOffset}px`;
      popoverRoot.style.top = `${align + window.pageYOffset}px`;
    }
    if (standard === "virtical") {
      // direction = 윈도우에서 떨어진 y값, align = 윈도우에서 떨어진 x 값
      if (direction + popoverRoot.clientHeight >= window.innerHeight - 10) {
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

      if (align + popoverRoot.clientWidth >= window.innerWidth - 10) {
        align = h_right;
        position = position.replace(/(center|left)/, "right");
      }

      popoverRoot.style.left = `${align + window.pageXOffset}px`;
      popoverRoot.style.top = `${direction + window.pageYOffset}px`;
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
