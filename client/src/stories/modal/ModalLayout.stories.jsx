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
  title: "Design System/Modal/Layout",
  component: Modal.Container,
};

const TBasic = (args) => {
  return (
    <Modal.Container
      className={args.className}
      submitHandler={args.submitHandler}
      closeHandler={args.closeHandler}
      title={args.title}
      loading={args.loading}
      disabled={args.disabled}
      styles={args.styles}
      cancelText={args.cancelText}
      saveText={args.saveText}
    >
      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    </Modal.Container>
  );
};

export const Basic = TBasic.bind({});
Basic.args = {
  className: "modal-layout",
  submitHandler: action("submitHandler", "Submit"),
  closeHandler: action("Cancel", "Cancel"),
  title: "Basic Header",
  loading: false,
  disabled: false,
  header: undefined,
  footer: undefined,
  cancelText: "Cancel",
  saveText: "Save",
  styles: { width: 500, height: 400 },
  children: (
    <div>
      "Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of
      Lorem Ipsum."
    </div>
  ),
};

Basic.parameters = {
  docs: {
    source: { type: "code" },
    page: () => (
      <>
        <Title>Basic Modal Layout</Title>
        <Subtitle></Subtitle>
        <Description></Description>
        <Primary name="Basic" />
        <ArgsTable story={PRIMARY_STORY} />
      </>
    ),
  },
};

const THeader = (args) => {
  return (
    <Modal.Container
      className={args.className}
      submitHandler={args.submitHandler}
      closeHandler={args.closeHandler}
      title={args.title}
      loading={args.loading}
      disabled={args.disabled}
      styles={args.styles}
      header={args.header}
      cancelText={args.cancelText}
      saveText={args.saveText}
    >
      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    </Modal.Container>
  );
};

export const Header = THeader.bind({});
Header.args = {
  className: "modal-layout",
  submitHandler: action("submitHandler", "Submit"),
  closeHandler: action("Cancel", "Cancel"),
  title: "Custom Header",
  loading: false,
  disabled: false,
  header: (
    <div style={{ padding: 30, backgroundColor: "#555", color: "white" }}>
      Custom Header
    </div>
  ),
  footer: undefined,
  styles: { width: 500, height: 400 },
  cancelText: "Cancel",
  saveText: "Save",
  children: (
    <div>
      "Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of
      Lorem Ipsum."
    </div>
  ),
};

Header.parameters = {
  docs: {
    source: { type: "code" },
    page: () => (
      <>
        <Title>Custom Modal Header</Title>
        <Subtitle></Subtitle>
        <Description></Description>
        <Primary name="Header" />
        <ArgsTable story={PRIMARY_STORY} />
      </>
    ),
  },
};

const TFooter = (args) => {
  return (
    <Modal.Container
      className={args.className}
      submitHandler={args.submitHandler}
      closeHandler={args.closeHandler}
      title={args.title}
      loading={args.loading}
      disabled={args.disabled}
      styles={args.styles}
      footer={args.footer}
    >
      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    </Modal.Container>
  );
};

export const Footer = TFooter.bind({});
Footer.args = {
  className: "modal-layout",
  submitHandler: action("submitHandler", "Submit"),
  closeHandler: action("Cancel", "Cancel"),
  title: "Custom Footer",
  loading: false,
  disabled: false,
  header: undefined,
  cancelText: undefined,
  saveText: undefined,
  styles: { width: 500, height: 400 },
  footer: (
    <div style={{ padding: 30, backgroundColor: "#555", color: "white" }}>
      Custom Footer
    </div>
  ),
  children: (
    <div>
      "Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of
      Lorem Ipsum."
    </div>
  ),
};

Footer.parameters = {
  docs: {
    source: { type: "code" },
    page: () => (
      <>
        <Title>Custom Modal Footer</Title>
        <Subtitle></Subtitle>
        <Description></Description>
        <Primary name="Footer" />
        <ArgsTable story={PRIMARY_STORY} />
      </>
    ),
  },
};
