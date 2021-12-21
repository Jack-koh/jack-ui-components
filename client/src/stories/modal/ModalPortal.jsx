import React, { useEffect, useMemo } from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";

// Content ###############################################
const Content = ({ clickOutside, content, setToggle }) => {
  const CONTENT = content({ closeHandler: () => setToggle(false) });
  const PEELED_CONTENT = (() =>
    typeof CONTENT.type === "function"
      ? CONTENT.type(CONTENT.props)
      : CONTENT)();
  const CONTENT_ELEMENT = React.Children.map(PEELED_CONTENT, (child) => {
    const propClass = PEELED_CONTENT.props.className;
    return React.cloneElement(child, {
      className: classNames("modal__portal", { [propClass]: propClass }),
    });
  });

  return (
    <>
      {CONTENT_ELEMENT}
      <div
        className="modal__background__screen"
        onClick={() => {
          if (clickOutside) setToggle(false);
        }}
      />
    </>
  );
};

export const ModalPortal = ({ children, setToggle, clickOutside }) => {
  const modalRoot = useMemo(() => document.createElement("div"), []);
  const body = document.getElementsByTagName("body")[0];

  useEffect(() => {
    modalRoot.id = "absolute__modal__wrapper";
    body.appendChild(modalRoot);
    return () => {
      body.removeChild(modalRoot);
    };
  }, []);

  return createPortal(
    <Content
      clickOutside={clickOutside}
      content={children}
      setToggle={setToggle}
    />,
    modalRoot
  );
};
