import React from 'react';
import { Modal, Button } from 'stories';

const App = () => {
  return (
    <div className="App">
      <Modal
        escape
        content={({ closeHandler }) => (
          <Modal.Container closeHandler={closeHandler}>
            <div>반갑습니다</div>
          </Modal.Container>
        )}
      ></Modal>
      <Button />
    </div>
  );
};

export default App;
