import React from 'react';
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
import { action } from '@storybook/addon-actions';
import { Button } from './Button';

const args = {
  loading: false,
  disabled: false,
  type: 'button',
  className: 'example-class',
  onClick: action('클릭', '클릭'),
};

export const Basic = (args) => <Button {...args} />;
Basic.parameters = {
  docs: {
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
Basic.args = { ...args, title: 'Button' };

export const Custom = (args) => <Button {...args} />;
Custom.args = {
  ...args,
  title: '',
  children: <div>Custom Button</div>,
  styles: {
    width: 120,
    fontSize: 12,
    radius: 18,
    backgroundColor: '#1ea7fd',
  },
};
Custom.parameters = {
  docs: {
    page: () => (
      <>
        <Title>Custom</Title>
        <Subtitle></Subtitle>
        <Description></Description>
        <Primary name="Custom" />
        <ArgsTable story={CURRENT_SELECTION} />
      </>
    ),
  },
};

export default {
  title: 'Example/Button',
  component: Button,
};
