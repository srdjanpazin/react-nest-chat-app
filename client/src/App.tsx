import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './AuthPage';
import ChatPage from './ChatPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/messages/:chatId" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}
