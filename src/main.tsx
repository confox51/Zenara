// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './App';
import Train from './Train';
import Happy from './Happy';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/train" element={<Train />} />
        <Route path="/happy" element={<Happy />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
