const positionHandler = (args: {
  position: string;
  target: React.RefObject<HTMLDivElement> | null;
  selectRoot: HTMLElement;
  gap?: number;
}): void => {
  type Rect = {
    top: number;
    right: number;
    bottom: number;
    left: number;
    height: number;
    width: number;
  };

  const { position, target, selectRoot, gap } = args;
  const GAP = gap ?? 4;
  if (!target || !target.current) return;
  const targetRect: Rect = target.current.getBoundingClientRect();
  const positionHandler = (): void => {
    const overScreen = targetRect.top + selectRoot.clientHeight + GAP >= window.innerHeight - 10;
    overScreen
      ? (selectRoot.style.top = `-${GAP + selectRoot.clientHeight}px`)
      : (selectRoot.style.top = `${targetRect.height + GAP}px`);
  };

  // prettier-ignore
  switch (position) {
    case 'bottom': positionHandler(); break;
    case 'top': positionHandler(); break;
  }
};

export default positionHandler;
