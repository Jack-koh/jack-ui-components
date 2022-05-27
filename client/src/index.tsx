import React from 'react';
import { createRoot } from 'react-dom/client';
// import './reset.scss';
import './index.scss';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<div>안녕하세요F</div>);
}
