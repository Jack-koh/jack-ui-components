import React from 'react';
import classNames from 'classnames';
import { ModalPortal } from './ModalPortal';

// Modal ####################################################
export type Modal_Content = (props: { closeHandler: () => void }) => JSX.Element;
interface Props {
  children: JSX.Element;
  disabled?: boolean;
  content: Modal_Content;
}

export class Modal extends React.Component<Props, { toggle: boolean }> {
  static Portal = ModalPortal;

  constructor(props: Props) {
    super(props);
    this.state = { toggle: false };
  }

  componentDidUpdate(): void {
    const { toggle } = this.state;
    toggle
      ? document.addEventListener('keyup', this.escapeHandler)
      : document.removeEventListener('keyup', this.escapeHandler);
  }

  escapeHandler = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') this.setState({ toggle: false });
  };

  getCloneChild = (): JSX.Element[] => {
    const { children, disabled } = this.props;
    const getChild = (): JSX.Element =>
      typeof children.type === 'function' ? children.type(children.props) : children;

    const CHILDREN = getChild();
    const CLONED_CHILDREN = React.Children.map(CHILDREN, (child: JSX.Element): JSX.Element => {
      const { className, onClick } = child.props;
      return React.cloneElement(child, {
        className: classNames('jack__modal__button', {
          [className]: className,
        }),
        onClick: (e: React.UIEvent) => {
          e.preventDefault();
          e.stopPropagation();
          if (!disabled) this.setState({ toggle: true });
          if (onClick) onClick();
        },
      });
    });
    return CLONED_CHILDREN;
  };

  render(): JSX.Element {
    const { toggle } = this.state;
    const { content } = this.props;

    return (
      <>
        {this.getCloneChild()}
        {toggle && <ModalPortal setToggle={(value) => this.setState({ toggle: value })}>{content}</ModalPortal>}
      </>
    );
  }
}
