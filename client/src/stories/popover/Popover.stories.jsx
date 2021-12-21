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
import { Popover } from "./Popover";

export default {
  title: "Design System/Popover",
  component: Popover,
};

const TBasic = (args) => {
  const btnStyle = {
    width: 80,
    height: 36,
    backgroundColor: " #61bd4f",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: 5,
  };
  return (
    <Popover
      position={args.position}
      className={args.className}
      clickOutside={args.clickOutside}
      clickInside={args.clickInside}
      gap={args.gap}
      disabled={args.disabled}
      content={args.content}
    >
      <div style={btnStyle}>Button</div>
    </Popover>
  );
};
export const Basic = TBasic.bind({});
Basic.args = {
  position: "bottom-left",
  className: "popover-basic",
  clickOutside: true,
  clickInside: false,
  children: undefined,
  gap: 12,
  disabled: false,
  content: ({ closeHandler }) => {
    return (
      <div style={{ width: 340, padding: 10 }}>
        "Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum."
      </div>
    );
  },
};

Basic.parameters = {
  docs: {
    source: { type: "code" },
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
