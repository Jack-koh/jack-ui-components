import React from 'react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Source,
  Anchor,
  Canvas,
  DocsContext,
  DocsPage,
  DocsContainer,
  DocsStory,
  Heading,
  Props,
  SourceContainer,
  // Stories,
  PRIMARY_STORY,
  CURRENT_SELECTION,
} from '@storybook/addon-docs';
import { action } from '@storybook/addon-actions';
import { Modal } from './Modal';

export default {
  title: 'Example/Modal',
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
          closeHandler();
        }}
      >
        Basic Modal Layout
      </Modal.Container>
    );
  },
};

Basic.parameters = {
  docs: {
    source: { type: 'code' },
    page: () => (
      <>
        <Title>Basic</Title>
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
    backgroundColor: 'indigo',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };
  return (
    <Modal
      escape={args.escape}
      disabled={args.disabled}
      content={({ closeHandler }) => {
        return (
          <div>
            lorem ipsum dolor sit amet, consectet
            <Modal.Footer closeHandler={closeHandler} />
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
    source: { type: 'code' },
    page: () => (
      <>
        <Title>Basic</Title>
        <Subtitle></Subtitle>
        <Description></Description>
        <Primary name="Custom" />
        <ArgsTable story={PRIMARY_STORY} />
      </>
    ),
  },
};
