import React from "react";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  // Stories,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
import { action } from "@storybook/addon-actions";
import { Modal } from "./Modal";

export default {
  title: "Design System/Modal",
  component: Modal,
};

const TBasic = (args) => {
  return (
    <Modal
      escape={args.escape}
      disabled={args.disabled}
      clickOutside={args.clickOutside}
      content={({ closeHandler }) => {
        return (
          <Modal.Container
            title="Modal Container"
            closeHandler={closeHandler}
            submitHandler={() => {
              closeHandler();
            }}
          >
            Basic Modal Layout
          </Modal.Container>
        );
      }}
    />
  );
};
export const Basic = TBasic.bind({});
Basic.args = {
  escape: false,
  disabled: false,
  children: undefined,
  clickOutside: false,
  content: ({ closeHandler }) => {
    return (
      <Modal.Container
        title="Bisic Example"
        closeHandler={closeHandler}
        submitHandler={() => {
          // Some submit code
        }}
      >
        Basic Modal Layout
      </Modal.Container>
    );
  },
};

Basic.parameters = {
  docs: {
    source: { type: "code" },
    page: () => (
      <>
        <Title>Basic Modal</Title>
        <Subtitle></Subtitle>
        <Description></Description>
        <Primary name="Basic" />
        <ArgsTable story={PRIMARY_STORY} />
      </>
    ),
  },
};

const TCustom = (args) => {
  const btnStyle = {
    width: 80,
    height: 36,
    backgroundColor: "indigo",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const containerStyle = {
    padding: 20,
    backgroundColor: "white",
  };

  const closeStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 36,
    backgroundColor: "#61bd4f",
    color: "white",
    marginTop: 20,
    cursor: "pointer",
  };

  return (
    <Modal
      escape={args.escape}
      disabled={args.disabled}
      clickOutside={args.clickOutside}
      content={({ closeHandler }) => {
        return (
          <div style={containerStyle}>
            lorem ipsum dolor sit amet, consectet
            <div style={closeStyle} onClick={closeHandler}>
              close
            </div>
          </div>
        );
      }}
    >
      <div style={btnStyle}>Button</div>
    </Modal>
  );
};

export const Custom = TCustom.bind({});
Custom.args = {
  escape: false,
  disabled: false,
  children: <div>Button</div>,
  clickOutside: false,
  content: ({ closeHandler }) => {
    return (
      <Modal.Container
        title="Bisic Example"
        closeHandler={closeHandler}
        submitHandler={() => {
          closeHandler();
        }}
      >
        Basic Modal Layout
      </Modal.Container>
    );
  },
};

Custom.parameters = {
  docs: {
    source: { type: "code" },
    page: () => (
      <>
        <Title>Custom Modal</Title>
        <Subtitle></Subtitle>
        <Description></Description>
        <Primary name="Custom" />
        <ArgsTable story={PRIMARY_STORY} />
      </>
    ),
  },
};
