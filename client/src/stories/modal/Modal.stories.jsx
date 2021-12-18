import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Modal } from './Modal';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  // Stories,
  PRIMARY_STORY,
  CURRENT_SELECTION,
} from '@storybook/addon-docs';

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Basic = (args) => {
  return (
    <Modal
      escape={args.escape}
      content={({ closeHandler }) => {
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
      }}
    />
  );
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

Basic.args = {
  escape: false,
  disabled: false,
  children: undefined,
  content: undefined,
};

// export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   primary: true,
//   label: 'Button',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };

export default {
  title: 'Example/Modal',
  component: Modal,
};
