import React from 'react';

export const Loading: React.FC = (): JSX.Element => {
  return (
    <div className="jack__loading">
      <div className="jack__loading__back" />
      <div className="loading__spinner__wrap">
        <div className="loading__spinner" />
      </div>
    </div>
  );
};

export const Proccessing: React.FC = (): JSX.Element => (
  <div className="jack__proccessing__loding">
    <div className="proccessing__spinner" />
  </div>
);

export const Waiting: React.FC<{ loading: boolean }> = ({ loading }): JSX.Element => {
  return loading ? (
    <div className="jack__waiting__loading">
      <div className="waiting_first" />
      <div className="waiting_second" />
      <div className="waiting_third" />
    </div>
  ) : (
    <></>
  );
};
