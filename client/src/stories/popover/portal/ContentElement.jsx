import React, { Dispatch } from "react";
import classNames from "classnames";
import { Content } from "../Popover";

// props: {
//   content: Content,
//   toggle: boolean,
//   setToggle: Dispatch<boolean>,
// }

const ContentElement = ({ content, toggle, setToggle }) => {
  const CONTENT = content({
    closeHandler: () => setToggle(false),
    open: toggle,
  });
  const PEELED_CONTENT = (() =>
    typeof CONTENT.type === "function"
      ? CONTENT.type(CONTENT.props)
      : CONTENT)();

  const CONTENT_ELEMENT = React.Children.map(PEELED_CONTENT, (child) => {
    const propClass = PEELED_CONTENT.props.className;
    return React.cloneElement(child, {
      className: classNames("jk__popover__content", {
        [propClass]: propClass,
      }),
    });
  });

  return <>{CONTENT_ELEMENT}</>;
};

export default ContentElement;
