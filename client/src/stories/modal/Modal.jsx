import React from 'react';
import classNames from 'classnames';
import { ModalPortal } from './ModalPortal';
import * as Comp from './composition/Layout';
import PropTypes from 'prop-types';
import './Modal.scss';

// Modal ####################################################
export class Modal extends React.Component {
  static Portal = ModalPortal;
  static Container = Comp.Container;
  static Footer = Comp.Footer;
  static Button = Comp.ModalButton;

  constructor(props) {
    super(props);
    this.state = { toggle: false };
  }

  componentDidUpdate() {
    const { escape } = this.props;
    const { toggle } = this.state;
    if (escape) {
      toggle
        ? document.addEventListener('keyup', this.escapeHandler)
        : document.removeEventListener('keyup', this.escapeHandler);
    }
  }

  escapeHandler = (e) => {
    if (e.key === 'Escape') this.setState({ toggle: false });
  };

  openModalHandler = (e) => {
    const { disabled } = this.props;
    if (!disabled) {
      e.preventDefault();
      this.setState({ toggle: true });
    }
  };

  getCloneChild = () => {
    const { children } = this.props;
    const getChild = () =>
      typeof children.type === 'function' ? children.type(children.props) : children;

    const CHILDREN = getChild();
    const CLONED_CHILDREN = React.Children.map(CHILDREN, (child) => {
      const { className, onClick } = child.props;
      return React.cloneElement(child, {
        className: classNames('modal__target', { [className]: className }),
        onClick: (e) => {
          this.openModalHandler(e);
          if (onClick) onClick();
        },
      });
    });
    return CLONED_CHILDREN;
  };

  render() {
    const { toggle } = this.state;
    const { content, children, clickOutside } = this.props;
    const modalButton = () => {
      if (!children || (typeof children.type === 'symbol' && !children.props.children)) {
        return <Modal.Button onClick={this.openModalHandler} />;
      }
      return this.getCloneChild();
    };

    return (
      <>
        {modalButton()}
        {toggle && (
          <ModalPortal
            clickOutside={clickOutside}
            setToggle={(value) => this.setState({ toggle: value })}
          >
            {content}
          </ModalPortal>
        )}
      </>
    );
  }
}

Modal.propTypes = {
  escape: PropTypes.bool,
  content: PropTypes.func,
  children: PropTypes.element,
  disabled: PropTypes.bool,
  clickOutside: PropTypes.bool,
};

Modal.defaultProps = {
  escape: false,
  content: ({ closeHandler }) => <div onClick={closeHandler}>Default modal container</div>,
  children: undefined,
  disabled: false,
  clickOutside: false,
};
