import React from 'react';
import styled from 'styled-components';

const Text = styled.div<{ text?: string }>`
  &::before {
    display: block;
    content: '${(props) => props.text ?? ''}';
  }
`;

export const NoData: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div id="jack__no__data">
      <div className="content__wrapper">
        <div className="jack__no__data__icon" />
        {!!text && <Text className="jack__no__data__text" text={text}></Text>}
      </div>
    </div>
  );
};
