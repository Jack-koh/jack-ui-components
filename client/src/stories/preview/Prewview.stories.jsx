import React, { useState } from "react";
import { Preview } from "./Preview";

export default {
  title: "Design System/Preview",
  component: Preview,
};

const Template = () => {
  const [data, setData] = useState([{ title: "1", value: 1 }]);
  return (
    <>
      <div
        onClick={() =>
          setData((prev) => {
            const add = {
              title: (data.length + 1).toString(),
              value: data.length + 1,
            };
            return [...prev, add];
          })
        }
      >
        추가
      </div>
      <Preview
        data={data}
        removeHandler={(value, index) => {
          console.log({ value, index });
        }}
      />
    </>
  );
};

export const Basic = Template.bind({});
