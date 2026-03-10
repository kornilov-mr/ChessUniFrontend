import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PlayingBoard from "./UI/board/PlayingBoard";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PlayingBoard />
  </React.StrictMode>
);

reportWebVitals();
