const positionHandler = (args: {
  position: string;
  target: HTMLElement;
  selectRoot: HTMLElement;
}): void => {
  type Rect = {
    top: number;
    right: number;
    bottom: number;
    left: number;
    height: number;
    width: number;
  };

  const { position, target, selectRoot } = args;
  const gap = 4;
  const targetRect: Rect = target.getBoundingClientRect();
  const positionHandler = (): void => {
    const overScreen =
      targetRect.top + selectRoot.clientHeight + gap >= window.innerHeight - 10;
    overScreen
      ? (selectRoot.style.top = `-${gap + selectRoot.clientHeight}px`)
      : (selectRoot.style.top = `${targetRect.height + gap}px`);
  };

  // prettier-ignore
  switch (position) {
    case 'bottom': positionHandler(); break;
    case 'top': positionHandler(); break;
  }
};

export default positionHandler;
